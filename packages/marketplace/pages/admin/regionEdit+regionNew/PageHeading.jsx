import PropTypes from 'prop-types';
import React from 'react';
import PageHeading from '@components/admin/cms/PageHeading';

export default function RegionEditPageHeading({ backUrl, region }) {
  return (
    <PageHeading
      backUrl={backUrl}
      heading={region ? `Editing ${region.name}` : 'Create A New region'}
    />
  );
}

RegionEditPageHeading.propTypes = {
  backUrl: PropTypes.string.isRequired,
  region: PropTypes.shape({
    name: PropTypes.string
  })
};

RegionEditPageHeading.defaultProps = {
  region: {}
};

export const layout = {
  areaId: 'content',
  sortOrder: 5
};

export const query = `
  query Query {
    region(id: getContextValue("regionId", null)) {
      name
    }
    backUrl: url(routeId: "regionGrid")
  }
`;
