import PropTypes from 'prop-types';
import React from 'react';
import Icon from '@heroicons/react/solid/esm/GiftIcon';
import NavigationItem from '@components/admin/cms/NavigationItem';

export default function RewardsMenuItem({ url }) {
  return <NavigationItem Icon={Icon} title="Rewards" url={url} />;
}

RewardsMenuItem.propTypes = {
  url: PropTypes.string.isRequired
};
