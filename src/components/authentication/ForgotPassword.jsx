import React, { useState } from 'react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const HOST = import.meta.env.REACT_APP_HOST;
    const PORT = import.meta.env.REACT_APP_PORT;


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            // toast.error("Please provide an email address.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${HOST}:${PORT}/api/auth/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                // toast.success(data.message);
                setEmail('');
            } else {
                // toast.error(data.message);
            }
        } catch (error) {
            console.error("Network error:", error);
            // toast.error('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
                <div className="form">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button style={{ marginTop: "2em", width: "100%" }} type="submit" disabled={loading}>
                            {loading ? "Submitting..." : "Submit"}
                        </button>
                    </form>
            </div>
        </>
    );
};

export default ForgotPassword;
