const { error } = require('@evershop/evershop/src/lib/log/logger');
const { pool } = require('@evershop/evershop/src/lib/postgres/connection');
const { execute, select } = require('@evershop/postgres-query-builder');

module.exports = async function deleteUrlReWrite(data) {
  try {
    const regionUuid = data.uuid;
    // Get the current url rewrite for this category
    const urlRewrite = await select()
      .from('url_rewrite')
      .where('entity_uuid', '=', regionUuid)
      .and('entity_type', '=', 'region')
      .load(pool);
    // Delete all the url rewrite rule for this category
    await execute(
      pool,
      `DELETE FROM url_rewrite WHERE entity_type = 'region' AND entity_uuid = '${regionUuid}'`
    );

    if (!urlRewrite) {
      return;
    } else {
      // Delete all the url rewrite rule for the sub regions and storess
      await execute(
        pool,
        `DELETE FROM url_rewrite WHERE request_path LIKE '${urlRewrite.request_path}/%' AND entity_type IN ('region', 'store')`
      );
    }
  } catch (err) {
    error(err);
  }
};
