import PropTypes from 'prop-types';
import React from 'react';
import { Name } from '@components/frontStore/catalog/product/list/item/Name';
import { Thumbnail } from '@components/frontStore/catalog/product/list/item/Thumbnail';
import Area from '@components/common/Area';
import { _ } from '@evershop/evershop/src/lib/locale/translate';

export default function RegionList({ regions = [], countPerRow = 3 }) {
    if (regions.length === 0) {
        return (
            <div className="store-list">
                <div className="text-center">{_('There is no region to display')}</div>
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
            {regions.map((region) => (
                <Area
                    id="regionListingItem"
                    className="listing-tem"
                    region={region}
                    key={region.regionId}
                    coreComponents={[
                        {
                            component: { default: Thumbnail },
                            props: { url: region.url, alt: region.name },
                            sortOrder: 10,
                            id: 'thumbnail'
                        },
                        {
                            component: { default: Name },
                            props: { name: region.name, url: region.url, id: region.regionId },
                            sortOrder: 20,
                            id: 'name'
                        }
                    ]}
                />
            ))}
        </div>
    );
}

RegionList.propTypes = {
    regions: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            regionId: PropTypes.number,
            url: PropTypes.string
        })
    ).isRequired,
    countPerRow: PropTypes.number.isRequired
};
