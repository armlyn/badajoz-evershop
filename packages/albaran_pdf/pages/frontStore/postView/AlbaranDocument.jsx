const calculateSectionHeight = (textLines) => {
  const lineHeight = 8;
  return textLines * lineHeight + 10;
};

const AlbaranDocument = (doc, albaran) => {
  doc.setTextColor(40);
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(20);
  doc.text(`Albarán #${albaran.numeroAlbaran}`, 105, 20, { align: 'center' });

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(12);
  doc.text(`Fecha de Emisión: ${albaran.fechaEmision}`, 105, 30, {
    align: 'center'
  });

  const lineHeight = 8;
  const sectionTop = 50;
  const sectionGap = 10;

  const remitenteHeight = calculateSectionHeight(3);
  const destinatarioHeight = calculateSectionHeight(3);

  doc.setFillColor(240, 240, 240);
  doc.rect(20, sectionTop, 170, remitenteHeight, 'F');
  doc.rect(
    20,
    sectionTop + remitenteHeight + sectionGap,
    170,
    destinatarioHeight,
    'F'
  );

  doc.setFont('Helvetica', 'bold');
  doc.text('Remitente', 25, sectionTop + 7);
  doc.setFont('Helvetica', 'normal');
  doc.text(albaran.remitente.nombre, 25, sectionTop + 7 + lineHeight);
  doc.text(albaran.remitente.direccion, 25, sectionTop + 7 + lineHeight * 2);
  doc.text(albaran.remitente.telefono, 25, sectionTop + 7 + lineHeight * 3);

  doc.setFont('Helvetica', 'bold');
  doc.text('Destinatario', 25, sectionTop + remitenteHeight + sectionGap + 7);
  doc.setFont('Helvetica', 'normal');
  doc.text(
    albaran.destinatario.nombre,
    25,
    sectionTop + remitenteHeight + sectionGap + 7 + lineHeight
  );
  doc.text(
    albaran.destinatario.direccion,
    25,
    sectionTop + remitenteHeight + sectionGap + 7 + lineHeight * 2
  );
  doc.text(
    albaran.destinatario.telefono,
    25,
    sectionTop + remitenteHeight + sectionGap + 7 + lineHeight * 3
  );

  doc.setFont('Helvetica', 'bold');
  doc.text(
    'Productos',
    20,
    sectionTop + remitenteHeight + destinatarioHeight + sectionGap * 2 + 20
  );

  doc.setFont('Helvetica', 'normal');
  albaran.productos.forEach((producto, index) => {
    const yPosition =
      sectionTop +
      remitenteHeight +
      destinatarioHeight +
      sectionGap * 2 +
      30 +
      index * (lineHeight + 2);
    doc.text(
      `${producto.cantidad} x ${producto.descripcion} (Código: ${producto.codigo})`,
      25,
      yPosition
    );
  });
  doc.setFont('Helvetica', 'bold');
  doc.text('Firma de entrega:', 20, 270);
  doc.line(60, 270, 160, 270);

  doc.setFont('Helvetica', 'italic');
  doc.setFontSize(10);
  doc.text('Gracias por su compra', 105, 280, { align: 'center' });
};

export default AlbaranDocument;
