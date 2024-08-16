import PropTypes from 'prop-types';
import React from 'react';
import Icon from '@heroicons/react/solid/esm/ArchiveIcon';
import NavigationItem from '@components/admin/cms/NavigationItem';

export default function NewStoreQuickLink({ storeNew }) {
    return <NavigationItem Icon={Icon} title="New Store" url={storeNew} />;
}

NewStoreQuickLink.propTypes = {
    storeNew: PropTypes.string.isRequired
};

export const layout = {
    areaId: 'quickLinks',
    sortOrder: 20
};

export const query = `
  query Query {
    storeNew: url(routeId:"storeNew")
  }
`;
