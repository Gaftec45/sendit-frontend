// fakeAuthProvider.js

const TOKEN_KEY = 'auth_token';

const authProvider = {
  isAuthenticated: () => {
    // Check if the user is authenticated
    const token = localStorage.getItem(TOKEN_KEY);
    return !!token; // Return true if token exists, false otherwise
  },
  signin: (token) => {
    // Simulate sign-in logic by storing the token in localStorage
    localStorage.setItem(TOKEN_KEY, token);
  },
  signout: () => {
    // Simulate sign-out logic by removing the token from localStorage
    localStorage.removeItem(TOKEN_KEY);
  }
};

export { authProvider };
