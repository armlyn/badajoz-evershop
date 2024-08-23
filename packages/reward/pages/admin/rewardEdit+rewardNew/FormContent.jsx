import PropTypes from 'prop-types';
import React from 'react';
import Area from '@components/common/Area';
import Button from '@components/common/form/Button';
import { useFormContext } from '@components/common/form/Form';
import { Card } from '@components/admin/cms/Card';
import './FormContent.scss';

export default function FormContent({ gridUrl }) {
  const { state } = useFormContext();
  return (
    <>
      <div className="grid grid-cols-1 gap-2">
        <Card title="General">
          <Card.Session>
            <Area id="rewardEditGeneral" noOuter />
          </Card.Session>
        </Card>
        {/* Borre el customerConditon.jsx */}
        {/* <div className="grid grid-cols-3 gap-x-2 grid-flow-row ">
          <div className="col-span-2 grid grid-cols-1 gap-2 auto-rows-max">
            <Card title="Order conditions">
              <Card.Session>
                <Area id="rewardEditLeft" noOuter className="col-8" />
              </Card.Session>
            </Card>
          </div>
          <div className="col-span-1 grid grid-cols-1 gap-2 auto-rows-max">
            <Card title="Customer conditions">
              <Card.Session>
                <Area id="rewardEditRight" className="col-4" noOuter />
              </Card.Session>
            </Card>
          </div>
        </div> */}
      </div>
      <div className="form-submit-button flex border-t border-divider mt-15 pt-15 justify-between">
        <Button
          title="Cancel"
          variant="critical"
          outline
          onAction={() => {
            window.location = gridUrl;
          }}
        />
        <Button
          title="Save"
          onAction={() => {
            document
              .getElementById('rewardForm')
              .dispatchEvent(
                new Event('submit', { cancelable: true, bubbles: true })
              );
          }}
          isLoading={state === 'submitting'}
        />
      </div>
    </>
  );
}

FormContent.propTypes = {
  gridUrl: PropTypes.string.isRequired
};

export const layout = {
  areaId: 'rewardForm',
  sortOrder: 10
};

export const query = `
  query Query {
    gridUrl: url(routeId: "rewardGrid")
  }
`;