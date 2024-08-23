import PropTypes from 'prop-types';
import React from 'react';
import Area from '@components/common/Area';
import { Field } from '@components/common/form/Field';
import { Toggle } from '@components/common/form/fields/Toggle';
import { get } from '@evershop/evershop/src/lib/util/get';
import { Setting } from '@components/admin/promotion/couponEdit/Setting';

export default function General({ reward = {} }) {
  return (
    <Area
      id="rewardFormGeneral"
      coreComponents={[
        {
          component: { default: Field },
          props: {
            name: 'reward',
            value: get(reward, 'name'),
            validationRules: ['notEmpty'],
            type: 'text',
            label: 'Reward',
            placeholder: 'Enter reward'
          },
          sortOrder: 10
        },
        {
          component: { default: Field },
          props: {
            name: 'description',
            value: get(reward, 'description'),
            type: 'textarea',
            label: 'Description',
            validationRules: ['notEmpty'],
            placeholder: 'Enter description'
          },
          sortOrder: 20
        },
        {
          component: { default: Toggle },
          props: {
            name: 'status',
            value: get(reward, 'status', 1).toString(),
            validationRules: ['notEmpty'],
            label: 'Status'
          },
          sortOrder: 30
        },
        {
          component: { default: Setting },
          props: {
            startDate: get(reward, 'startDate.text', ''),
            endDate: get(reward, 'endDate.text', ''),
            discountAmount: get(reward, 'discountAmount', '')
          },
          sortOrder: 40
        }
      ]}
    />
  );
}

General.propTypes = {
  reward: PropTypes.shape({
    name: PropTypes.string,
    // status: PropTypes.number,
    description: PropTypes.string,
    // discountAmount: PropTypes.number,
    startDate: PropTypes.string,
    endDate: PropTypes.string
  })
};

General.defaultProps = {
  reward: {}
};

export const layout = {
  areaId: 'rewardEditGeneral',
  sortOrder: 10
};

export const query = `
  query Query {
    reward(id: getContextValue('rewardId', null)) {
      name
      status
      description
      discountAmount
      startDate {
        text
      }
      endDate {
        text
      }
    }
  }
`;
