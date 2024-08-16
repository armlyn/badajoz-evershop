const { select, execute } = require('@evershop/postgres-query-builder');
const { buildUrl } = require('@evershop/evershop/src/lib/router/buildUrl');
const { camelCase } = require('@evershop/evershop/src/lib/util/camelCase');
const {
    getStoresByRegionBaseQuery
} = require('../../../services/getStoresByRegionBaseQuery');

const { StoreCollection } = require('../../../services/StoreCollection');
const {
    getRegionsBaseQuery
} = require('../../../services/getRegionsBaseQuery');
const { RegionCollection } = require('../../../services/RegionCollection');

module.exports = {
    Query: {
        region: async (_, { id }, { pool }) => {
            const query = select().from('region');

            query.where('id', '=', id);
            const result = await query.load(pool);
            return result ? camelCase(result) : null;
        },
        regions: async (_, { filters = [] }, { user }) => {
            const query = getRegionsBaseQuery();
            const root = new RegionCollection(query);
            await root.init(filters, !!user);
            return root;
        }
    },
    Region: {
        stores: async (region, { filters = [] }, { user }) => {
            const query = await getStoresByRegionBaseQuery(
                region.id,
                !user
            );
            const root = new StoreCollection(query);
            await root.init(filters, !!user);
            return root;
        },
        url: async (region, _, { pool }) => {
            // Get the url rewrite for this region
            const urlRewrite = await select()
                .from('url_rewrite')
                .where('entity_uuid', '=', region.uuid)
                .and('entity_type', '=', 'region')
                .load(pool);
            if (!urlRewrite) {
                return buildUrl('regionView', { uuid: region.uuid });
            } else {
                return urlRewrite.request_path;
            }
        }
    },
    Store: {
        region: async (store, _, { pool }) => {
            if (!store.region_id) {
                return null;
            } else {
                const regionQuery = getRegionsBaseQuery();
                regionQuery.where('region_id', '=', store.region_id);
                const region = await regionQuery.load(pool);
                return camelCase(region);
            }
        }
    }
};
