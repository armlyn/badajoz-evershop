module.exports.mapResponseToData = (response) => {
  const orderData = response.order || {}; 

  const mapDate = (timestamp) => {
    if (timestamp) {
      const date = new Date(Number(timestamp));
      return date.toLocaleString();
    } else {
      return '12/12/1900'; 
    }
  }

  const mappedData = {
    sellerInfo: {
      name: (orderData.Seller && orderData.Seller.name) ? orderData.Seller.name : '',
      address: (orderData.Seller && orderData.Seller.address) ? orderData.Seller.address : '',
      logo: (orderData.Seller && orderData.Seller.logo) ? orderData.Seller.logo : '',
      email: (orderData.Seller && orderData.Seller.email) ? orderData.Seller.email : '',
      website: (orderData.Seller && orderData.Seller.website) ? orderData.Seller.website : ''
    },
    productInfo: {
      quantity: orderData.totalQty || '',
      priceTotal: orderData.grandTotal ? `${orderData.grandTotal.value || ''} ${orderData.currency || ''}` : 0
    },
    shippingInfo: {
      recipientName: (orderData.shippingAddress && orderData.shippingAddress.fullName) ? orderData.shippingAddress.fullName : '',
      address: (orderData.shippingAddress ? [
        orderData.shippingAddress.address1 || '', 
        orderData.shippingAddress.address2 || '', 
        orderData.shippingAddress.city || '', 
        (orderData.shippingAddress.province && orderData.shippingAddress.province.name) || '', 
        (orderData.shippingAddress.country && orderData.shippingAddress.country.name) || ''
      ].filter(part => part).join(', ') : ''),
      postalCode: (orderData.shippingInfo && orderData.shippingInfo.postalCode) ? orderData.shippingInfo.postalCode : '', 
      phone: (orderData.shippingAddress && orderData.shippingAddress.telephone) ? orderData.shippingAddress.telephone : ''
    },
    orderInfo: {
      orderNumber: orderData.orderNumber || '',
      orderDate: orderData.createdAt ? mapDate(orderData.createdAt.value) : '12/12/1900',
      // Falta aqui fecha de entrega
      trackingNumber: (orderData.Shipment && orderData.Shipment.trackingNumber) ? orderData.Shipment.trackingNumber : '',
      orderNotes: orderData.shippingNote || '' 
    }
  };
  return mappedData;
};


 