import PropTypes from 'prop-types';
import React from 'react';
import StoreIcon from '@heroicons/react/solid/esm/OfficeBuildingIcon';
import RegionIcon from '@heroicons/react/solid/esm/MapIcon';
import NavigationItemGroup from '@components/admin/cms/NavigationItemGroup';

export default function MarketplaceMenuGroup({
    storeGrid,
    regionGrid
}) {
    return (
        <NavigationItemGroup
            id="marketplaceMenuGroup"
            name="Marketplace"
            items={[
                {
                    Icon: StoreIcon,
                    url: storeGrid,
                    title: 'Stores'
                },{
                    Icon: RegionIcon,
                    url: regionGrid,
                    title: 'Regions'
                }
            ]}
        />
    );
}

MarketplaceMenuGroup.propTypes = {
    storeGrid: PropTypes.string.isRequired
};

export const layout = {
    areaId: 'adminMenu',
    sortOrder: 20
};

export const query = `
  query Query {
    storeGrid: url(routeId:"storeGrid")
    regionGrid: url(routeId:"regionGrid")

  }
`;
