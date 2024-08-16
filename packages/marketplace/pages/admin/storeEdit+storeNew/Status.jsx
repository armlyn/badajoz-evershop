import PropTypes from 'prop-types';
import React from 'react';
import { Field } from '@components/common/form/Field';
import { Card } from '@components/admin/cms/Card';

export default function Status({ store }) {
  return (
    <Card>
      <Card.Session title="Status">
        <Field
          type="radio"
          name="status"
          options={[
            { value: 0, text: 'Disabled' },
            { value: 1, text: 'Enabled' }
          ]}
          value={store?.status === undefined ? 1 : store.status}
          label="Status"
        />
      </Card.Session>
    </Card>
  );
}

Status.propTypes = {
  store: PropTypes.shape({
    status: PropTypes.number.isRequired
  })
};

Status.defaultProps = {
  store: {
    status: 1
  }
};

export const layout = {
  areaId: 'rightSide',
  sortOrder: 15
};

export const query = `
  query Query {
    store(id: getContextValue("storeId", null)) {
      status
    }
  }
`;
