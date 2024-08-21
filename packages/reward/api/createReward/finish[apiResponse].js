const { buildUrl } = require('@evershop/evershop/src/lib/router/buildUrl');
const { OK } = require('@evershop/evershop/src/lib/util/httpStatus');

// eslint-disable-next-line no-unused-vars
module.exports = async (request, response, delegate, next) => {
  const reward = await delegate.createReward;
  response.status(OK);
  response.json({
    data: {
      ...reward,
      links: [
        {
          rel: 'rewardGrid',
          href: buildUrl('rewardGrid'),
          action: 'GET',
          types: ['text/xml']
        },
        {
          rel: 'edit',
          href: buildUrl('rewardEdit', { id: reward.uuid }),
          action: 'GET',
          types: ['text/xml']
        }
      ]
    }
  });
};
