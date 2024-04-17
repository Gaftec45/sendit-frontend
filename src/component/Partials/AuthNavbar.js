import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

const AuthNavbar = () => {
    const { logout } = useAuth();
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
              <strong>  <NavLink className="navbar-brand" to="/user/dashboard">SendIT</NavLink> </strong>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/user/dashboard">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/new-order">Create New Order</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" onClick={logout}>Logout</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
 
export default AuthNavbar;
