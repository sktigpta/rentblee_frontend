import React from 'react';

const BannerItem = ({ imageUrl, title, active }) => {
    return (
        <div className={`banner-item ${active ? 'active' : ''}`} style={{ backgroundImage: `url(${imageUrl})` }}>
            <div className="banner-content">

            </div>
        </div>
    );
};

export default BannerItem;
