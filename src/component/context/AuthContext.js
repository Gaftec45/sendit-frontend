import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [role, setRole] = useState(null);
    const [userId, setUserId] = useState(null);
    const [currentUser, setCurrentUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null; // Parse the user object
    });
    const isToken = localStorage.getItem("token");

    // useEffect(() => {
    //     const verifyToken = async () => {
    //         if (isToken) {
    //             try {
    //                 await axios.get('https://sendit-backend-rm0b.onrender.com/user/verify-token', {
    //                     headers: { Authorization: `Bearer ${isToken}` }
    //                 });
    //                 // Optionally, update the user from the response
    //                 setCurrentUser(JSON.parse(localStorage.getItem("user"))); // Refresh user from storage if needed
    //             } catch (error) {
    //                 console.error('Token verification failed:', error);
    //                 setCurrentUser(null); // Clear user on failure
    //             }
    //         }
    //         setLoading(false);
    //     };

    //     verifyToken();
    // }, [isToken]);

    const login = async (email, password) => {
        try {
            const response = await axios.post('https://sendit-backend-rm0b.onrender.com/api/login', { email, password });
            const { role, token, userId, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user)); // Make sure to stringify
            setCurrentUser(user); // Set current user in state
            setRole(role);
            setUserId(userId);
            setError(null);
        } catch (err) {
            console.error('Login failed', err);
            setError(err.response?.data?.error || 'Login failed. Please try again.');
        }
    };

    const logout = async () => {
        try {
            await axios.post('https://sendit-backend-rm0b.onrender.com/api/logout');
            setCurrentUser(null);
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
            { children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
