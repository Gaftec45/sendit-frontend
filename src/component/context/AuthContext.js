import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isToken, setIsToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get('https://sendit-backend-ten.vercel.app/user/verify-token', { headers: { Authorization: `Bearer ${token}` } });
                    setCurrentUser(response.data.user); // Adjust according to your API response
                } catch (error) {
                    console.error('Token verification failed:', error);
                    setCurrentUser(null);
                }
            }
            setLoading(false);
        };

        verifyToken();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post('https://sendit-backend-rm0b.onrender.com/api/login', { email, password });
            const { role, token, userId, user } = response.data;
            localStorage.setItem('token', token);
            setCurrentUser(user);
            setRole(role)
            setIsToken(token)
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
            setCurrentUser(null);
            localStorage.removeItem('token');
            setError(null);
        } catch (err) {
            console.error('Logout failed', err);
            setError(err.response?.data?.error || 'Logout failed. Please try again.');
        }
    };

    const value = { currentUser, login, logout, isToken, error, role };
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);











// import React, { createContext, useContext, useState, useEffect } from 'react';
// // import { useNavigate } from "react-router-dom";
// import axios from 'axios';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     // const navigate = useNavigate();
//     const [user, setUser] = useState(null);
//     const [isToken, setIsToken] = useState(null);
//     const [error, setError] = useState(null);
//     const [role, setRole] = useState(null)
//     const [currentUser, setCurrentUser] = useState(null);
//     const [loading, setLoading] = useState(true);
  
//     useEffect(() => {
//       const verifyToken = async () => {
//         const token = localStorage.getItem('token');
//         if (token) {
//           try {
//             const response = await axios.get('http://localhost:5000/api/verify-token', { headers: { Authorization: `Bearer ${token}` } });
//             setCurrentUser(response.data.user); // Adjust according to your API response
//           } catch (error) {
//             console.error('Token verification failed:', error);
//             setCurrentUser(null);
//           }
//         }
//         setLoading(false);
//       };
  
//       verifyToken();
//     }, []);

//     const lokgin = async (email, password) => {
//         try {
//             console.log('Sending login data', { email, password });
//             const response = await axios.post('http://localhost:5000/api/login', { email, password });
    
//             const { role, Token, redirect, userId, user } = response.data; // Extract role and token from response body
//             if (role === 'admin' || role === 'user') {
//                 localStorage.getItem('token', Token);
//                 setIsToken(Token);
//                 setUser(user); // Assuming user data is returned in the response
//                 console.log('User ID: ', userId); // Adjust this according to your response structure
//                 console.log('Token: ', Token);
//                 setError(null);
                
//                 // Redirect based on role
//                 window.location.href = redirect;
//             } else {
//                 // Handle invalid role
//                 setError('Invalid role received from server');
//             }
//         } catch (err) {
//             console.error('Login failed', err);
//             setError(err.response?.data?.error || 'Login failed. Please try again.');
//             throw err;
//         }
//     };  
    
//     const login = async (email, password) => {
//         try {
//             console.log('Sending login data', { email, password });
//             const response = await axios.post('http://localhost:5000/api/login', { email, password });
            
//             const { role, token, userId, user } = response.data;
//             localStorage.setItem('token', token);
//             setIsToken(token);  // Updates auth context/state with the new token
//             setUser(user);      // Updates auth context/state with user details
//             setRole(role);
//             setError(null);

//             console.log('User ID: ', userId);
            
//             // Feedback for successful login, could be a toast or message
//             console.log('Login successful, redirecting based on role...');
    
//             // Conditional navigation based on user role
//             // const navigate = useNavigate();
//         } catch (err) {
//             console.error('Login failed', err);
//             setError(err.response?.data?.error || 'Login failed. Please try again.');
//             // Feedback for failed login, could update UI to display error
//         }
//     };    
    
    

//     const logout = async () => {
//         try {
//             await axios.post('http://localhost:5000/api/logout');
//             setUser(null);
//             setIsToken(null);
//             localStorage.removeItem('token');
//             setError(null);
//         } catch (err) {
//             console.error('Logout failed', err);
//             setError(err.response?.data?.error || 'Logout failed. Please try again.');
//             throw err;
//         }
//     };

//     const value = { currentUser, setCurrentUser, user, login, role, isToken, logout, error }
//     return (
//         <AuthContext.Provider value={{ value }}>
//             {!loading && children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => useContext(AuthContext);




/*

isToken,
// const [userId, setUserId] = useState(localStorage.getItem('userId') || null); // Initialize userId from localStorage
    // const [isToken, setIsToken] = useState(localStorage.getItem('token') || null);

    // useEffect(() => {
    //     const requestInterceptor = axios.interceptors.request.use(
    //       (config) => {
    //         if (token) {
    //           config.headers.Authorization = `Bearer ${token}`;
    //         }
    //         return config;
    //       },
    //       (error) => {
    //         return Promise.reject(error);
    //       }
    //     );
    
        // const responseInterceptor = axios.interceptors.response.use(
        //   (response) => {
        //     return response;
        //   },
        //   (error) => {
        //     if (error.response && error.response.status === 401) {
        //       // Token expired or invalid, logout the user
        //       logout();
        //     }
        //     return Promise.reject(error);
        //   }
        // );
    
    //     return () => {
    //       axios.interceptors.request.eject(requestInterceptor);
    //       axios.interceptors.response.eject(responseInterceptor);
    //     };
    //   }, [token]);

    useEffect(() => {
        // Add a request interceptor to attach the token to outgoing requests
        const requestInterceptor = axios.interceptors.request.use(
            (config) => {
                console.log('Token in Interceptor:', token);
                // Add authorization header with the token
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    
        // Add a response interceptor to handle token expiry errors
        const responseInterceptor = axios.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                if (error.response && error.response.status === 401) {
                    // Token expired or invalid, log out the user
                    logout();
                }
                return Promise.reject(error);
            }
    
        );
    
        // Clean up interceptors when component unmounts
        return () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        };
    }, [token]);

*/