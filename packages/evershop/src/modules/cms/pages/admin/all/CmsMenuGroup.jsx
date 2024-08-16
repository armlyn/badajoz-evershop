import PropTypes from 'prop-types';
import React from 'react';
import Icon from '@heroicons/react/solid/esm/DocumentIcon';
import NavigationItemGroup from '@components/admin/cms/NavigationItemGroup';
import { _ } from '@evershop/evershop/src/lib/locale/translate';

export default function CmsMenuGroup({ cmsPageGrid }) {
  return (
    <NavigationItemGroup
      id="cmsMenuGroup"
      name="CMS"
      items={[
        {
          Icon,
          url: cmsPageGrid,
          title: _('Pages')
        }
      ]}
    />
  );
}

CmsMenuGroup.propTypes = {
  cmsPageGrid: PropTypes.string.isRequired
};

export const layout = {
  areaId: 'adminMenu',
  sortOrder: 60
};

export const query = `
  query Query {
    cmsPageGrid: url(routeId:"cmsPageGrid")
  }
`;
