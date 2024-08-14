import React from 'react';
import PropTypes from 'prop-types';
import PDFExportButton from './PDFExportButton';

function AlbaranList({ albaran }) {
  const { orderNumber, shippingAddress, billingAddress, items } = albaran || {};

  return (
    <div>
      {orderNumber && <p className="data">{orderNumber}</p>}

      {shippingAddress && (
        <div className="mt-3">
          <h3>Dirección de Envío</h3>
          {shippingAddress.fullName && (
            <p>
              <span>Nombre:</span> {shippingAddress.fullName}
            </p>
          )}
          {shippingAddress.address1 && (
            <p>
              <span>Dirección:</span> {shippingAddress.address1}{' '}
              {shippingAddress.address2 && ` ${shippingAddress.address2}`}
            </p>
          )}
          {shippingAddress.telephone && (
            <p>
              <span>Teléfono:</span> {shippingAddress.telephone}
            </p>
          )}
          {shippingAddress.city && (
            <p>
              <span>Ciudad:</span> {shippingAddress.city}
            </p>
          )}
          {shippingAddress.province && (
            <p>
              <span>Provincia:</span> {shippingAddress.province.name}
            </p>
          )}
          {shippingAddress.country && (
            <p>
              <span>País:</span> {shippingAddress.country.name}
            </p>
          )}
        </div>
      )}

      {billingAddress && (
        <div className="mt-3">
          <h3>Dirección de Facturación</h3>
          {billingAddress.fullName && (
            <p>
              <span>Nombre:</span> {billingAddress.fullName}
            </p>
          )}
          {billingAddress.address1 && (
            <p>
              <span>Dirección:</span> {billingAddress.address1}{' '}
              {billingAddress.address2 && ` ${billingAddress.address2}`}
            </p>
          )}
          {billingAddress.telephone && (
            <p>
              <span>Teléfono:</span> {billingAddress.telephone}
            </p>
          )}
          {billingAddress.city && (
            <p>
              <span>Ciudad:</span> {billingAddress.city}
            </p>
          )}
          {billingAddress.province && (
            <p>
              <span>Provincia:</span> {billingAddress.province.name}
            </p>
          )}
          {billingAddress.country && (
            <p>
              <span>País:</span> {billingAddress.country.name}
            </p>
          )}
        </div>
      )}

      {items && items.length > 0 && (
        <div className="mt-3">
          <h3>Productos</h3>
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                {item.qty} x {item.productName} (Código: {item.productSku})
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-3 pt-2">
        <PDFExportButton albaran={albaran} />
      </div>
    </div>
  );
}

AlbaranList.propTypes = {
  albaran: PropTypes.shape({
    orderNumber: PropTypes.string,
    shippingAddress: PropTypes.shape({
      fullName: PropTypes.string,
      address1: PropTypes.string,
      address2: PropTypes.string,
      telephone: PropTypes.string,
      city: PropTypes.string,
      province: PropTypes.shape({
        name: PropTypes.string
      }),
      country: PropTypes.shape({
        name: PropTypes.string
      })
    }),
    billingAddress: PropTypes.shape({
      fullName: PropTypes.string,
      address1: PropTypes.string,
      address2: PropTypes.string,
      telephone: PropTypes.string,
      city: PropTypes.string,
      province: PropTypes.shape({
        name: PropTypes.string
      }),
      country: PropTypes.shape({
        name: PropTypes.string
      })
    }),
    items: PropTypes.arrayOf(
      PropTypes.shape({
        qty: PropTypes.number,
        productName: PropTypes.string,
        productSku: PropTypes.string
      })
    )
  })
};

AlbaranList.defaultProps = {
  albaran: {
    orderNumber: '',
    shippingAddress: {
      fullName: '',
      address1: '',
      address2: '',
      telephone: '',
      city: '',
      province: { name: '' },
      country: { name: '' }
    },
    billingAddress: {
      fullName: '',
      address1: '',
      address2: '',
      telephone: '',
      city: '',
      province: { name: '' },
      country: { name: '' }
    },
    items: []
  }
};

export default AlbaranList;
