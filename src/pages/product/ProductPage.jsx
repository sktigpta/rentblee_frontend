// ProductPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
    const { productId } = useParams(); // Extract productId from route parameters
    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const HOST = import.meta.env.REACT_APP_HOST;
    const PORT = import.meta.env.REACT_APP_PORT;

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await fetch(`${HOST}:${PORT}/api/products/${productId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product data');
                }
                const data = await response.json();
                setProductData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product data:', error);
                setError('Failed to fetch product data');
                setLoading(false);
            }
        };

        fetchProductData();
    }, [productId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!productData) {
        return <div>No product data available</div>;
    }

    return (
        <div>
            <h2>{productData.name}</h2>
            <p>{productData.description}</p>
            {/* Render other product details as needed */}
        </div>
    );
};

export default ProductPage;
