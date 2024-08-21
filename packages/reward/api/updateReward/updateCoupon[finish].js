const updateReward = require('../../services/reward/updateReward');

// eslint-disable-next-line no-unused-vars
module.exports = async (request, response, delegate) => {
  const reward = await updateReward(request.params.id, request.body, {
    routeId: request.currentRoute.id
  });

  return reward;
};
