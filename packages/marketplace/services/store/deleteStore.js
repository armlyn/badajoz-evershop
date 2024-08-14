const { hookable } = require('@evershop/evershop/src/lib/util/hookable');
const {
  startTransaction,
  commit,
  rollback,
  select,
  del
} = require('@evershop/postgres-query-builder');
const {
  getConnection
} = require('@evershop/evershop/src/lib/postgres/connection');

async function deleteStoreData(uuid, connection) {
  await del('store').where('uuid', '=', uuid).execute(connection);
}

/**
 * Delete store service. This store will delete a store with all related data
 * @param {String} uuid
 * @param {Object} context
 */
async function deleteStore(uuid, context) {
  const connection = await getConnection();
  await startTransaction(connection);
  try {
    const query = select().from('store');
    const store = await query.where('uuid', '=', uuid).load(connection);
    if (!store) {
      throw new Error('Invalid store id');
    }
    await hookable(deleteStoreData, { ...context, connection, store })(
      uuid,
      connection
    );
    await commit(connection);
    return store;
  } catch (e) {
    await rollback(connection);
    throw e;
  }
}

module.exports = async (uuid, context) => {
  const connection = await getConnection();
  await startTransaction(connection);
  try {
    const hookContext = {
      connection
    };
    // Make sure the context is either not provided or is an object
    if (context && typeof context !== 'object') {
      throw new Error('Context must be an object');
    }
    // Merge hook context with context
    Object.assign(hookContext, context);
    const store = await hookable(deleteStore, hookContext)(
      uuid,
      connection
    );
    await commit(connection);
    return store;
  } catch (e) {
    await rollback(connection);
    throw e;
  }
};
