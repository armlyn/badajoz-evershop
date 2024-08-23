import React, { useState } from 'react';
import { getQrCode } from '../../../services/getQrCode';

function QrCodeGenerator() {
  const [img, setImg] = useState('');
  const [text, setText] = useState('');

  
  const handleGenerateQRCode = async () => {
    getQrCode(text).then(answer =>{
      setImg(answer)
    }).catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error); 
    })
  };

  return (
    <>
      <div className="border rounded border-divider mb-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text"
        />
      </div>
      
      <button type="button" className="button primary" onClick={async (e) => {
        e.preventDefault();
        await handleGenerateQRCode();
      }}>
        Generate QR Code
      </button>
      <div>
        <img src={img} alt="QR Code" />
      </div>
    </>
  );
}

export default QrCodeGenerator;

export const layout = {
  areaId: 'content',
  sortOrder: 10
};
