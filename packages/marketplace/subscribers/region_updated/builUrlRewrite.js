const { error } = require('@evershop/evershop/src/lib/log/logger');
const { pool } = require('@evershop/evershop/src/lib/postgres/connection');
const {
  execute,
  insertOnUpdate,
  select
} = require('@evershop/postgres-query-builder');

module.exports = async function buildUrlReWrite(data) {
  try {
    const regionUuid = data.uuid;
    const regionId = data.region_id;
    // Load the category
    const region = await select()
      .from('region')
      .where('region_id', '=', regionId)
      .load(pool);

    if (!region) {
      return;
    }

    const urlKey = await select('url_key')
      .from('region_description')
      .where('region_description_region_id', '=', regionId)
      .load(pool);
    const path = `/${urlKey.url_key}`;
    
    // Save the current path
    const currentPath = await select('request_path')
      .from('url_rewrite')
      .where('entity_uuid', '=', regionUuid)
      .and('entity_type', '=', 'region')
      .load(pool);

    // Insert the url rewrite rule to the url_rewrite table
    await insertOnUpdate('url_rewrite', ['entity_uuid', 'language'])
      .given({
        entity_type: 'region',
        entity_uuid: regionUuid,
        request_path: path,
        target_path: `/region/${regionUuid}`
      })
      .execute(pool);

    if (currentPath) {
      await execute(
        pool,
        `UPDATE url_rewrite SET request_path = REPLACE(request_path, '${currentPath.request_path}', '${path}') WHERE entity_type IN ('region', 'store') AND entity_uuid != '${regionUuid}'`
      );
    }
  } catch (err) {
    error(err);
  }
};
