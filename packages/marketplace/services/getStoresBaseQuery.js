const { select } = require('@evershop/postgres-query-builder');

module.exports.getStoresBaseQuery = () => {
    const query = select().from('store');
    query
        .leftJoin('store_description')
        .on(
            'store_description.store_id',
            '=',
            'store.id'
        );

    return query;
};
