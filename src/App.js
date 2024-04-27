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
import EditOrderForm from "./Pages/EditOrderForm";
import ErrorPage from "./404";


//Creating a layout or wrapper for private routes
function PrivateRoute({ children }) {
  
  const { currentUser, role } = useAuth();
  return currentUser && role === 'user' ? children : <Navigate to="" replace />;
}

// Admin-specific route
function AdminRoute({ children }) {
  const { currentUser, role } = useAuth();
  return currentUser && role === 'admin' ? children : <Navigate to="" replace />;
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
        { path: "*", element: <ErrorPage /> },
        { path: "user/dashboard", element: <ProtectedPage /> },
        { path: "new-order", element: <OrderForm /> },
        { path: "edit-order/:orderId", element:  <EditOrderForm /> },
        { path: "admin/dashboard", element: <AdminDashboard /> },
        { path: "admin/dashboard", element: <AdminRoute></AdminRoute> },
        { path: "admin/dashboard", element: <PrivateRoute></PrivateRoute> },


      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};