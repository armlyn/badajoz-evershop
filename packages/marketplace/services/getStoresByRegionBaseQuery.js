const { execute } = require('@evershop/postgres-query-builder');
const { pool } = require('@evershop/evershop/src/lib/postgres/connection');
const { getStoresBaseQuery } = require('./getStoresBaseQuery');

module.exports.getStoresByRegionBaseQuery = async (
    regionId
) => {
    const query = getStoresBaseQuery();
    query.where('store.region_id', '=', regionId);

    return query;
};
