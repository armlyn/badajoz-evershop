import React from 'react';
import PropTypes from 'prop-types';
import { jsPDF as JsPDF } from 'jspdf';
import AlbaranDocument from './AlbaranDocument';

function PDFExportButton({ albaran }) {
  const handleExport = () => {
    const doc = new JsPDF();
    AlbaranDocument(doc, albaran);
    doc.save(`Albaran_${albaran.orderNumber}.pdf`);
  };

  return (
    <button type="button" className="button primary" onClick={handleExport}>
      Exportar como PDF
    </button>
  );
}

PDFExportButton.propTypes = {
  albaran: PropTypes.shape({
    orderNumber: PropTypes.string.isRequired
  }).isRequired
};

export default PDFExportButton;
