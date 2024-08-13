const { select } = require('@evershop/postgres-query-builder');
const { pool } = require('@evershop/evershop/src/lib/postgres/connection');
const {
    setContextValue
} = require('@evershop/evershop/src/modules/graphql/services/contextHelper');

module.exports = async (request, response, stack, next) => {
    try {
        const query = select();
        query
            .from('store')
            .where('store.uuid', '=', request.params.uuid);

        const store = await query.load(pool);
        if (store === null) {
            response.status(404);
            next();
        } else {
            setContextValue(request, 'storeId', store.id);
            setContextValue(request, 'pageInfo', {
                title: store.name,
                description: store.description,
                url: request.url
            });
            next();
        }
    } catch (e) {
        next(e);
    }
};
