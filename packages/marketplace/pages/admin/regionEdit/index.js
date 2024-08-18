const { select } = require('@evershop/postgres-query-builder');
const { pool } = require('@evershop/evershop/src/lib/postgres/connection');
const {
  setContextValue
} = require('@evershop/evershop/src/modules/graphql/services/contextHelper');

module.exports = async (request, response, delegate, next) => {
  try {
    const query = select();
    query.from('region');
    query.andWhere('region.uuid', '=', request.params.id);
    query
      .leftJoin('region_description')
      .on(
        'region_description.region_description_region_id',
        '=',
        'region.region_id'
      );

    const region = await query.load(pool);

    if (region === null) {
      response.status(404);
      next();
    } else {
      setContextValue(request, 'regionId', region.region_id);
      setContextValue(request, 'regionUuid', region.uuid);
      setContextValue(request, 'pageInfo', {
        title: region.name,
        description: region.meta_description || region.short_description
      });
      next();
    }
  } catch (e) {
    next(e);
  }
};
