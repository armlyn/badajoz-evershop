import PropTypes from 'prop-types';
import React from 'react';
import StoreList from './StoreList';

export default function StorePage({
    stores: { items: stores, total, currentFilters = [] }
}) {
    
    return (

        <div className="page-width">
            <h3 className="uppercase h5 tracking-widest">
                Tiendas
            </h3>
            <StoreList stores={stores} countPerRow={4} />
        </div>
    );
}

StorePage.propTypes = {
    stores: PropTypes.shape({
        items: PropTypes.arrayOf(
            PropTypes.shape({
                storeId: PropTypes.number,
                uuid: PropTypes.string,
                name: PropTypes.string,
                address: PropTypes.string,
                status: PropTypes.number,
                editUrl: PropTypes.string,
                updateApi: PropTypes.string,
                deleteApi: PropTypes.string
            })
        ),
        total: PropTypes.number,
        currentFilters: PropTypes.arrayOf(
            PropTypes.shape({
                key: PropTypes.string,
                operation: PropTypes.string,
                value: PropTypes.string
            })
        )
    }).isRequired
};

export const layout = {
    areaId: 'content',
    sortOrder: 15
};

export const query = `
  query Query($filters: [FilterInput]) {
    stores (filters: $filters) {
      items {
        storeId
        uuid
        name
        address
        status
      }
      total
      currentFilters {
        key
        operation
        value
      }
    }
  }
`;


export const variables = `
{
  filters: getContextValue('filtersFromUrl')
}`;