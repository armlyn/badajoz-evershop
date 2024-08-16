const { hookable } = require('@evershop/evershop/src/lib/util/hookable');
const {
  getValueSync,
  getValue
} = require('@evershop/evershop/src/lib/util/registry');
const {
  startTransaction,
  commit,
  rollback,
  insert,
  select,
  update,
  insertOnUpdate,
  del
} = require('@evershop/postgres-query-builder');
const {
  getConnection
} = require('@evershop/evershop/src/lib/postgres/connection');
const { error } = require('@evershop/evershop/src/lib/log/logger');
const { getAjv } = require('@evershop/evershop/src/modules/base/services/getAjv');
const storeDataSchema = require('./storeDataSchema.json');

function validateStoreDataBeforeUpdate(data) {
  const ajv = getAjv();
  storeDataSchema.required = [];
  const jsonSchema = getValueSync(
    'updateStoreDataJsonSchema',
    storeDataSchema
  );
  const validate = ajv.compile(jsonSchema);
  const valid = validate(data);
  if (valid) {
    return data;
  } else {
    throw new Error(validate.errors[0].message);
  }
}

async function updateStoreData(uuid, data, connection) {
  const query = select().from('store');
  query
    .leftJoin('store_description')
    .on(
      'store_description.store_id',
      '=',
      'store.id'
    );
  
  const store = await query.where('uuid', '=', uuid).load(connection);
  if (!store) {
    throw new Error('Requested store not found');
  }

  let newStore;
  try {
    newStore = await update('store')
      .given(data)
      .where('uuid', '=', uuid)
      .execute(connection);
  } catch (e) {
    if (!e.message.includes('No data was provided')) {
      throw e;
    }
  }

  try {
    const description = await update('store_description')
      .given(data)
      .where('store_id', '=', store.id)
      .execute(connection);
    Object.assign(store, description);
  } catch (e) {
    if (!e.message.includes('No data was provided')) {
      throw e;
    }
  }


  Object.assign(store, newStore);
  return store;
}

/**
 * Update store service. This service will update a store with all related data
 * @param {String} uuid
 * @param {Object} data
 * @param {Object} context
 */
async function updateStore(uuid, data, context) {
  const connection = await getConnection();
  await startTransaction(connection);
  try {
    const currentStore = await select()
      .from('store')
      .where('uuid', '=', uuid)
      .load(connection);

    if (!currentStore) {
      throw new Error('Requested store does not exist');
    }

    const storeData = await getValue('storeDataBeforeUpdate', data);

    // Validate store data
    validateStoreDataBeforeUpdate(storeData);

    // Insert store data
    const store = await hookable(updateStoreData, {
      ...context,
      connection
    })(uuid, storeData, connection);


    await commit(connection);
    return store;
  } catch (e) {
    await rollback(connection);
    throw e;
  }
}

module.exports = async (uuid, data, context) => {
  // Make sure the context is either not provided or is an object
  if (context && typeof context !== 'object') {
    throw new Error('Context must be an object');
  }
  const store = await hookable(updateStore, context)(uuid, data, context);
  return store;
};
