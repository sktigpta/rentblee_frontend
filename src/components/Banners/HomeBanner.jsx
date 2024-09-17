import React, { useState, useEffect } from 'react';
import './homebanner.css';

import image1 from '../../assets/sliders images/image1.jpg';
import image2 from '../../assets/sliders images/image2.jpg';
import image3 from '../../assets/sliders images/image3.jpg';

const HomeBanner = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const banners = [
        { id: 1, imageUrl: image1, title: 'Summer Collection' },
        { id: 2, imageUrl: image2, title: 'Winter Collection' },
        { id: 3, imageUrl: image3, title: 'New Arrivals' },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            goToNext();
        }, 3000); // Automatically switch banners every 3 seconds
        return () => clearInterval(interval);
    }, [activeIndex]);

    const goToPrevious = () => {
        const newIndex = activeIndex === 0 ? banners.length - 1 : activeIndex - 1;
        setActiveIndex(newIndex);
    };

    const goToNext = () => {
        const newIndex = (activeIndex + 1) % banners.length;
        setActiveIndex(newIndex);
    };

    return (
        <div className="banner-carousel">
            <div className="banners">
                {banners.map((banner, index) => (
                    <div
                        key={banner.id}
                        className={`banner ${index === activeIndex ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${banner.imageUrl})` }}
                    >
                        <h2>{banner.title}</h2>
                    </div>
                ))}
            </div>

            <div className="dots">
                {banners.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${index === activeIndex ? 'active' : ''}`}
                        onClick={() => setActiveIndex(index)}
                    />
                ))}
            </div>

            <button className="prev-button" onClick={goToPrevious}>‹</button>
            <button className="next-button" onClick={goToNext}>›</button>
        </div>
    );
};

export default HomeBanner;
