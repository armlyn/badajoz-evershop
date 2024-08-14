const createStore = require('../../services/store/createStore');

// eslint-disable-next-line no-unused-vars
module.exports = async (request, response, delegate) => {
  const result = await createStore(request.body, {
    routeId: request.currentRoute.id
  });
  return result;
};
