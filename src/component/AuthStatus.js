import React, { useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { NavLink } from "react-router-dom";

function AuthStatus() {
  const { currentUser, isToken } = useAuth();
  
useEffect(()=>{
  if(isToken === null){
    console.log('is null', isToken)
    console.log('is a :', currentUser);
  }
})

  return (
    <div className="container-fluid">
      { currentUser != null && isToken != null ? (
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
