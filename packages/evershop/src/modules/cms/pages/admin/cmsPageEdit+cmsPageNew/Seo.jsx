/* eslint-disable no-param-reassign */
import PropTypes from 'prop-types';
import React from 'react';
import Area from '@components/common/Area';
import { Field } from '@components/common/form/Field';
import { get } from '@evershop/evershop/src/lib/util/get';
import { Card } from '@components/admin/cms/Card';
import { _ } from '@evershop/evershop/src/lib/locale/translate';

export default function Seo({ page }) {
  const fields = [
    {
      component: { default: Field },
      props: {
        type: 'text',
        id: 'urlKey',
        name: 'url_key',
        label: _('Url key'),
        validationRules: ['notEmpty']
      },
      sortOrder: 0
    },
    {
      component: { default: Field },
      props: {
        type: 'text',
        id: 'metaTitle',
        name: 'meta_title',
        label: _('Meta title'),
        placeholder: _('Meta title')
      },
      sortOrder: 10
    },
    {
      component: { default: Field },
      props: {
        type: 'text',
        id: 'metaKeywords',
        name: 'meta_keywords',
        label: _('Meta keywords'),
        placeholder: _('Meta keywords')
      },
      sortOrder: 20
    },
    {
      component: { default: Field },
      props: {
        type: 'textarea',
        id: 'metaDescription',
        name: _('meta_description'),
        label: _('meta_description')
      },
      sortOrder: 30
    }
  ].filter((f) => {
    if (get(page, `${f.props.id}`) !== undefined) {
      f.props.value = get(page, `${f.props.id}`);
    }
    return f;
  });

  return (
    <Card title={_("Search Engine Optimization")}>
      <Card.Session>
        <Area id="pageEditSeo" coreComponents={fields} />
      </Card.Session>
    </Card>
  );
}

Seo.propTypes = {
  page: PropTypes.shape({
    urlKey: PropTypes.string,
    metaTitle: PropTypes.string,
    metaKeywords: PropTypes.string,
    metaDescription: PropTypes.string
  })
};

Seo.defaultProps = {
  page: {}
};

export const layout = {
  areaId: 'leftSide',
  sortOrder: 30
};

export const query = `
  query Query {
    page: cmsPage(id: getContextValue('cmsPageId', null)) {
      urlKey
      metaTitle
      metaKeywords
      metaDescription
    }
  }
`;
