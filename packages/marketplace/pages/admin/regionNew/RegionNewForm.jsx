import PropTypes from 'prop-types';
import React from 'react';
import { toast } from 'react-toastify';
import Area from '@components/common/Area';
import { Form } from '@components/common/form/Form';
import { get } from '@evershop/evershop/src/lib/util/get';

export default function RegionNewForm({ action }) {
    const id = 'regionForm';
    return (
        <Form
            method="POST"
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
                    // Wait for 2 seconds to show the success message
                    setTimeout(() => {
                        // Redirect to the edit page
                        const editUrl = response.data.links.find(
                            (link) => link.rel === 'edit'
                        ).href;
                        window.location.href = editUrl;
                    }, 1500);
                }
            }}
            submitBtn={false}
            id={id}
        >
            <Area id={id} noOuter />
        </Form>
    );
}

RegionNewForm.propTypes = {
    action: PropTypes.string.isRequired
};

export const layout = {
    areaId: 'content',
    sortOrder: 10
};

export const query = `
  query Query {
    action: url(routeId: "createRegion")
    gridUrl: url(routeId: "regionGrid")
  }
`;