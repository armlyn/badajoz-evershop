import React from 'react';
import PropTypes from 'prop-types';
import PDFExportButton from './PDFExportButton';

// Componente que lista los detalles del albarán.
function AlbaranList({ albaran }) {
  return (
    <div>
      <p>
        <strong>Número de Albarán:</strong> {albaran.numeroAlbaran}
      </p>
      <p>
        <strong>Fecha de Emisión:</strong> {albaran.fechaEmision}
      </p>

      <h3>Remitente</h3>
      <p>{albaran.remitente.nombre}</p>
      <p>{albaran.remitente.direccion}</p>
      <p>{albaran.remitente.telefono}</p>

      <h3>Destinatario</h3>
      <p>{albaran.destinatario.nombre}</p>
      <p>{albaran.destinatario.direccion}</p>
      <p>{albaran.destinatario.telefono}</p>

      <h3>Productos</h3>
      <ul>
        {albaran.productos.map((producto, index) => (
          <li key={index}>
            {producto.cantidad} x {producto.descripcion} (Código:{' '}
            {producto.codigo})
          </li>
        ))}
      </ul>

      <PDFExportButton albaran={albaran} />
    </div>
  );
}

AlbaranList.propTypes = {
  albaran: PropTypes.shape({
    numeroAlbaran: PropTypes.string.isRequired,
    fechaEmision: PropTypes.string.isRequired,
    remitente: PropTypes.shape({
      nombre: PropTypes.string.isRequired,
      direccion: PropTypes.string.isRequired,
      telefono: PropTypes.string.isRequired
    }).isRequired,
    destinatario: PropTypes.shape({
      nombre: PropTypes.string.isRequired,
      direccion: PropTypes.string.isRequired,
      telefono: PropTypes.string.isRequired
    }).isRequired,
    productos: PropTypes.arrayOf(
      PropTypes.shape({
        cantidad: PropTypes.number.isRequired,
        descripcion: PropTypes.string.isRequired,
        codigo: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired
};

export default AlbaranList;
