import PropTypes from 'prop-types';
import React from 'react';
import { toast } from 'react-toastify';
import Area from '@components/common/Area';
import { Form } from '@components/common/form/Form';
import { get } from '@evershop/evershop/src/lib/util/get';
import { _ } from '@evershop/evershop/src/lib/locale/translate';

export default function CmsPageEditForm({ action }) {
  const id = 'cmsPageForm';
  return (
    <Form
      method="PATCH"
      action={action}
      onError={() => {
        toast.error(_('Something wrong. Please reload the page!'));
      }}
      onSuccess={(response) => {
        if (response.error) {
          toast.error(
            get(
              response,
              'error.message',
              _('Something wrong. Please reload the page!')
            )
          );
        } else {
          toast.success(_('Page saved successfully!'));
        }
      }}
      submitBtn={false}
      id={id}
    >
      <Area id={id} noOuter />
    </Form>
  );
}

CmsPageEditForm.propTypes = {
  action: PropTypes.string.isRequired
};

export const layout = {
  areaId: 'content',
  sortOrder: 10
};

export const query = `
  query Query {
    action: url(routeId: "updateCmsPage", params: [{key: "id", value: getContextValue("cmsPageUuid")}]),
    gridUrl: url(routeId: "cmsPageGrid")
  }
`;
