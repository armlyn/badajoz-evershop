const createRegion = require('../../services/region/createRegion');

// eslint-disable-next-line no-unused-vars
module.exports = async (request, response, delegate) => {
  const result = await createRegion(request.body, {
    routeId: request.currentRoute.id
  });
  return result;
};
