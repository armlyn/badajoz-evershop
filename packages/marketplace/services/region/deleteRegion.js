const { hookable } = require('@evershop/evershop/src/lib/util/hookable');
const {
  startTransaction,
  commit,
  rollback,
  select,
  del
} = require('@evershop/postgres-query-builder');
const {
  getConnection
} = require('@evershop/evershop/src/lib/postgres/connection');

async function deleteRegionData(uuid, connection) {
  await del('region').where('uuid', '=', uuid).execute(connection);
}
/**
 * Delete region service. This service will delete a region with all related data
 * @param {String} uuid
 * @param {Object} context
 */
async function deleteRegion(uuid, context) {
  const connection = await getConnection();
  await startTransaction(connection);
  try {
    const query = select().from('region');
    query
      .leftJoin('region_description')
      .on(
        'region_description.region_description_region_id',
        '=',
        'region.region_id'
      );

    const region = await query.where('uuid', '=', uuid).load(connection);

    if (!region) {
      throw new Error('Invalid region id');
    }
    await hookable(deleteRegionData, { ...context, connection, region })(
      uuid,
      connection
    );

    await commit(connection);
    return region;
  } catch (e) {
    await rollback(connection);
    throw e;
  }
}

module.exports = async (uuid, context) => {
  // Make sure the context is either not provided or is an object
  if (context && typeof context !== 'object') {
    throw new Error('Context must be an object');
  }
  const region = await hookable(deleteRegion, context)(uuid, context);
  return region;
};
