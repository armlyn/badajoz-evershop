import PropTypes from 'prop-types';
import React from 'react';
import Area from '@components/common/Area';
import { get } from '@evershop/evershop/src/lib/util/get';
import { Field } from '@components/common/form/Field';
import { Card } from '@components/admin/cms/Card';
import CkeditorField from '@components/common/form/fields/Ckeditor';

export default function General({
  store,
  browserApi,
  deleteApi,
  uploadApi,
  folderCreateApi
}) {
  const fields = [
    {
      component: { default: Field },
      props: {
        id: 'name',
        name: 'name',
        label: 'Name',
        validationRules: ['notEmpty'],
        type: 'text'
      },
      sortOrder: 10,
      id: 'name'
    },
    {
      component: { default: Field },
      props: {
        id: 'storeId',
        name: 'id',
        type: 'hidden'
      },
      sortOrder: 20
    },
    {
      component: { default: Field },
      props: {
        id: 'address',
        name: 'address',
        label: 'Address',
        validationRules: ['notEmpty'],
        type: 'text'
      },
      sortOrder: 30,
      id: 'address'
    },
    {
      component: { default: Field },
      props: {
        id: 'phone',
        name: 'phone',
        label: 'Phone',
        validationRules: ['notEmpty'],
        type: 'text'
      },
      sortOrder: 40,
      id: 'phone'
    },
    {
      component: { default: CkeditorField },
      props: {
        id: 'description',
        name: 'description',
        label: 'Description',
        browserApi,
        deleteApi,
        uploadApi,
        folderCreateApi
      },
      sortOrder: 50
    }
  ].map((f) => {
    if (get(store, `${f.props.id}`) !== undefined) {
      // eslint-disable-next-line no-param-reassign
      f.props.value = get(store, `${f.props.id}`);
    }
    return f;
  });

  return (
    <Card title="General">
      <Card.Session>
        <Area id="storeEditGeneral" coreComponents={fields} />
      </Card.Session>
    </Card>
  );
}

General.propTypes = {
  browserApi: PropTypes.string.isRequired,
  deleteApi: PropTypes.string.isRequired,
  folderCreateApi: PropTypes.string.isRequired,
  uploadApi: PropTypes.string.isRequired,
  store: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
    address: PropTypes.string,
    phone: PropTypes.string,
    approved: PropTypes.number,
    urlKey: PropTypes.string,
    metaTitle: PropTypes.string,
    metaDescription: PropTypes.string,
    metaKeywords: PropTypes.string
  })
};

General.defaultProps = {
  store: {}
};

export const layout = {
  areaId: 'leftSide',
  sortOrder: 10
};

export const query = `
  query Query {
    store(id: getContextValue("storeId", null)) {
      id
      name
      description
      address
      phone
      approved
      urlKey
      metaTitle
      metaDescription
      metaKeywords
    }
    browserApi: url(routeId: "fileBrowser", params: [{key: "0", value: ""}])
    deleteApi: url(routeId: "fileDelete", params: [{key: "0", value: ""}])
    uploadApi: url(routeId: "imageUpload", params: [{key: "0", value: ""}])
    folderCreateApi: url(routeId: "folderCreate")
  }
`;
