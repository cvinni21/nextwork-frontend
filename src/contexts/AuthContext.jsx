'use client';
import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessTokenState] = useState(null);
    const [refreshToken, setRefreshTokenState] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedAccessToken = localStorage.getItem('accessToken');
        const storedRefreshToken = localStorage.getItem('refreshToken');

        console.log('🔐 Initial auth state from storage:', {
            storedUser,
            storedAccessToken,
            storedRefreshToken
        });

        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error('Erro ao fazer parse do user:', e);
                setUser(null);
            }
        }

        if (storedAccessToken) setAccessToken(storedAccessToken);
        if (storedRefreshToken) setRefreshToken(storedRefreshToken);

        setAuthLoading(false);
    }, []);

    const setAccessToken = (token) => {
        setAccessTokenState(token);
        if (token) {
            localStorage.setItem('accessToken', token);
        } else {
            localStorage.removeItem('accessToken');
        }
    };

    const setRefreshToken = (token) => {
        setRefreshTokenState(token);
        if (token) {
            localStorage.setItem('refreshToken', token);
        } else {
            localStorage.removeItem('refreshToken');
        }
    };

    const setUserWithStorage = (user) => {
        setUser(user);
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    };

    const logout = () => {
        setUser(null);
        setAccessToken(null);
        setRefreshToken(null);
    };

    const extractUserIdFromToken = () => {
        if (!accessToken) return null;
        try {
            const decoded = jwtDecode(accessToken);
            return decoded.user_id || decoded.sub;
        } catch {
            return null;
        }
    };

    const userId = user?.id || extractUserIdFromToken();

    return (
        <AuthContext.Provider value={{
            user,
            setUser: setUserWithStorage,
            accessToken,
            setAccessToken,
            refreshToken,
            setRefreshToken,
            userId,
            logout,
            authLoading
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
