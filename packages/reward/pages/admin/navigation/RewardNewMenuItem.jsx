import PropTypes from 'prop-types';
import React from 'react';
import Icon from '@heroicons/react/solid/esm/GiftIcon';
import NavigationItem from '@components/admin/cms/NavigationItem';

export default function RewardNewMenuItem({ url }) {
  return <NavigationItem Icon={Icon} title="New reward" url={url} />;
}

RewardNewMenuItem.propTypes = {
  url: PropTypes.string.isRequired
};
