import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./component/Layout";
import PublicPage from "./Pages/PublicPage";
import Signup from "./component/Signup";
import Login from "./component/Login";
import ProtectedPage from "./Pages/ProtectedPage";
import { AuthProvider, useAuth } from "./component/context/AuthContext";
import OrderForm from "./Pages/OrderForm";
import AdminDashboard from "./Pages/AdminDashboard";
import { Navigate } from "react-router-dom";

// Creating a layout or wrapper for private routes
function PrivateRoute({ children }) {
  const { currentUser, role } = useAuth();
  return currentUser && role === 'user' ? children : <Navigate to="/login" replace />;
}

// Admin-specific route
function AdminRoute({ children }) {
  const { currentUser, role } = useAuth();
  return currentUser && role === 'admin' ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <PublicPage /> },
        { path: "signup", element: <Signup /> },
        { path: "login", element: <Login /> },
        { path: "user/dashboard", element: <PrivateRoute><ProtectedPage /></PrivateRoute> },
        { path: "new-order", element: <PrivateRoute><OrderForm /></PrivateRoute> },
        { path: "admin/dashboard", element: <AdminRoute><AdminDashboard /></AdminRoute> },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

// const PrivateRoute = ({ element }) => {
//   const { user } = useAuth(); // Get user from authentication context

//   return user ? element : <Navigate to="/login" replace />;
// };
// { path: "dashboard", element: <PrivateRoute element={<ProtectedPage />} /> },
// { path: "new-order", element: <PrivateRoute element={<OrderForm />} /> },





















/*import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./component/Layout";
import PublicPage from "./Pages/PublicPage";
import Signup from "./component/Signup";
import Login from "./component/Login";
import ProtectedPage from "./Pages/ProtectedPage";
import { AuthProvider, useAuth } from "./component/context/AuthContext";
import OrderForm from "./Pages/OrderForm";
import { useNavigate } from "react-router-dom";


export default function App() {
  const navigate = useNavigate();

  const PrivateRoute = ({ element }) => {
    const { user } = useAuth();
    return user ? element : < navigate to="/login" replace />;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />, 
      children: [
        { index: true, element: <PublicPage /> },
        { path: "signup", element: <Signup /> },
        { path: "login", element: <Login /> },
        { path: "logout", element: <PublicPage /> },
        { path: "logout", element: <PublicPage /> },

        { path: "dashboard", element: <ProtectedPage /> },
        { path: "new-order", element: <OrderForm /> },
      ],
    },

    <PrivateRoute path='/dashboard' element={<ProtectedPage />} />
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
} */