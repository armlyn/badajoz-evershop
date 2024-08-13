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
            { value: false, text: 'Disabled' },
            { value: true, text: 'Enabled' }
          ]}
          value={store.approved}
        />
      </Card.Session>
    </Card>
  );
}

Status.propTypes = {
  store: PropTypes.shape({
    approved: PropTypes.bool,
  })
};

Status.defaultProps = {
  store: {}
};

export const layout = {
  areaId: 'rightSide',
  sortOrder: 15
};

export const query = `
  query Query {
    store(id: getContextValue("storeId", null)) {
      approved
    }
  }
`;
