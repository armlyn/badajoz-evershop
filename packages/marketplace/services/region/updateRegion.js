const { hookable } = require('@evershop/evershop/src/lib/util/hookable');
const {
  getValueSync,
  getValue
} = require('@evershop/evershop/src/lib/util/registry');
const {
  startTransaction,
  commit,
  rollback,
  update,
  select
} = require('@evershop/postgres-query-builder');
const {
  getConnection
} = require('@evershop/evershop/src/lib/postgres/connection');
const { getAjv } = require('../../../base/services/getAjv');
const regionDataSchema = require('./regionDataSchema.json');

function validateRegionDataBeforeInsert(data) {
  const ajv = getAjv();
  regionDataSchema.required = [];
  const jsonSchema = getValueSync(
    'updateRegionDataJsonSchema',
    regionDataSchema
  );
  const validate = ajv.compile(jsonSchema);
  const valid = validate(data);
  if (valid) {
    return data;
  } else {
    throw new Error(validate.errors[0].message);
  }
}

async function updateRegionData(uuid, data, connection) {
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
    throw new Error('Requested region not found');
  }

  try {
    const newRegion = await update('region')
      .given(data)
      .where('uuid', '=', uuid)
      .execute(connection);
    Object.assign(region, newRegion);
  } catch (e) {
    if (!e.message.includes('No data was provided')) {
      throw e;
    }
  }
  try {
    const description = await update('region_description')
      .given(data)
      .where('region_description_region_id', '=', region.region_id)
      .execute(connection);
    Object.assign(region, description);
  } catch (e) {
    if (!e.message.includes('No data was provided')) {
      throw e;
    }
  }

  return region;
}

/**
 * Update category service. This service will update a category with all related data
 * @param {String} uuid
 * @param {Object} data
 * @param {Object} context
 */
async function updateRegion(uuid, data, context) {
  const connection = await getConnection();
  await startTransaction(connection);
  try {
    const regionData = await getValue('categoryDataBeforeUpdate', data);
    // Validate category data
    validateRegionDataBeforeInsert(regionData);

    // Insert category data
    const region = await hookable(updateRegionData, {
      ...context,
      connection
    })(uuid, regionData, connection);

    await commit(connection);
    return region;
  } catch (e) {
    await rollback(connection);
    throw e;
  }
}

module.exports = async (uuid, data, context) => {
  // Make sure the context is either not provided or is an object
  if (context && typeof context !== 'object') {
    throw new Error('Context must be an object');
  }
  const region = await hookable(updateRegion, context)(uuid, data, context);
  return region;
};
