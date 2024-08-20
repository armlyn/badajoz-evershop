import PropTypes from 'prop-types';
import React from 'react';
import './Logo.scss';


export default function Logo({ dashboardUrl }) {
  return (
    <div className="logo">
      <a href={dashboardUrl}>
        <img
          className="max-w-180 logo-icon"
          src="/escudo_2016_ancho.svg"
          alt="Logo de Badajoz"
        />
      </a>
    </div>
  );
}


Logo.propTypes = {
  dashboardUrl: PropTypes.string.isRequired
};

export const layout = {
  areaId: 'header',
  sortOrder: 10
};

export const query = `
  query Query {
    dashboardUrl: url(routeId:"dashboard")
  }
`;
