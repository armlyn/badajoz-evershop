const { select, value } = require('@evershop/postgres-query-builder');
const { buildUrl } = require('@evershop/evershop/src/lib/router/buildUrl');

module.exports = {
    Query: {
        menu: async (root, _, { pool }) => {
            const query = select('name')
                .select('uuid')
                .from('region', 'reg');
            query
                .leftJoin('url_rewrite', 'url')
                .on('url.entity_uuid', '=', 'reg.uuid')
                .and('url.entity_type', '=', value('region'));

            const items = (await query.execute(pool)).map((i) => ({
                name: i.name,
                url: i.request_path || buildUrl('regionView', { uuid: i.uuid })
            }));

            return { items };
        }
    }
};
