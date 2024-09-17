import React, { useState, useEffect } from 'react';
import BannerItem from './BannerItem';
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

    // Auto transition every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % banners.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [banners.length]);

    const nextBanner = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % banners.length);
    };

    const prevBanner = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
    };

    return (
        <div className="banner-carousel">
            <button className="prev-button" onClick={prevBanner}>
                &#10094;
            </button>

            <div className="banners" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
                {banners.map((banner, index) => (
                    <BannerItem
                        key={banner.id}
                        imageUrl={banner.imageUrl}
                        title={banner.title}
                        active={index === activeIndex}
                    />
                ))}
            </div>

            <button className="next-button" onClick={nextBanner}>
                &#10095;
            </button>

            <div className="dots">
                {banners.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${index === activeIndex ? 'active' : ''}`}
                        onClick={() => setActiveIndex(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default HomeBanner;
