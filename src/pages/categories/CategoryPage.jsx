// CategoryPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CategoryPage = () => {
  const { categoryId } = useParams(); // Extract categoryId from route parameters
  const [categoryData, setCategoryData] = useState(null);

  const HOST = import.meta.env.REACT_APP_HOST;
    const PORT = import.meta.env.REACT_APP_PORT;

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        if (!categoryId) {
          console.error('Category ID is undefined');
          return;
        }

        const response = await fetch(`${HOST}:${PORT}/api/category/${categoryId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch category data');
        }
        const data = await response.json();
        setCategoryData(data);
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    fetchCategoryData();
  }, [categoryId]);

  if (!categoryData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{categoryData.category.name}</h2>
      <p>{/* Render category description or other details here if available */}</p>

      <h3>Businesses in {categoryData.category.name}</h3>
      {categoryData.businesses.length === 0 ? (
        <p>No businesses found in this category</p>
      ) : (
        <ul>
          {categoryData.businesses.map((business) => (
            <li key={business._id}>
              <h4>{business.businessname}</h4>
              <p>{business.about}</p>
              <p>{business.address.street}, {business.address.area}, {business.address.district}</p>
              {/* Render other business details as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryPage;
