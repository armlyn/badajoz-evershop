import PropTypes from 'prop-types';
import React from 'react';
import { toast } from 'react-toastify';
import Area from '@components/common/Area';
import { Form } from '@components/common/form/Form';
import { get } from '@evershop/evershop/src/lib/util/get';

export default function StoreEditForm({ action }) {
  const id = 'storeForm';
  return (
    <Form
      method="PATCH"
      action={action}
      onError={() => {
        toast.error('Something wrong. Please reload the page!');
      }}
      onSuccess={(response) => {
        if (response.error) {
          toast.error(
            get(
              response,
              'error.message',
              'Something wrong. Please reload the page!'
            )
          );
        } else {
          toast.success('Store saved successfully!');
        }
      }}
      submitBtn={false}
      id={id}
    >
      <Area id="storeForm" noOuter />
    </Form>
  );
}

StoreEditForm.propTypes = {
  action: PropTypes.string.isRequired
};

export const layout = {
  areaId: 'content',
  sortOrder: 10
};

export const query = `
  query Query {
    action: url(routeId: "updateStore", params: [{key: "id", value: getContextValue("storeUuid")}]),
    gridUrl: url(routeId: "storeGrid")
  }
`;
