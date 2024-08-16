import PropTypes from 'prop-types';
import React from 'react';
import { Field } from '@components/common/form/Field';
import { Card } from '@components/admin/cms/Card';
import { _ } from '@evershop/evershop/src/lib/locale/translate';

export default function StatusAndLayout({ cmsPage }) {
  return (
    <Card>
      <Card.Session title={_("Status")}>
        <Field
          type="radio"
          name="status"
          options={[
            { value: 0, text: _('Disabled') },
            { value: 1, text: _('Enabled') }
          ]}
          value={cmsPage?.status}
        />
      </Card.Session>
      <Card.Session title={_("Layout")}>
        <Field
          type="radio"
          name="layout"
          options={[
            { value: 'oneColumn', text: _('One column') },
            { value: 'twoColumnsLeft', text: _('Two columns left') },
            { value: 'twoColumnsRight', text: _('Two columns right') },
            { value: 'threeColumns', text: _('Three columns') }
          ]}
          value={cmsPage?.layout}
        />
      </Card.Session>
    </Card>
  );
}

StatusAndLayout.propTypes = {
  cmsPage: PropTypes.shape({
    status: PropTypes.number,
    includeInNave: PropTypes.number,
    layout: PropTypes.string.isRequired
  })
};

StatusAndLayout.defaultProps = {
  cmsPage: null
};

export const layout = {
  areaId: 'rightSide',
  sortOrder: 15
};

export const query = `
  query Query {
    cmsPage(id: getContextValue("cmsPageId", null)) {
      status
      layout
    }
  }
`;
