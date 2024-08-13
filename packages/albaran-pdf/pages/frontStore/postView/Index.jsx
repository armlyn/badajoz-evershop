import React from 'react';
import AlbaranList from './AlbaranList.jsx';
import { mockAlbaran } from '../../../data/mockData.js';

function AlbaranPage() {
  return (
    <div>
      <h2>Detalles del Albarán</h2>
      <AlbaranList albaran={mockAlbaran} />
    </div>
  );
}

export default AlbaranPage;

export const layout = {
  areaId: 'content',
  sortOrder: 1
};
