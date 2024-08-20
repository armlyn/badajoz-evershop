import React from 'react';

import '../../scss/global.scss';

function Logo() {
  return (
    <div>
      <a href="/">
        <img
          className="max-w-180"
          src="/escudo_2016_ancho.svg"
          alt="Logo de Badajoz"
        />
      </a>
    </div>
  );
}

export default Logo;

export const layout = {
  areaId: 'header',
  sortOrder: 5
};
