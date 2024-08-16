import PropTypes from 'prop-types';
import React from 'react';

export default function RegionNameRow({ region }) {
    return (
        <td>
            <div>
                <a className="hover:underline font-semibold" href={region.editUrl}>
                    {region.path.map((p) => p.name).join(' / ')}
                </a>
            </div>
        </td>
    );
}

RegionNameRow.propTypes = {
    region: PropTypes.shape({
        editUrl: PropTypes.string.isRequired,
        path: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired
            })
        ).isRequired
    }).isRequired
};
