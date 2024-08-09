const { getEnv } = require('@evershop/evershop/src/lib/util/getEnv');


export const fetchData = async (text) => {
    const apiKey = getEnv('QR_API', '');
    console.log(apiKey)

    const url = `https://quickchart.io/qr?text=${text}&size=500&format=png`;
    return url

    
  };





  



