import React from 'react';

const RecomendedProducts = () => {
    return (
        <>
            <div className="banner">
                <div style={{
                    justifyContent: "space-between"
                }} className="d-row">
                    <h2>Quick Checkout</h2>
                    <select
                        style={{
                            borderRadius: "0.5em",
                            backgroundColor: "#e9e9e9",
                        }}
                        placeholder="Select event">
                        <option value="">Select event</option>
                        <option value="marriage">Marriage Ceremony</option>
                        <option value="birthday">Birthday Party</option>
                        <option value="anniversary">Anniversary</option>
                        <option value="baby_shower">Baby Shower</option>
                        <option value="graduation">Graduation Party</option>
                        <option value="corporate_event">Corporate Event</option>
                        <option value="festival">Festival</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="HDHKNS">
                    <div className="UHIGF">
                        <div className="productsuggetion"></div>
                        <div className="productsuggetion"></div>
                        <div className="productsuggetion"></div>
                        <div className="productsuggetion"></div>
                        <div className="productsuggetion"></div>
                    </div>
                </div>
                <div className="btn-c">
                    <button>See More</button>
                </div>
            </div>
        </>
    );
};

export default RecomendedProducts;