const { pool } = require('@evershop/evershop/src/lib/postgres/connection');
const { execute } = require('@evershop/postgres-query-builder');

module.exports = async function buildUrlReWrite(data) {
    const storeUuid = data.uuid;

    // Delete the url rewrite for the store
    await execute(
        pool,
        `DELETE FROM url_rewrite WHERE entity_uuid = '${storeUuid}' AND entity_type = 'store'`
    );
};
