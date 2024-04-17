import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import GuestNavbar from "./Partials/GuestNavbar";
import AuthNavbar from "./Partials/AuthNavbar";
import AuthStatus from "./AuthStatus";

function Layout() {
  const { currentUser, isToken } = useAuth();

  return (
    <div>
      { currentUser && isToken ? <AuthNavbar /> : <GuestNavbar />}
      <AuthStatus />
      <div className="container-fluid">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;