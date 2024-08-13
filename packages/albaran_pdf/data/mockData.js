export const mockDeliveryNote = {
  deliveryNoteNumber: '001',
  issueDate: '2024-08-12',
  sender: {
    name: 'Empresa Vendedora',
    address: 'Calle Ejemplo 123, Ciudad',
    phone: '123456789'
  },
  recipient: {
    name: 'Cliente Ejemplo',
    address: 'Avenida Ejemplo 456, Ciudad',
    phone: '987654321'
  },
  products: [
    { quantity: 2, description: 'Producto A', code: 'A001' },
    { quantity: 1, description: 'Producto B', code: 'B002' },
    { quantity: 5, description: 'Producto C', code: 'C003' }
  ]
};
