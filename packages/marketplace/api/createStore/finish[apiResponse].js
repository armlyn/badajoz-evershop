const { buildUrl } = require('@evershop/evershop/src/lib/router/buildUrl');
const { OK } = require('@evershop/evershop/src/lib/util/httpStatus');

// eslint-disable-next-line no-unused-vars
module.exports = async (request, response, delegate, next) => {
  const store = await delegate.createStore;
  response.status(OK);
  response.json({
    data: {
      ...store,
      links: [
        {
          rel: 'storeGrid',
          href: buildUrl('storeGrid'),
          action: 'GET',
          types: ['text/xml']
        },
        {
          rel: 'view',
          href: buildUrl('storeView', { uuid: store.uuid }),
          action: 'GET',
          types: ['text/xml']
        },
        {
          rel: 'edit',
          href: buildUrl('storeEdit', { id: store.uuid }),
          action: 'GET',
          types: ['text/xml']
        }
      ]
    }
  });
};
