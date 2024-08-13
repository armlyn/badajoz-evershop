import React from 'react';
import PropTypes from 'prop-types';
import PDFExportButton from './PDFExportButton';

function DeliveryNoteList({ deliveryNote }) {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <p className="text-lg font-medium">
        {deliveryNote.deliveryNoteNumber} / {deliveryNote.issueDate}
      </p>

      <div className="mt-4">
        <h3 className="text-xl font-semibold border-b-2 pb-1 mb-2">Sender</h3>
        <p className="text-base">
          <span className="font-bold">Name:</span> {deliveryNote.sender.name}
        </p>
        <p className="text-base">
          <span className="font-bold">Address:</span>{' '}
          {deliveryNote.sender.address}
        </p>
        <p className="text-base">
          <span className="font-bold">Phone:</span> {deliveryNote.sender.phone}
        </p>
      </div>

      <div className="mt-4">
        <h3 className="text-xl font-semibold border-b-2 pb-1 mb-2">
          Recipient
        </h3>
        <p className="text-base">
          <span className="font-bold">Name:</span> {deliveryNote.recipient.name}
        </p>
        <p className="text-base">
          <span className="font-bold">Address:</span>{' '}
          {deliveryNote.recipient.address}
        </p>
        <p className="text-base">
          <span className="font-bold">Phone:</span>{' '}
          {deliveryNote.recipient.phone}
        </p>
      </div>

      <div className="mt-4">
        <h3 className="text-xl font-semibold border-b-2 pb-1 mb-2">Products</h3>
        <ul className="list-disc list-inside">
          {deliveryNote.products.map((product, index) => (
            <li key={index} className="text-base">
              {product.quantity} x {product.description} (Code: {product.code})
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 pt-2">
        <PDFExportButton deliveryNote={deliveryNote} />
      </div>
    </div>
  );
}

DeliveryNoteList.propTypes = {
  deliveryNote: PropTypes.shape({
    deliveryNoteNumber: PropTypes.string.isRequired,
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

export default DeliveryNoteList;
