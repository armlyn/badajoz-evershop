const { select } = require('@evershop/postgres-query-builder');
const { pool } = require('@evershop/evershop/src/lib/postgres/connection');
const {
  setContextValue
} = require('@evershop/evershop/src/modules/graphql/services/contextHelper');

module.exports = async (request, response, delegate, next) => {
  try {
    const query = select();
    query.from('store');
    query.andWhere('store.uuid', '=', request.params.id);
    query
      .leftJoin('store_description')
      .on(
        'store_description.store_description_store_id',
        '=',
        'store.store_id'
      );
    const store = await query.load(pool);

    if (store === null) {
      response.status(404);
      next();
    } else {
      setContextValue(request, 'storeId', store.store_id);
      setContextValue(request, 'storeUuid', store.uuid);
      setContextValue(request, 'pageInfo', {
        title: store.meta_title || store.name,
        description: store.meta_description || store.short_description
      });
      next();
    }
  } catch (e) {
    next(e);
  }
};
