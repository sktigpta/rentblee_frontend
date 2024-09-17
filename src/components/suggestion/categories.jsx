import React, { useState } from 'react';
import './suggestion.css'


const Categories = () => {
    const [selectedCategory, setSelectedCategory] = useState('Domestic Bookings');

    const handleButtonClick = (category) => {
        setSelectedCategory(category);
    };

    return (
        <>
            <div className="categories-buttons">
                <button onClick={() => handleButtonClick('Domestic Bookings')}>
                    Domestic Bookings
                </button>
                <button onClick={() => handleButtonClick('Events Bookings')}>
                    Events Bookings
                </button>
            </div>

            <div className="categories">
                {selectedCategory === 'Domestic Bookings' && (
                    <div className="scrollable-container">
                        {/* Display Domestic Bookings Categories here */}
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                    </div>
                )}
                {selectedCategory === 'Events Bookings' && (
                    <div className="scrollable-container">
                        {/* Display Events Bookings Categories here */}
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Categories;
