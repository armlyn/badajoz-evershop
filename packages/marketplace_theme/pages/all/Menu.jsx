import PropTypes from 'prop-types';
import React from 'react';

export default function Menu({ menu: { items } }) {
  return (
    <div className="main-menu self-center hidden md:block">
      <ul className="nav flex space-x-275 justify-content-center">
        <li className="nav-item">
          <a className="nav-link hover:underline" href="/regions">
            Municipios
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link hover:underline" href="/stores">
            Tiendas
          </a>
        </li>
      </ul>
    </div>
  );
}

Menu.propTypes = {
  menu: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired
};

export const layout = {
  areaId: 'header',
  sortOrder: 50
};

export const query = `
  query {
    menu {
      items {
        name
        url
      }
    }
}`;
