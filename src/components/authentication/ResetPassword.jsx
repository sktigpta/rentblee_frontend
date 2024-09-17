import { React, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaEyeSlash, FaEye } from "react-icons/fa";

const ResetPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(''); // Clear message before form submission

        // Validate if password and confirm password match
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${HOST}:${PORT}/api/auth/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // toast.success(data.message);
                navigate('/login');
            } else {
                setMessage(data.message); // Show error message from response
                // toast.error(data.message);
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
            // toast.error('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    name="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <div style={{ position: 'relative', marginTop: '1em' }}>
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        onClick={handleToggleConfirmPassword}
                        style={{
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'transparent', // Set background to transparent
                            border: 'none', // Remove border
                            outline: 'none', // Remove outline on focus
                            cursor: 'pointer', // Change cursor to pointer to indicate it's clickable
                            padding: 0, // Remove default padding
                            fontSize: 'inherit', // Keep font size consistent
                            color: 'gray'
                        }}
                    >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>

                {/* Message div for displaying errors */}
                {message && <div style={{ color: 'red', marginTop: '1em' }}>{message}</div>}

                <button style={{ marginTop: '2em', width: '100%' }} type="submit" disabled={loading}>
                    {loading ? 'Password resetting...' : 'Reset Password'}
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;
