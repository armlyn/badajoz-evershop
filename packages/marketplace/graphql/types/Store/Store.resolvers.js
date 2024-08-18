const { select } = require('@evershop/postgres-query-builder');
const { buildUrl } = require('@evershop/evershop/src/lib/router/buildUrl');
const { camelCase } = require('@evershop/evershop/src/lib/util/camelCase');
const {
    getStoresBaseQuery
} = require('../../../services/getStoresBaseQuery');
const { StoreCollection } = require('../../../services/StoreCollection');

module.exports = {
    Store: {
        url: async (store, _, { pool }) => {
            // Get the url rewrite for this store
            const urlRewrite = await select()
                .from('url_rewrite')
                .where('entity_uuid', '=', store.uuid)
                .and('entity_type', '=', 'store')
                .load(pool);
            if (!urlRewrite) {
                return buildUrl('storeView', { uuid: store.uuid });
            } else {
                return urlRewrite.request_path;
            }
        }
    },
    Query: {
        store: async (_, { id }, { pool }) => {
            const query = getStoresBaseQuery();
            query.where('store.store_id', '=', id);
            const result = await query.load(pool);
            if (!result) {
                return null;
            } else {
                return camelCase(result);
            }
        },
        stores: async (_, { filters = [] }, { user }) => {
            const query = getStoresBaseQuery();
            const root = new StoreCollection(query);
            await root.init(filters, !!user);
            return root;
        }
    }
};
