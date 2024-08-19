import React from 'react';
import { useQuery } from 'urql';
import AlbaranList from './AlbaranList.jsx';
import './styles.scss';

export const GET_ALBARAN_QUERY = `
  query GetAlbaran($uuid: String!) {
    order(uuid: $uuid) {
      orderNumber
      createAt{
      value
      }
    
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

function AlbaranPage() {
  const uuid = '4661d593-3bd2-4121-a18e-e3a42835d6fd';

  const [result] = useQuery({
    query: GET_ALBARAN_QUERY,
    variables: { uuid }
  });

  const { data, fetching, error } = result;

  if (fetching) return <h2 className="text page-width">Loading...</h2>;
  if (error)
    return <h2 className="text page-width">Oh no... {error.message}</h2>;

  const albaran = data?.order || {};

  if (!albaran)
    return <h2 className="text page-width">No hay Albarán disponible :(</h2>;
  return (
    <div className="text page-width">
      <div className="box p-4 shadow card">
        <h2 className="">DETALLES DEL ALBARÁN</h2>
        <AlbaranList albaran={albaran} />
      </div>
    </div>
  );
}

export default AlbaranPage;

export const layout = {
  areaId: 'content',
  sortOrder: 1
};
