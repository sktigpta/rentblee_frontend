import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [user, setUser] = useState({
        fullname: "",
        username: "",
        email: "",
        phone: "",
        password: "",
    });

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        // Convert email and username to lowercase if the input name is "email" or "username"
        if (name === "email" || name === "username") {
            value = value.toLowerCase();
        }

        setUser({
            ...user,
            [name]: value,
        });
    };

    const navigate = useNavigate();

    const HOST = import.meta.env.REACT_APP_HOST;
    const PORT = import.meta.env.REACT_APP_PORT;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${HOST}:${PORT}/api/auth/register`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                setUser({ fullname: "", username: "", email: "", phone: "", password: "" });
                // toast.success("Registration Successful");
                navigate("/login");
            } else {
                const data = await response.json();
                // toast.error(data.message || "Registration failed");
            }
        } catch (error) {
            // toast.error("An error occurred. Please try again.");
            console.log(error);
        }
    };

    return (
        <>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="fullname"
                    placeholder="Full Name"
                    autoComplete="off"
                    value={user.fullname}
                    onChange={handleInput}
                    required
                />

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    autoComplete="off"
                    value={user.username}
                    onChange={handleInput}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    autoComplete="off"
                    value={user.email}
                    onChange={handleInput}
                    required
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    autoComplete="off"
                    value={user.phone}
                    onChange={handleInput}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    autoComplete="off"
                    value={user.password}
                    onChange={handleInput}
                    required
                />
                <button style={{ marginTop: "2em", width: "100%" }} type="submit">Register</button>
            </form>
            <div style={{ width: "100%", marginTop: "0.5em", display: "flex", justifyContent: "flex-end", gap: "1em" }}> <strong>Already have an Account?</strong> <Link to="/login">Login Here</Link></div>

        </>
    );
};

export default Register;
