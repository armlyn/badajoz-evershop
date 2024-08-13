const { select } = require('@evershop/postgres-query-builder');

module.exports.getRegionsBaseQuery = () => {
    const query = select().from('region');

    return query;
};
