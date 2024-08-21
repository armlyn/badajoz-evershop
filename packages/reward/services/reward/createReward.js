const { hookable } = require('@evershop/evershop/src/lib/util/hookable');
const {
  getValueSync,
  getValue
} = require('@evershop/evershop/src/lib/util/registry');
const {
  startTransaction,
  commit,
  rollback,
  insert
} = require('@evershop/postgres-query-builder');
const {
  getConnection
} = require('@evershop/evershop/src/lib/postgres/connection');
const { getAjv } = require('../../../base/services/getAjv');
const RewardDataSchema = require('./RewardDataSchema.json');

function validateRewardDataBeforeInsert(data) {
  const ajv = getAjv();
  RewardDataSchema.required = [
    'seller_user_id',
    'name',
    'points_required',
    'status'
  ];
  const jsonSchema = getValueSync(
    'createRewardDataJsonSchema',
    RewardDataSchema
  );
  const validate = ajv.compile(jsonSchema);
  const valid = validate(data);
  if (valid) {
    return data;
  } else {
    throw new Error(validate.errors[0].message);
  }
}

async function insertRewardData(data, connection) {
  const reward = await insert('reward').given(data).execute(connection);
  return reward;
}

/**
 * Create coupon service. This service will create a coupon with all related data
 * @param {Object} data
 * @param {Object} context
 */
async function createReward(data, context) {
  const connection = await getConnection();
  await startTransaction(connection);
  try {
    const rewardData = await getValue('rewardDataBeforeCreate', data);
    // Validate coupon data
    validateRewardDataBeforeInsert(rewardData);

    // Insert coupon data
    const reward = await hookable(insertRewardData, { ...context, connection })(
      rewardData,
      connection
    );
    await commit(connection);
    return reward;
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
  const reward = await hookable(createReward, context)(data, context);
  return reward;
};
