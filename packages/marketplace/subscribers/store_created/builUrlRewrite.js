const { error } = require('@evershop/evershop/src/lib/log/logger');
const { pool } = require('@evershop/evershop/src/lib/postgres/connection');
const {
  execute,
  insertOnUpdate,
  select
} = require('@evershop/postgres-query-builder');

module.exports = async function buildUrlReWrite(data) {
  try {
    const storeUUid = data.uuid;
    const storeId = data.id;
    // Load the store
    const store = await select()
      .from('store')
      .where('id', '=', storeId)
      .load(pool);

    if (!store) {
      return;
    }
  
    // Save the current path
    const currentPath = await select('request_path')
      .from('url_rewrite')
      .where('entity_uuid', '=', storeUUid)
      .and('entity_type', '=', 'store')
      .load(pool);

    // Insert the url rewrite rule to the url_rewrite table
    await insertOnUpdate('url_rewrite', ['entity_uuid', 'language'])
      .given({
        entity_type: 'store',
        entity_uuid: storeUUid,
        request_path: path,
        target_path: `/store/${storeUUid}`
      })
      .execute(pool);

    // Replace the url rewrite rule for all the sub categories and products. Search for the url rewrite rule by entity_uuid and entity_type
    if (currentPath) {
      await execute(
        pool,
        `UPDATE url_rewrite SET request_path = REPLACE(request_path, '${currentPath.request_path}', '${path}') WHERE entity_type IN ('store') AND entity_uuid != '${storeUUid}'`
      );
    }
  } catch (err) {
    error(err);
  }
};
