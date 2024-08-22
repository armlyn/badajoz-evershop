const { GraphQLJSON } = require('graphql-type-json');
const { buildUrl } = require('@evershop/evershop/src/lib/router/buildUrl');
const { camelCase } = require('@evershop/evershop/src/lib/util/camelCase');
const {
  getRewardsBaseQuery
} = require('../../../services/getRewardsBaseQuery');
const { RewardCollection } = require('../../../services/RewardCollection');

module.exports = {
  JSON: GraphQLJSON,
  Query: {
    reward: async (root, { id }, { pool }) => {
      const query = getRewardsBaseQuery();
      query.where('reward_id', '=', id);
      const reward = await query.load(pool);
      return reward ? camelCase(reward) : null;
    },
    rewards: async (_, { filters = [] }, { user }) => {
      // This field is for admin only
      if (!user) {
        return [];
      }
      const query = getRewardsBaseQuery();
      const root = new RewardCollection(query);
      await root.init(filters);
      return root;
    }
  },
  Reward: {
      userCondition: ({ userCondition }) => {
      if (!userCondition) {
        return null;
      } else {
        return camelCase(userCondition);
      }
    },
    editUrl: ({ uuid }) => buildUrl('rewardEdit', { id: uuid }),
    updateApi: (reward) => buildUrl('updateReward', { id: reward.uuid }),
    deleteApi: (reward) => buildUrl('deleteReward', { id: reward.uuid })
  }
};
