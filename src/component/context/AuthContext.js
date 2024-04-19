import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [role, setRole] = useState(null);
    const [userId, setUserId] = useState(null);
    const isToken = localStorage.getItem("token");
    const currentUser = localStorage.getItem("user");
    

    useEffect(() => {
        const verifyToken = async () => {
            
            if (isToken) {
                try {
                    await axios.get('https://sendit-backend-rm0b.onrender.com/user/verify-token', { headers: { Authorization: `Bearer ${isToken}` } });
                    // setCurrentUser(response.data.user); // Adjust according to your API response
                } catch (error) {
                    console.error('Token verification failed:', error);
                    // setCurrentUser(null);
                }
            }
            setLoading(false);
        };

        verifyToken();
    }, [ isToken ]);

    const login = async (email, password) => {
        try {
            const response = await axios.post('https://sendit-backend-rm0b.onrender.com/api/login', { email, password });
            const { role, token, userId, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', user.data)
            // setCurrentUser(user);
            setRole(role)
            // setIsToken(token);
            setUserId(userId)
            setError(null);
            console.log('User ID: ', userId);
            console.log('Token: ', token);
            // If using React Router, you would navigate here
        } catch (err) {
            console.error('Login failed', err);
            setError(err.response?.data?.error || 'Login failed. Please try again.');
        }
    };

    const logout = async () => {
        try {
            await axios.post('https://sendit-backend-rm0b.onrender.com/api/logout');
            // setCurrentUser(null);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setError(null);
        } catch (err) {
            console.error('Logout failed', err);
            setError(err.response?.data?.error || 'Logout failed. Please try again.');
        }
    };

    const value = { currentUser, userId, login, isToken, logout, error, role };
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);