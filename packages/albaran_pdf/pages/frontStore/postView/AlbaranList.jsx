import React from 'react';
import PropTypes from 'prop-types';
import PDFExportButton from './PDFExportButton';

function AlbaranList({ albaran }) {
  return (
    <div className="">
      <p className="data">
        {albaran.albaranNumber} / {albaran.issueDate}
      </p>

      <div className="mt-3">
        <h3 className="">Remitente</h3>
        <p className="">
          <span className="">Nombre:</span> {albaran.sender.name}
        </p>
        <p className="">
          <span className="">Dirección:</span> {albaran.sender.address}
        </p>
        <p className="">
          <span className="">Teléfono:</span> {albaran.sender.phone}
        </p>
      </div>

      <div className="mt-3">
        <h3 className="">Destinatario</h3>
        <p className="">
          <span className="">Nombre:</span> {albaran.recipient.name}
        </p>
        <p className="">
          <span className="">Dirección:</span> {albaran.recipient.address}
        </p>
        <p className="">
          <span className="">Teléfono:</span> {albaran.recipient.phone}
        </p>
      </div>

      <div className="mt-3">
        <h3 className="">Productos</h3>
        <ul className="">
          {albaran.products.map((producto, index) => (
            <li key={index} className="">
              {producto.quantity} x {producto.description} (Código:{' '}
              {producto.code})
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-3 pt-2">
        <PDFExportButton albaran={albaran} />
      </div>
    </div>
  );
}

AlbaranList.propTypes = {
  albaran: PropTypes.shape({
    albaranNumber: PropTypes.string.isRequired,
    issueDate: PropTypes.string.isRequired,
    sender: PropTypes.shape({
      name: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired
    }).isRequired,
    recipient: PropTypes.shape({
      name: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired
    }).isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        quantity: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired
};

export default AlbaranList;
