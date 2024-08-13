const { camelCase } = require('@evershop/evershop/src/lib/util/camelCase');
const { getConfig } = require('@evershop/evershop/src/lib/util/getConfig');

const { select, node, sql } = require('@evershop/postgres-query-builder');
const { pool } = require('@evershop/evershop/src/lib/postgres/connection');
const { getValue } = require('@evershop/evershop/src/lib/util/registry');

class StoreCollection {
    constructor(baseQuery) {
        this.baseQuery = baseQuery;
        this.baseQuery.orderBy('store.id', 'DESC');
    }

    /**
     *
     * @param {{key: String, operation: String, value: String}[]} filters
     * @param {boolean} isAdmin
     */
    async init(filters = [], isAdmin = false) {
        // If the user is not admin, we need to filter out the out of stock products and the disabled products
        if (!isAdmin) {
            this.baseQuery.andWhere('store.approved', '=', true);
        }
        const currentFilters = [];

        // Apply the filters
        const storeCollectionFilters = await getValue(
            'productCollectionFilters',
            [],
            {
                isAdmin
            }
        );

        storeCollectionFilters.forEach((filter) => {
            const check = filters.find(
                (f) => f.key === filter.key && filter.operation.includes(f.operation)
            );
            if (filter.key === '*' || check) {
                filter.callback(
                    this.baseQuery,
                    check?.operation,
                    check?.value,
                    currentFilters
                );
            }
        });

        // Clone the main query for getting total right before doing the paging
        const totalQuery = this.baseQuery.clone();
        totalQuery.select('COUNT(store.id)', 'total');
        totalQuery.removeOrderBy();
        totalQuery.removeLimit();

        this.currentFilters = currentFilters;
        this.totalQuery = totalQuery;
    }

    async items() {
        const items = await this.baseQuery.execute(pool);
        return items.map((row) => camelCase(row));
    }

    async total() {
        // Call items to get the total
        const total = await this.totalQuery.execute(pool);
        return total[0].total;
    }

    currentFilters() {
        return this.currentFilters;
    }
}

module.exports.StoreCollection = StoreCollection;
