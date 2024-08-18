const updateRegion = require('../../services/region/updateRegion');

// eslint-disable-next-line no-unused-vars
module.exports = async (request, response, delegate) => {
  const region = await updateRegion(request.params.id, request.body, {
    routeId: request.currentRoute.id
  });
  return region;
};
