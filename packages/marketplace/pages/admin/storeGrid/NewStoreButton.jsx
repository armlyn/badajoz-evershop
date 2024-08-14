import PropTypes from 'prop-types';
import React from 'react';
import Button from '@components/common/form/Button';

export default function NewStoreButton({ newStoreUrl }) {
  return <Button url={newStoreUrl} title="New Store" />;
}

NewStoreButton.propTypes = {
  newStoreUrl: PropTypes.string.isRequired
};

export const layout = {
  areaId: 'pageHeadingRight',
  sortOrder: 10
};

export const query = `
  query Query {
    newStoreUrl: url(routeId: "storeNew")
  }
`;
