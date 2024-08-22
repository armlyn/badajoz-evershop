import PropTypes from 'prop-types';
import React from 'react';
import Button from '@components/common/form/Button';

export default function NewRewardButton({ newRewardUrl }) {
  return <Button url={newRewardUrl} title="New Reward" />;
}

NewRewardButton.propTypes = {
  newRewardUrl: PropTypes.string.isRequired
};

export const layout = {
  areaId: 'pageHeadingRight',
  sortOrder: 10
};

export const query = `
  query Query {
    newRewardUrl: url(routeId: "rewardNew")
  }
`;
