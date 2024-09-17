import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../storeing-data/auth";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        identifier: "",
        password: "",
    });

    const { storeTokeninLocalMem } = useAuth();
    const navigate = useNavigate();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: name === "identifier" ? value.toLowerCase() : value,
        });
    };

    const HOST = import.meta.env.REACT_APP_HOST;
    const PORT = import.meta.env.REACT_APP_PORT;

    useEffect(() => {
        const fetchServerConfig = async () => {
            try {
                const response = await fetch(`${HOST}:${PORT}/api/config`);
                if (response.ok) {
                    const configData = await response.json();
                    console.log("Server Config:", configData);
                    // Now you can use configData.PORT and configData.IP_ADDRESS
                }
            } catch (error) {
                console.error("Error fetching server config:", error);
            }
        };

        fetchServerConfig();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user.identifier.trim() || !user.password.trim()) {
            // toast.error("Please provide both email and password.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${HOST}:${PORT}/api/auth/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                const res_data = await response.json();
                storeTokeninLocalMem(res_data.token);

                setUser({ identifier: "", password: "" });
                // toast.success("Login Successful");
                navigate("/");
            } else {
                const data = await response.json();
                // toast.error(data.message || "Login failed");
            }
        } catch (error) {
            // toast.error("An error occurred. Please try again.");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="identifier"
                    placeholder="Email Address"
                    autoComplete="off"
                    value={user.identifier}
                    onChange={handleInput}
                    autoCapitalize="no"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    autoComplete="off"
                    value={user.password}
                    onChange={handleInput}
                />
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Link to="/forgot-password">Forgot Password?</Link>
                </div>

                <button style={{ marginTop: "2em", width: "100%" }} type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
            <div style={{ width: "100%", marginTop: "0.5em", display: "flex", justifyContent: "flex-end", gap: "1em" }}>
                <strong>New to Rentblee?</strong>
                <Link to="/register">Create an account</Link>
            </div>
        </>
    );
};

export default Login;
