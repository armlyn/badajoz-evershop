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
  insertOnUpdate
} = require('@evershop/postgres-query-builder');
const {
  getConnection
} = require('@evershop/evershop/src/lib/postgres/connection');
const { getAjv } = require('@evershop/evershop/src/modules/base/services/getAjv');
const storeDataSchema = require('./storeDataSchema.json');

function validateStoreDataBeforeInsert(data) {
  const ajv = getAjv();
  storeDataSchema.required = [
    'name',
    'url_key',
    'status',
    'address',
    'phone'
  ];
  const jsonSchema = getValueSync(
    'createStoreDataJsonSchema',
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

async function insertStoreData(data, connection) {
  const store = await insert('store').given(data).execute(connection);
  const description = await insert('store_description')
    .given(data)
    .prime('store_id', store.id)
    .execute(connection);

  return {
    ...description,
    ...store
  };
}

/**
 * Create store service. This store will create a store with all related data
 * @param {Object} data
 * @param {Object} context
 */
async function createStore(data, context) {
  const connection = await getConnection();
  await startTransaction(connection);
  try {
    const storeData = await getValue('storeDataBeforeCreate', data);

    // Validate store data
    validateStoreDataBeforeInsert(storeData);

    // Insert store data
    const store = await hookable(insertStoreData, {
      connection,
      ...context
    })(storeData, connection);

    await commit(connection);
    return store;
  } catch (e) {
    await rollback(connection);
    throw e;
  }
}

module.exports = async (data, context) => {
  // Make sure the context is either not provided or is an object
  if (context && typeof context !== 'object') {
    throw new Error('Context must be an object');
  }
  const store = await hookable(createStore, context)(data, context);
  return store;
};
