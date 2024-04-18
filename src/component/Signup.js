import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate(); // Initialize navigate hook

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (password !== confirmPassword) {
    //   alert("Passwords do not match");
    //   return;
    // }

    try {
      const response = await axios.post("https://sendit-backend-ten.vercel.app/api/register", formData);
      console.log(response.data);
      // Clear form after successful submission
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
      // Redirect to login page after successful signup
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Signup Page</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleChange}
                    className="form-control"
                    required
                    autoComplete="off"
                    placeholder="Enter Username"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    className="form-control"
                    required
                    autoComplete="off"
                    placeholder="Enter Email"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    className="form-control"
                    required
                    autoComplete="off"
                    placeholder="Enter Password"
                  />
                </div>
                {/* <div className="form-group">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                    className="form-control"
                    required
                    autoComplete="off"
                    placeholder="Confirm Password"
                  />
                </div> */}
                <button type="submit" className="btn btn-primary btn-block">
                  Signup
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
