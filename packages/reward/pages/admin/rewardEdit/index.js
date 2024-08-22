const { select } = require('@evershop/postgres-query-builder');
const { pool } = require('@evershop/evershop/src/lib/postgres/connection');
const { buildUrl } = require('@evershop/evershop/src/lib/router/buildUrl');
const {
  setContextValue
} = require('@evershop/evershop/src/modules/graphql/services/contextHelper');

module.exports = async (request, response, delegate, next) => {
  try {
    const query = select();
    query.from('reward');
    query.andWhere('reward.uuid', '=', request.params.id);
    const reward = await query.load(pool);

    if (reward === null) {
      response.redirect(302, buildUrl('rewardGrid'));
    } else {
      setContextValue(request, 'rewardId', parseInt(reward.reward_id, 10));
      setContextValue(request, 'rewardUuid', reward.uuid);
      setContextValue(request, 'pageInfo', {
        title: reward.reward,
        description: reward.reward
      });
      next();
    }
  } catch (e) {
    next(e);
  }
};
