import PropTypes from 'prop-types';
import React from 'react';
import Area from '@components/common/Area';
import { get } from '@evershop/evershop/src/lib/util/get';
import { Field } from '@components/common/form/Field';
import { Card } from '@components/admin/cms/Card';

export default function Seo({ store }) {
  const fields = [
    {
      component: { default: Field },
      props: {
        id: 'urlKey',
        name: 'url_key',
        label: 'Url key',
        validationRules: ['notEmpty'],
        type: 'text'
      },
      sortOrder: 0
    },
    {
      component: { default: Field },
      props: {
        id: 'metaTitle',
        name: 'meta_title',
        label: 'Meta title',
        type: 'text'
      },
      sortOrder: 10
    },
    {
      component: { default: Field },
      props: {
        id: 'metakeywords',
        name: 'meta_keywords',
        label: 'Meta keywords',
        type: 'text'
      },
      sortOrder: 20
    },
    {
      component: { default: Field },
      props: {
        id: 'metaDescription',
        name: 'meta_description',
        label: 'Meta description',
        options: [
          { value: 0, text: 'Disabled' },
          { value: 1, text: 'Enabled' }
        ],
        type: 'textarea'
      },
      sortOrder: 30
    }
  ].map((f) => {
    if (get(store, `${f.props.id}`) !== undefined) {
      // eslint-disable-next-line no-param-reassign
      f.props.value = get(store, `${f.props.id}`);
    }
    return f;
  });

  return (
    <Card title="Search engine optimize">
      <Card.Session>
        <Area id="storeEditSeo" coreComponents={fields} />
      </Card.Session>
    </Card>
  );
}

Seo.propTypes = {
  store: PropTypes.shape({
    metaDescription: PropTypes.string,
    metaKeywords: PropTypes.string,
    metaTitle: PropTypes.string,
    urlKey: PropTypes.string
  })
};

Seo.defaultProps = {
  store: {
    metaDescription: '',
    metaKeywords: '',
    metaTitle: '',
    urlKey: ''
  }
};

export const layout = {
  areaId: 'leftSide',
  sortOrder: 60
};

export const query = `
  query Query {
    store(id: getContextValue('storeId', null)) {
      urlKey
      metaTitle
      metaKeywords
      metaDescription
    }
  }
`;
