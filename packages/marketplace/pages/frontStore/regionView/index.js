const { select } = require('@evershop/postgres-query-builder');
const { pool } = require('@evershop/evershop/src/lib/postgres/connection');
const {
    setContextValue
} = require('@evershop/evershop/src/modules/graphql/services/contextHelper');

module.exports = async (request, response, stack, next) => {
    try {
        const query = select();
        query
            .from('region')
            .where('region.uuid', '=', request.params.uuid);

        const region = await query.load(pool);
        if (region === null) {
            response.status(404);
            next();
        } else {
            setContextValue(request, 'regionId', region.id);
            setContextValue(request, 'pageInfo', {
                title:  region.name,
                description: region.description,
                url: request.url
            });
            next();
        }
    } catch (e) {
        next(e);
    }
};
