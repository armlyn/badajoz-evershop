import PropTypes from 'prop-types';
import React from 'react';
import Button from '@components/common/form/Button';

export default function NewRegionButton({ newRegionUrl }) {
  return <Button url={newRegionUrl} title="New Region" />;
}

NewRegionButton.propTypes = {
  newRegionUrl: PropTypes.string.isRequired
};

export const layout = {
  areaId: 'pageHeadingRight',
  sortOrder: 10
};

export const query = `
  query Query {
    newRegionUrl: url(routeId: "regionNew")
  }
`;
