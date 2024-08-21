const { hookable } = require('@evershop/evershop/src/lib/util/hookable');
const {
  getValueSync,
  getValue
} = require('@evershop/evershop/src/lib/util/registry');
const {
  startTransaction,
  commit,
  rollback,
  update,
  select
} = require('@evershop/postgres-query-builder');
const {
  getConnection
} = require('@evershop/evershop/src/lib/postgres/connection');
const { getAjv } = require('../../../base/services/getAjv');
const rewardDataSchema = require('./rewardDataSchema.json');

function validateRewardDataBeforeInsert(data) {
  const ajv = getAjv();
  rewardDataSchema.required = [];
  const jsonSchema = getValueSync(
    'updateRewardDataJsonSchema',
    rewardDataSchema
  );
  const validate = ajv.compile(jsonSchema);
  const valid = validate(data);
  if (valid) {
    return data;
  } else {
    throw new Error(validate.errors[0].message);
  }
}

async function updateRewardData(uuid, data, connection) {
  const reward = await select()
    .from('reward')
    .where('uuid', '=', uuid)
    .load(connection);

  if (!reward) {
    throw new Error('Requested reward not found');
  }

  try {
    const newReward = await update('reward')
      .given(data)
      .where('uuid', '=', uuid)
      .execute(connection);

    return newReward;
  } catch (e) {
    if (!e.message.includes('No data was provided')) {
      throw e;
    } else {
      return reward;
    }
  }
}

/**
 * Update coupon service. This service will update a coupon with all related data
 * @param {Object} data
 * @param {Object} context
 */
async function updateReward(uuid, data, context) {
  const connection = await getConnection();
  await startTransaction(connection);
  try {
    const rewardData = await getValue('rewardDataBeforeUpdate', data);
    // Validate coupon data
    validateRewardDataBeforeInsert(rewardData);

    // Insert coupon data
    const reward = await hookable(updateRewardData, { ...context, connection })(
      uuid,
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

module.exports = async (uuid, data, context) => {
  // Make sure the context is either not provided or is an object
  if (context && typeof context !== 'object') {
    throw new Error('Context must be an object');
  }
  const reward = await hookable(updateReward, context)(uuid, data, context);
  return reward;
};
