import PropTypes from 'prop-types';
import React from 'react';
import StoreList from './StoreList';

export default function StorePage() {

    const stores = [
        { name: 'Tienda 23', id: 451, url: '/store-1' },
        { name: 'Tienda 85', id: 980, url: '/store-1' },
        { name: 'Tienda 47', id: 301, url: '/store-1' },
        { name: 'Tienda 12', id: 123, url: '/store-1' },
        { name: 'Tienda 34', id: 785, url: '/store-1' }
    ]
    
    return (

        <div className="page-width">
            <h3 className="uppercase h5 tracking-widest">
                Tiendas
            </h3>
            <StoreList stores={stores} countPerRow={4} />
        </div>
    );
}

export const layout = {
    areaId: 'content',
    sortOrder: 15
};
