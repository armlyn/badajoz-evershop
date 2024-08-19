import React from 'react';
import Icon from '@heroicons/react/solid/esm/GiftIcon';
import NavigationItem from '@components/admin/cms/NavigationItem';

export default function NewRewardQuickLink() {
  return <NavigationItem Icon={Icon} title="New Coupon" url='./' />;
}

// NewProductQuickLink.propTypes = {
//   couponNew: PropTypes.string.isRequired
// };

export const layout = {
  areaId: 'quickLinks',
  sortOrder: 30
};


