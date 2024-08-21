const { select } = require('@evershop/postgres-query-builder');

module.exports.getRewardsBaseQuery = () => {
  const query = select().from('reward');

  return query;
};
