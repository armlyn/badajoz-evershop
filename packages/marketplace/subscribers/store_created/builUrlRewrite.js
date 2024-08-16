const { error } = require('@evershop/evershop/src/lib/log/logger');
const { pool } = require('@evershop/evershop/src/lib/postgres/connection');
const { insertOnUpdate, select } = require('@evershop/postgres-query-builder');

module.exports = async function buildUrlReWrite(data) {
  try {
    const storeId = data.id;
    const storeUuid = data.uuid;
    const regionId = data.region_id;
    const storeDescription = await select()
      .from('store_description')
      .where('store_id', '=', storeId)
      .load(pool);

    if (!storeDescription) {
      return;
    }

    // Insert a new url rewrite for the store itself
    await insertOnUpdate('url_rewrite', ['entity_uuid', 'language'])
      .given({
        entity_type: 'store',
        entity_uuid: storeUuid,
        request_path: `/${storeDescription.url_key}`,
        target_path: `/store/${storeUuid}`
      })
      .execute(pool);

    // Load the region
    const region = await select()
      .from('region')
      .where('id', '=', regionId)
      .load(pool);

    if (!region) {
      return;
    }

    // Get the url_rewrite for the region
    const regionUrlRewrite = await select()
      .from('url_rewrite')
      .where('entity_uuid', '=', region.uuid)
      .and('entity_type', '=', 'region')
      .load(pool);

    if (!regionUrlRewrite) {
      // Wait for the region event to be fired and create the url rewrite for product
      return;
    } else {
      await insertOnUpdate('url_rewrite', ['entity_uuid', 'language'])
        .given({
          entity_type: 'store',
          entity_uuid: storeUuid,
          request_path: `${regionUrlRewrite.request_path}/${storeDescription.url_key}`,
          target_path: `/store/${storeUuid}`
        })
        .execute(pool);
    }

  } catch (err) {
    error(err);
  }
};
