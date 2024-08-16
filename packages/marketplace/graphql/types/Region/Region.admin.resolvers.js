const { select } = require('@evershop/postgres-query-builder');
const { buildUrl } = require('@evershop/evershop/src/lib/router/buildUrl');

module.exports = {
    Region: {
        editUrl: (region) => buildUrl('regionEdit', { id: region.uuid }),
        updateApi: (region) => buildUrl('updateRegion', { id: region.uuid }),
        deleteApi: (region) => buildUrl('deleteRegion', { id: region.uuid }),
        addStoreUrl: (region) =>
            buildUrl('addStoreToRegion', { region_id: region.uuid })
    },
    Store: {
        removeFromRegionUrl: async (store, _, { pool }) => {
            if (!store.regionId) {
                return null;
            } else {
                const region = await select()
                    .from('region')
                    .where('region_id', '=', store.regionId)
                    .load(pool);
                return buildUrl('removeStoreFromRegion', {
                    region_id: region.uuid,
                    store_id: store.uuid
                });
            }
        }
    }
};
