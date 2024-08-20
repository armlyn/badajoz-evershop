/* eslint-disable react/prop-types */
import React from 'react';
import Area from '@components/common/Area';
import './Layout.scss';
import './tailwind.scss';
// import PropTypes from 'prop-types';

export default function AdminLayout({adminUser}) {
  return (
    <>
      <div className="header">
        <Area id="header" noOuter />
      </div>
      <div className="content-wrapper">
        <div className="admin-navigation">
          {adminUser.isStoreAdmin ? ( 
            <Area id="provinceAdministratorNavigation" noOuter />
          ) :
          (
          <Area id="adminNavigation" noOuter />
          )}

        </div>
        <div className="main-content">
          <Area id="content" className="main-content-inner" />
          <div className="footer">
            <div className="copyright">
              <span>Copyright © 2021 EverShop</span>
            </div>
            <div className="version">
              <span>Version 1.0 dev</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const layout = {
  areaId: 'body',
  sortOrder: 10
};

// AdminLayout.propTypes = {
//   isGlobalAdmin: PropTypes.object.isRequired
// };

export const query = `
  query Query {
    adminUser: currentAdminUser {
      adminUserId
      fullName
      email
      isStoreAdmin
    },
  }
`;

export const variables = `
{
    
}`;
