const { error } = require('@evershop/evershop/src/lib/log/logger');
const { pool } = require('@evershop/evershop/src/lib/postgres/connection');
const { select, insertOnUpdate } = require('@evershop/postgres-query-builder');

module.exports = async function buildUrlReWrite(data) {
  const regionId = data.region_id;
  const regionUuid = data.uuid;

  // Load the region
  const region = await select()
    .from('region')
    .where('region_id', '=', regionId)
    .load(pool);

  if (!region) {
    return;
  }

  try {
    // Build the url rewrite base on the region path, join the region_description table to get the url_key
    const urlKey = await select('url_key')
      .from('region_description')
      .where('region_description_region_id', '=', regionId)
      .load(pool);

    const path = `/${urlKey.url_key}`;
    

    // Insert the url rewrite rule to the url_rewrite table
    await insertOnUpdate('url_rewrite', ['entity_uuid', 'language'])
      .given({
        entity_type: 'region',
        entity_uuid: regionUuid,
        request_path: path,
        target_path: `/region/${regionUuid}`
      })
      .execute(pool);
  } catch (err) {
    error(err);
  }
};
