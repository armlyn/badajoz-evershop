const { buildUrl } = require('@evershop/evershop/src/lib/router/buildUrl');

module.exports = {
  Cart: {
    applyRewardApi: (cart) => buildUrl('rewardApply', { cart_id: cart.uuid })
  }
};
