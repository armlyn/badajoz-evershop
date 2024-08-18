const { hookable } = require('@evershop/evershop/src/lib/util/hookable');
const {
  getValueSync,
  getValue
} = require('@evershop/evershop/src/lib/util/registry');
const {
  startTransaction,
  commit,
  rollback,
  insert,
  select
} = require('@evershop/postgres-query-builder');
const {
  getConnection
} = require('@evershop/evershop/src/lib/postgres/connection');
const { getAjv } = require('@evershop/evershop/src/modules/base/services/getAjv');
const regionDataSchema = require('./regionDataSchema.json');

function validateRegionDataBeforeInsert(data) {
  const ajv = getAjv();
  regionDataSchema.required = ['name', 'url_key'];
  const jsonSchema = getValueSync('createRegionDataJsonSchema', regionDataSchema);
  const validate = ajv.compile(jsonSchema);
  const valid = validate(data);
  if (valid) {
    return data;
  } else {
    throw new Error(validate.errors[0].message);
  }
}

async function insertRegionData(data, connection) {
  const region = await insert('region').given(data).execute(connection);
  const description = await insert('region_description')
    .given(data)
    .prime('region_id', region.insertId)
    .execute(connection);

  return {
    ...description,
    ...region
  };
}

/**
 * Create region service. This service will create a region with all related data
 * @param {Object} data
 * @param {Object} context
 */
async function createRegion(data, context) {
  const connection = await getConnection();
  await startTransaction(connection);
  try {
    const regionData = await getValue('regionDataBeforeCreate', data);
    // Validate region data
    validateRegionDataBeforeInsert(regionData);

    // Insert region data
    const region = await hookable(insertRegionData, context)(
      regionData,
      connection
    );

    await commit(connection);
    return region;
  } catch (e) {
    await rollback(connection);
    throw e;
  }
}

module.exports = async (data, context) => {
  // Make sure the context is either not provided or is an object
  if (context && typeof context !== 'object') {
    throw new Error('Context must be an object');
  }
  const region = await hookable(createRegion, context)(data, context);
  return region;
};
