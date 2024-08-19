// import PropTypes from 'prop-types';
import React from 'react';
import Icon from '@heroicons/react/solid/esm/GiftIcon';
import NavigationItemGroup from '@components/admin/cms/NavigationItemGroup';

export default function RewardMenuGroup() {
  return (
    <NavigationItemGroup
      id="rewardMenuGroup"
      name="Reward"
      items={[
        {
          Icon,
          url: './',
          title: 'Reward'
        }
      ]}
    />
  );
}

// RewardMenuGroup.propTypes = {
//   rewardNew: PropTypes.string.isRequired
// };

export const layout = {
  areaId: 'adminMenu',
  sortOrder: 50
};

