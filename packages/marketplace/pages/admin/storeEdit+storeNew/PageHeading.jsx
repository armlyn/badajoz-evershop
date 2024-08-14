import PropTypes from 'prop-types';
import React from 'react';
import PageHeading from '@components/admin/cms/PageHeading';

export default function StoreEditPageHeading({ backUrl, store }) {
  return (
    <PageHeading
      backUrl={backUrl}
      heading={store ? `Editing ${store.name}` : 'Create A New store'}
    />
  );
}

StoreEditPageHeading.propTypes = {
  backUrl: PropTypes.string.isRequired,
  store: PropTypes.shape({
    name: PropTypes.string
  })
};

StoreEditPageHeading.defaultProps = {
  store: {}
};

export const layout = {
  areaId: 'content',
  sortOrder: 5
};

export const query = `
  query Query {
    store(id: getContextValue("storeId", null)) {
      name
    }
    backUrl: url(routeId: "storeGrid")
  }
`;
