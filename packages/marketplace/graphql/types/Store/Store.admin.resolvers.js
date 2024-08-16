const { buildUrl } = require('@evershop/evershop/src/lib/router/buildUrl');

module.exports = {
    Store: {
        editUrl: (store) => buildUrl('storeEdit', { id: store.uuid }),
        updateApi: (store) => buildUrl('updateStore', { id: store.uuid }),
        deleteApi: (store) => buildUrl('deleteStore', { id: store.uuid })
    }
};
