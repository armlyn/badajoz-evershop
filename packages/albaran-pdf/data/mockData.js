// Datos simulados de albaranes.
export const mockAlbaran = {
  numeroAlbaran: '001',
  fechaEmision: '2024-08-12',
  remitente: {
    nombre: 'Empresa Vendedora',
    direccion: 'Calle Ejemplo 123, Ciudad',
    telefono: '123456789'
  },
  destinatario: {
    nombre: 'Cliente Ejemplo',
    direccion: 'Avenida Ejemplo 456, Ciudad',
    telefono: '987654321'
  },
  productos: [
    { cantidad: 2, descripcion: 'Producto A', codigo: 'A001' },
    { cantidad: 1, descripcion: 'Producto B', codigo: 'B002' },
    { cantidad: 5, descripcion: 'Producto C', codigo: 'C003' }
  ]
};
