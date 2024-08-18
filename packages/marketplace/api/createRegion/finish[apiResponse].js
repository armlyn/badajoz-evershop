const { buildUrl } = require('@evershop/evershop/src/lib/router/buildUrl');
const { OK } = require('@evershop/evershop/src/lib/util/httpStatus');

// eslint-disable-next-line no-unused-vars
module.exports = async (request, response, delegate, next) => {
  const region = await delegate.createRegion;
  response.status(OK);
  response.json({
    data: {
      ...region,
      links: [
        {
          rel: 'regionGrid',
          href: buildUrl('regionGrid'),
          action: 'GET',
          types: ['text/xml']
        },
        {
          rel: 'view',
          href: buildUrl('regionView', { uuid: region.uuid }),
          action: 'GET',
          types: ['text/xml']
        },
        {
          rel: 'edit',
          href: buildUrl('regionEdit', { id: region.uuid }),
          action: 'GET',
          types: ['text/xml']
        }
      ]
    }
  });
};
