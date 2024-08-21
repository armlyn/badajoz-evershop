const createReward = require('../../services/reward/createReward');

// eslint-disable-next-line no-unused-vars
module.exports = async (request, response, delegate) => {
  const reward = await createReward(request.body, {
    routeId: request.currentRoute.id
  });

  return reward;
};
