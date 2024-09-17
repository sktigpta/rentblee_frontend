import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BusinessPage = () => {
  const { businessId } = useParams(); // Extract businessId from route parameters
  const [businessData, setBusinessData] = useState(null);

  const HOST = import.meta.env.REACT_APP_HOST;
    const PORT = import.meta.env.REACT_APP_PORT;

  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        if (!businessId) {
          console.error('Business ID is undefined');
          return;
        }

        const response = await fetch(`${HOST}:${PORT}/api/business/${businessId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch business data');
        }
        const data = await response.json();
        setBusinessData(data);
      } catch (error) {
        console.error('Error fetching business data:', error);
      }
    };

    fetchBusinessData();
  }, [businessId]);

  if (!businessData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{businessData.businessname}</h2>
      <p>{businessData.about}</p>
      <p>
        Address: {businessData.address.street}, {businessData.address.area}, {businessData.address.district}
      </p>
    </div>
  );
};

export default BusinessPage;
