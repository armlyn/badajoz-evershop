import React from 'react';

import AlbaranList from './AlbaranList.jsx';
import { mockAlbaran } from '../../../data/mockData.js';
import './styles.scss';

function AlbaranPage() {
  return (
    <div className="text page-width">
      <div className="box p-4 shadow card">
        <h2 className="">DETALLES DEL ALBARÁN</h2>
        <AlbaranList albaran={mockAlbaran} />
      </div>
    </div>
  );
}

export default AlbaranPage;

export const layout = {
  areaId: 'content',
  sortOrder: 1
};
export const GET_ALBARAN_QUERY = `
  query GetAlbaran($uuid: String!) {
    order(uuid: $uuid) {
      orderNumber
      createdAt
      shippingAddress {
        fullName
        address1
        address2
        telephone
        city
        province {
          name
        }
        country {
          name
        }
      }
      billingAddress {
        fullName
        address1
        address2
        telephone
        city
        province {
          name
        }
        country {
          name
        }
      }
      items {
        qty
        productName
        productSku
      }
    }
  }
`;
