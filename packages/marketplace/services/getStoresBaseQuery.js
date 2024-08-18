const { select } = require('@evershop/postgres-query-builder');

module.exports.getStoresBaseQuery = () => {
    const query = select().from('store');
    query
        .leftJoin('store_description')
        .on(
            'store_description.store_description_store_id',
            '=',
            'store.store_id'
        );

    return query;
};
