const axios = require('axios');
const { getEnv } = require('@evershop/evershop/src/lib/util/getEnv');

module.exports.getQrCode = async (
    text
) => {
    const apiUrl = getEnv('QR_API_URL', '');
    console.log('QR_API_URL', apiUrl);
    const url = `${apiUrl}qr?text=${text}&size=500&format=png`;

    const response = await axios.post(url, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    const { data } = response;

    return data;
};
