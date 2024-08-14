const {
  OK,
  INTERNAL_SERVER_ERROR
} = require('@evershop/evershop/src/lib/util/httpStatus');
const deleteStore = require('../../services/store/deleteStore');

// eslint-disable-next-line no-unused-vars
module.exports = async (request, response, delegate, next) => {
  try {
    const { id } = request.params;
    const store = await deleteStore(id, {
      routeId: request.currentRoute.id
    });
    response.status(OK);
    response.json({
      data: store
    });
  } catch (e) {
    response.status(INTERNAL_SERVER_ERROR);
    response.json({
      error: {
        status: INTERNAL_SERVER_ERROR,
        message: e.message
      }
    });
  }
};
