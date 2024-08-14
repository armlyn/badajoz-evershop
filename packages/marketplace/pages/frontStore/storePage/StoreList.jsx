import PropTypes from 'prop-types';
import React from 'react';
import { Name } from '@components/frontStore/catalog/product/list/item/Name';
import { Thumbnail } from '@components/frontStore/catalog/product/list/item/Thumbnail';
import Area from '@components/common/Area';
import { _ } from '@evershop/evershop/src/lib/locale/translate';

export default function StoreList({ stores = [], countPerRow = 3 }) {
    if (stores.length === 0) {
        return (
            <div className="store-list">
                <div className="text-center">{_('There is no store to display')}</div>
            </div>
        );
    }

    let className;
    switch (countPerRow) {
        case 3:
            className = 'grid grid-cols-2 md:grid-cols-3 gap-2';
            break;
        case 4:
            className = 'grid grid-cols-2 md:grid-cols-4 gap-2';
            break;
        case 5:
            className = 'grid grid-cols-2 md:grid-cols-5 gap-2';
            break;
        default:
            className = 'grid grid-cols-2 md:grid-cols-3 gap-2';
    }

    return (
        <div className={className}>
            {stores.map((s) => (
                <Area
                    id="storeListingItem"
                    className="listing-tem"
                    store={s}
                    key={s.id}
                    coreComponents={[
                        {
                            component: { default: Thumbnail },
                            props: { url: s.url, alt: s.name },
                            sortOrder: 10,
                            id: 'thumbnail'
                        },
                        {
                            component: { default: Name },
                            props: { name: s.name, url: s.url, id: s.id },
                            sortOrder: 20,
                            id: 'name'
                        }
                    ]}
                />
            ))}
        </div>
    );
}

StoreList.propTypes = {
    stores: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            id: PropTypes.number,
            url: PropTypes.string
        })
    ).isRequired,
    countPerRow: PropTypes.number.isRequired
};
