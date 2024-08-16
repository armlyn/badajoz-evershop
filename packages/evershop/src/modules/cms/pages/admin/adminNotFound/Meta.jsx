import React from 'react';
import Meta from '@components/common/Meta';
import Title from '@components/common/Title';
import { _ } from '@evershop/evershop/src/lib/locale/translate';

export default function SeoMeta() {
  return (
    <>
      <Title title={_("Page Not Found")} />
      <Meta name="description" content={_("Page Not Found")} />
    </>
  );
}

export const layout = {
  areaId: 'head',
  sortOrder: 1
};
