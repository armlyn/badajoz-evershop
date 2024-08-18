import PropTypes from 'prop-types';
import React from 'react';

export default function RegionNameRow({ region }) {
    return (
        <td>
            <div>
                <a className="hover:underline font-semibold" href={region.editUrl}>
                    {region.name}
                </a>
            </div>
        </td>
    );
}

RegionNameRow.propTypes = {
    region: PropTypes.shape({
        editUrl: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired
};
