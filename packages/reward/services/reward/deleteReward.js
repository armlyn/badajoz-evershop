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

async function deleteRewardData(uuid, connection) {
  await del('reward').where('uuid', '=', uuid).execute(connection);
}

/**
 * Delete coupon service. This service will delete a coupon with all related data
 * @param {String} uuid
 * @param {Object} context
 */
async function deleteReward(uuid, context) {
  const connection = await getConnection();
  await startTransaction(connection);
  try {
    const query = select().from('reward');
    const reward = await query.where('uuid', '=', uuid).load(connection);

    if (!reward) {
      throw new Error('Invalid reward id');
    }
    await hookable(deleteRewardData, { ...context, reward, connection })(
      uuid,
      connection
    );
    await commit(connection);
    return reward;
  } catch (e) {
    await rollback(connection);
    throw e;
  }
}

module.exports = async (uuid, context) => {
  // Make sure the context is either not provided or is an object
  if (context && typeof context !== 'object') {
    throw new Error('Context must be an object');
  }
  const reward = await hookable(deleteReward, context)(uuid, context);
  return reward;
};
