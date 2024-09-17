import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../storeing-data/auth";


import "./authentication.css";
import { FcGoogle } from "react-icons/fc";

const GoogleSignin = () => {
    const navigate = useNavigate();
    const { storeTokeninLocalMem } = useAuth();

    const HOST = import.meta.env.REACT_APP_HOST;
    const PORT = import.meta.env.REACT_APP_PORT;

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
            storeTokeninLocalMem(token);
            // toast.success("Login with Google Successful");
            navigate('/');
        } else if (urlParams.has('error')) {
            // toast.error("Google login failed");
        }
    }, [navigate, storeTokeninLocalMem]);

    const googleAuth = () => {
        window.open(`${HOST}:${PORT}/api/auth/google`, '_self');
    };

    return (
        <>
            <div className='social-auth' onClick={googleAuth}>
                <FcGoogle />
                Login with Google
            </div>
        </>
    );
};

export default GoogleSignin;
