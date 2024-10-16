import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [updateData,setupdateData]=useState(false);
    const [authState, setAuthState] = useState({
        token: sessionStorage.getItem('token'),
        isAuthenticated: !!sessionStorage.getItem('token'),
    });

    useEffect(() => {
        if (authState.token) {
            try {
                jwtDecode(authState.token);
            } catch (e) {
                setAuthState({ token: null, isAuthenticated: false });
            }
        }
    }, [authState.token]);

    const setAuth = (token, user) => {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('user', JSON.stringify(user));
        setAuthState({ token, isAuthenticated: true });
    };

    const logout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user'); // Remove user from session storage
        setAuthState({ token: null, isAuthenticated: false });
    };

    return (
        <AuthContext.Provider value={{ authState, setAuth, logout,setupdateData,updateData }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
