import React, { useState } from 'react';

import { fetchData } from '../../../API/API_QR_consum.js';

function QrCodeGenerator() {
  const [img, setImg] = useState('');
  const [text, setText] = useState('');

  
  const handleGenerateQRCode = async () => {
    fetchData(text).then(answer =>{
      setImg(answer)
    }).catch((error) => {
      console.error(error); 
    })
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text"
      />
      <button type="button" onClick={handleGenerateQRCode}>
        Generate QR Code
      </button>
      <div>
        <img src={img} alt="QR Code" />
      </div>
    </div>
  );
}

export default QrCodeGenerator;

export const layout = {
  areaId: 'content',
  sortOrder: 1
};
