import PropTypes from 'prop-types';
import React from 'react';
import RegionList from './RegionList';

export default function RegionPage({
    regions: { items: regions, total, currentFilters = [] }
}) {

    return (

        <div className="page-width">
            <h3 className="uppercase h5 tracking-widest">
                Municipios
            </h3>
            <RegionList regions={regions} countPerRow={4} />
        </div>
    );
}

RegionPage.propTypes = {
    regions: PropTypes.shape({
        items: PropTypes.arrayOf(
            PropTypes.shape({
                regionId: PropTypes.number,
                uuid: PropTypes.string,
                name: PropTypes.string,
                description: PropTypes.string,
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
    regions (filters: $filters) {
      items {
        regionId
        uuid
        name
        description
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