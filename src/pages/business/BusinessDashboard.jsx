import React from "react";
import { useAuth } from "../../storeing-data/auth";

const BusinessDashboard = () => {
    const { business, loading } = useAuth(); 

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <div>Hello, this is the business data: {business.businessname}</div>
        </>
    );
};

export default BusinessDashboard;
