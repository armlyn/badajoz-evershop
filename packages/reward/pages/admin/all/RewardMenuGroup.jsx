import PropTypes from 'prop-types';
import React from 'react';
import StoreIcon from '@heroicons/react/solid/esm/OfficeBuildingIcon';
// import RegionIcon from '@heroicons/react/solid/esm/MapIcon';
import NavigationItemGroup from '@components/admin/cms/NavigationItemGroup';

export default function rewardMenuGroup({
  rewardGrid
}) {
    return (
        <NavigationItemGroup
            id="rewardMenuGroup"
            name="Reward"
            items={[
                {
                    Icon: StoreIcon,
                    url: rewardGrid,
                    title: 'Reward'
                }
            ]}
        />
    );
}

rewardMenuGroup.propTypes = {
  rewardGrid: PropTypes.string.isRequired
};

export const layout = {
    areaId: 'adminMenu',
    sortOrder: 20
};

export const query = `
  query Query {
    rewardGrid: url(routeId:"rewardGrid")

  }
`;
