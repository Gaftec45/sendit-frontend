import React from "react";
import { useAuth } from "./context/AuthContext";
import { NavLink } from "react-router-dom";

function AuthStatus() {
  const { currentUser, isToken } = useAuth();

  return (
    <div className="container-fluid">
      { currentUser && isToken ? (
        <h2 className="dashboard-header">
          Welcome back to your Dashboard <span className="username">{currentUser.username}</span>
        </h2>
      ) : (
        <p className="not-logged-in">
          You are not logged in. <NavLink to="/login">Sign In</NavLink>
        </p>
      )}
    </div>
  );
}

export default AuthStatus;
