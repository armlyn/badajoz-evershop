const updateStore = require('../../services/store/updateStore');

// eslint-disable-next-line no-unused-vars
module.exports = async (request, response, delegate) => {
  const store = await updateStore(request.params.id, request.body, {
    routeId: request.currentRoute.id
  });
  return store;
};
