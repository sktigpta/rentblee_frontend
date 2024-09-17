import React, { createContext, useContext, useEffect, useState } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState("");
    const [business, setBusiness] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);
    const authorizationToken = `Bearer ${token}`;

    const HOST = import.meta.env.REACT_APP_HOST;
    const PORT = import.meta.env.REACT_APP_PORT;

    const storeTokeninLocalMem = (serverToken) => {
        setToken(serverToken);
        localStorage.setItem("token", serverToken);
    };

    const LogoutUser = () => {
        setToken("");
        localStorage.removeItem("token");
    };

    const userAuthentication = async () => {
        try {
            const response = await fetch(`${HOST}:${PORT}/api/auth/user`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data.userData);

                if (data.userData.isBusiness) {
                    await fetchBusinessDetails();
                }
            }
        } catch (error) {
            console.log("Error while fetching user data:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchBusinessDetails = async () => {
        try {
            const response = await fetch(`${HOST}:${PORT}/api/business/`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            if (response.ok) {
                const businessData = await response.json();
                setBusiness(businessData);
            }
        } catch (error) {
            console.log("Error while fetching business data:", error);
        }
    };

    useEffect(() => {
        userAuthentication();
    }, [token]);

    // Provide loading state and flattened business object
    return (
        <AuthContext.Provider
            value={{ isLoggedIn: !!token, storeTokeninLocalMem, LogoutUser, user, ...business, loading, authorizationToken }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue)
        throw new Error("useAuth used outside of the provider");

    return authContextValue;
};
