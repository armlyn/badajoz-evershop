import PropTypes from 'prop-types';
import React from 'react';
import PageHeading from '@components/admin/cms/PageHeading';

export default function RewardEditPageHeading({ backUrl, reward }) {
  return (
    <PageHeading
      backUrl={backUrl}
      heading={reward ? `Editing ${reward.name}` : 'Create A New Reward'}
    />
  );
}

RewardEditPageHeading.propTypes = {
  backUrl: PropTypes.string.isRequired,
  reward: PropTypes.shape({
    name: PropTypes.string
  })
};

RewardEditPageHeading.defaultProps = {
  reward: null
};

export const layout = {
  areaId: 'content',
  sortOrder: 5
};

export const query = `
  query Query {
    reward(id: getContextValue("rewardId", null)) {
      name
    }
    backUrl: url(routeId: "rewardGrid")
  }
`;
