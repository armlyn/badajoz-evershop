const { select } = require('@evershop/postgres-query-builder');
const { pool } = require('@evershop/evershop/src/lib/postgres/connection');
const { getValueSync } = require('@evershop/evershop/src/lib/util/registry');

/**
 * This method validate a coupon.
 * @param {Cart} cart
 * @param {String} rewardCode
 * @returns {Boolean}
 */
async function validateReward(cart, rewardCode) {
  const validatorFunctions = getValueSync('rewardValidatorFunctions', []);
  let flag = true;
  const reward = await select()
    .from('reward')
    .where('reward', '=', rewardCode)
    .load(pool);
  if (!reward) {
    return false;
  }
  // Loop an object
  await Promise.all(
    validatorFunctions.map(async (func) => {
      try {
        const check = await func(cart, reward);
        if (!check) {
          flag = false;
        }
      } catch (e) {
        flag = false;
      }
    })
  );

  return flag;
}

module.exports = {
  validateReward
};
