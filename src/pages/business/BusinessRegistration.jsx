import React, { useState } from "react";
import banner from '../../assets/collection/business-registration-banner.jpg';
import "./business.css";
import { useAuth } from "../../storeing-data/auth";
import { useNavigate } from "react-router-dom";

const BusinessRegistration = () => {
    const { authorizationToken } = useAuth();
    const navigate = useNavigate();

    const HOST = import.meta.env.REACT_APP_HOST;
    const PORT = import.meta.env.REACT_APP_PORT;

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [business, setBusiness] = useState({
        businessname: "",
        about: "",
        address: {
            street: "",
            area: "",
            district: "",
            postalCode: "",
            state: "",
            country: ""
        },
        categories: [],
        phone: "",
        email: "",
        tan: "",
        gstin: ""
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        if (name.startsWith("address.")) {
            const addressField = name.substring(8);
            setBusiness(prevBusiness => ({
                ...prevBusiness,
                address: { ...prevBusiness.address, [addressField]: value }
            }));
        } else if (name === "categories") {
            setBusiness(prevBusiness => ({
                ...prevBusiness,
                categories: value.split(",").map(cat => cat.trim().toLowerCase())
            }));
        } else if (name === "email") {
            setBusiness(prevBusiness => ({
                ...prevBusiness,
                email: value.toLowerCase()
            }));
        } else if (name === "phone") {
            setBusiness(prevBusiness => ({
                ...prevBusiness,
                phone: value.replace(/\D/g, '') // Allow only numeric input
            }));
        } else {
            setBusiness(prevBusiness => ({
                ...prevBusiness,
                [name]: value
            }));
        }
    };

    const validateStep = () => {
        setError("");
        switch (step) {
            case 1:
                if (!business.businessname || !business.about || business.categories.length === 0) {
                    setError("Please fill in all required fields.");
                    return false;
                }
                if (business.about.split(" ").length < 20) {
                    setError("The 'About' section must contain at least 20 words.");
                    return false;
                }
                return true;
            case 2:
                if (!business.address.street || !business.address.area || !business.address.district ||
                    !business.address.postalCode || !business.address.state || !business.address.country) {
                    setError("Please fill in all required fields.");
                    return false;
                }
                return true;
            case 3:
                if (!business.phone || business.phone.length !== 10 || !business.email) {
                    setError("Please enter a valid 10-digit phone number and email.");
                    return false;
                }
                return true;
            case 4:
                // TAN and GSTIN are optional
                return true;
            case 5:
                return true;
            default:
                return false;
        }
    };

    const nextStep = () => {
        if (validateStep()) {
            setStep(prevStep => prevStep + 1);
        }
    };

    const prevStep = () => {
        setStep(prevStep => prevStep - 1);
    };

    const skipStep = () => {
        setStep(5);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (step !== 5) {
            setError("Please complete all steps.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${HOST}:${PORT}/api/business/register`, {
                method: 'POST',
                headers: {
                    Authorization: authorizationToken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(business)
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Form submitted successfully', data);
                navigate("/business-profile");
            } else {
                const errorData = await response.json();
                setError(`Form submission failed: ${errorData.message}`);
            }
        } catch (error) {
            setError("Error submitting form");
        } finally {
            setLoading(false);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                const remainingChars = 100 - business.about.length;
                const counterColor = remainingChars > 0 ? "#bb2124" : "#117a37";
                return (
                    <div>
                        <input
                            type="text"
                            name="businessname"
                            placeholder="Business Name"
                            autoComplete="off"
                            value={business.businessname}
                            onChange={handleInput}
                            required
                        />
                        <textarea
                            name="about"
                            placeholder="Tell us about your business (at least 20 words)"
                            autoComplete="off"
                            value={business.about}
                            onChange={handleInput}
                            required
                        />
                        <div style={{ margin: "-1em 0 0.5em 0", fontSize: "0.6em", width: "100%", justifyContent: "right", color: counterColor }} className="d-flex">
                            <p>Characters remaining: {remainingChars}</p>
                        </div>
                        <input
                            type="text"
                            name="categories"
                            placeholder="Categories (comma separated)"
                            autoComplete="off"
                            value={business.categories.join(", ")}
                            onChange={handleInput}
                            required
                        />
                        <button style={{ marginTop:"1em",display: "flex", justifyContent: "center" }} className="btn" type="button" onClick={nextStep}>Next</button>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <input
                            type="text"
                            name="address.street"
                            placeholder="Street"
                            autoComplete="off"
                            value={business.address.street}
                            onChange={handleInput}
                            required
                        />
                        <input
                            type="text"
                            name="address.area"
                            placeholder="Area"
                            autoComplete="off"
                            value={business.address.area}
                            onChange={handleInput}
                            required
                        />
                        <input
                            type="text"
                            name="address.district"
                            placeholder="District"
                            autoComplete="off"
                            value={business.address.district}
                            onChange={handleInput}
                            required
                        />
                        <input
                            type="text"
                            name="address.postalCode"
                            placeholder="Postal Code"
                            autoComplete="off"
                            value={business.address.postalCode}
                            onChange={handleInput}
                            required
                        />
                        <input
                            type="text"
                            name="address.state"
                            placeholder="State"
                            autoComplete="off"
                            value={business.address.state}
                            onChange={handleInput}
                            required
                        />
                        <input
                            type="text"
                            name="address.country"
                            placeholder="Country"
                            autoComplete="off"
                            value={business.address.country}
                            onChange={handleInput}
                            required
                        />
                        <div className="btn">
                            <button type="button" onClick={prevStep}>Previous</button>
                            <button type="button" onClick={nextStep}>Next</button>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone Number (10 digits)"
                            autoComplete="off"
                            value={business.phone}
                            onChange={handleInput}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Business Email"
                            autoComplete="off"
                            value={business.email}
                            onChange={handleInput}
                            required
                        />
                        <div className="btn">
                            <button type="button" onClick={prevStep}>Previous</button>
                            <button type="button" onClick={nextStep}>Next</button>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div>
                        <input
                            type="text"
                            name="tan"
                            placeholder="TAN (optional)"
                            autoComplete="off"
                            value={business.tan}
                            onChange={handleInput}
                        />
                        <input
                            type="text"
                            name="gstin"
                            placeholder="GSTIN (optional)"
                            autoComplete="off"
                            value={business.gstin}
                            onChange={handleInput}
                        />
                        <div className="btn">
                            <button type="button" onClick={skipStep}>Skip</button>
                            <button type="button" onClick={prevStep}>Previous</button>
                            <button type="button" onClick={nextStep}>Next</button>
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div style={{ width: "100%" }}>
                        <h2 style={{ margin: "0.2em 0" }}>{business.businessname}</h2>
                        <p>{business.about}</p>

                        <div className="categories">
                            <p>{business.categories.join(" ")}</p>
                        </div>
                        <h4 style={{ marginTop: "0.5em" }}>Address</h4>
                        <p>{business.address.street}</p>
                        <p>{business.address.area}</p>
                        <p>{business.address.district}</p>
                        <p>{business.address.postalCode}</p>
                        <p>{business.address.state}</p>
                        <p>{business.address.country}</p>
                        <h4 style={{ marginTop: "0.5em" }}>Contacts</h4>
                        <p>{business.email}</p>
                        <p>{business.phone}</p>
                        <h4 style={{ marginTop: "0.5em" }}>Tax Information</h4>
                        <p>{business.tan}</p>
                        <p>{business.gstin}</p>
                        <div style={{ marginTop: "1em" }} className="btn">
                            <button type="button" onClick={prevStep}>Previous</button>
                            <button type="submit" disabled={loading}>
                                {loading ? "Submitting..." : "Submit"}
                            </button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="page">
            <div className="d-row">
                <div className="business-hero-banner">
                    <img src={banner} alt="Business Registration Banner" />
                </div>

                <div className="auth-forms">
                    <div className="headings">
                        <h2>
                            {step === 1 && "Basic Details"}
                            {step === 2 && "Business Address"}
                            {step === 3 && "Business Contact"}
                            {step === 4 && "Business Tax ID (TAN)"}
                            {step === 5 && "Review Your Details"}
                        </h2>
                        <p>Step {step} of 5</p>
                    </div>

                    <div className="b-form">
                        <form onSubmit={handleSubmit}>
                            {renderStep()}
                        </form>
                        <div style={{ margin: "0.5em 0", color: "#bb2124" }} className="error-message"> {error}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessRegistration;
