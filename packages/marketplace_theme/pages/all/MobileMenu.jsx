import PropTypes from 'prop-types';
import React from 'react';
import './MobileMenu.scss';

export default function MobileMenu({ menu: { items } }) {
  const [show, setShow] = React.useState(false);

  return (
    <div className="main-menu-mobile self-center">
      <a
        className="menu-icon"
        href="#"
        onClick={(e) => {
          // e.preventDefault();
          setShow(!show);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </a>
      {show && (
        <ul className="nav justify-content-center">
            <li className="nav-item" >
              <a className="nav-link" href='/regions'>
                Municipios
              </a>
            </li>
            <li className="nav-item" >
              <a className="nav-link" href='/stores'>
                Tiendas
              </a>
            </li>

        </ul>
      )}
    </div>
  );
}

MobileMenu.propTypes = {
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
<<<<<<< HEAD
  areaId: 'icon-wrapper-toggle',
=======
  areaId: 'icon-wrapper',
>>>>>>> 82689edeab1e2f1e1af84134fe2498ab6ba971c5
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