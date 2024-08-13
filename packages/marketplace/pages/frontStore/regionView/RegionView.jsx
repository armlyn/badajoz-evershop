import React from 'react';
import PropTypes from 'prop-types';
import Area from '@components/common/Area';

export default function RegionView({
    region: { name, description }
}) {
    return (
        <div className="page-width">
            <h1 className="region__name">{name}</h1>
            <div className="page-width grid grid-cols-1 md:grid-cols-4 gap-2">
                <Area id="leftColumn" className="md:col-span-1" />
                <Area id="rightColumn" className="md:col-span-3" />
            </div>
        </div>
    );
}

export const layout = {
    areaId: 'content',
    sortOrder: 10
};

RegionView.propTypes = {
    region: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }).isRequired
};

export const query = `
  query Query {
    region(id: getContextValue('regionId')) {
      name
      description
    }
}`;