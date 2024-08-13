const { select } = require('@evershop/postgres-query-builder');

module.exports.getStoresBaseQuery = () => {
    const query = select().from('store');

    return query;
};
