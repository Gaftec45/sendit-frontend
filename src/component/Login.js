import React, { useState, useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const { isToken, login, error, role } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Redirect if already logged in
  useEffect(() => {
    if (isToken) {
      // Redirect based on the user's role
      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else if (role === 'user') {
        navigate('/user/dashboard');
      } else {
        // Optionally handle unexpected role or redirect to a generic page
        console.error("Unexpected user role");
        navigate('/');
      }
    }
  }, [isToken, role, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
    } catch (error) {
      console.error(error);
    }
  };

  // Return null if user is already logged in (render nothing)
  if (isToken) return null;

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Login</h2>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    required
                    autoComplete="off"
                    placeholder="Enter Email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-control"
                    required
                    autoComplete="off"
                    placeholder="Enter Password"
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;



// import React, { useState, useEffect } from "react";
// import { useAuth } from "./context/AuthContext";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const navigate = useNavigate();
//   const { isToken, login, error, role } = useAuth();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   useEffect(()=>{
//     if(!isToken){

//     }
//   }, [])
  
//   useEffect(() => {
//     if (isToken !== null || role) {
//       // navigate('/user/dashboard');
//     if (role === 'admin') {
//         navigate('/admin/dashboard');
//     } else if (role === 'user') {
//         navigate('/user/dashboard');
//     } else {
//         // Handle unexpected role
//         // error('Unexpected user role');
//         console.error("an error occured")
//     }
//     }
//   }, [ isToken, role, navigate ])
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     console.log(formData.email);
//     e.preventDefault();
//     try {
//       await login(formData.email, formData.password);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="container">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="card mt-5">
//             <div className="card-body">
//               <h2 className="card-title text-center mb-4">Login</h2>
//               {error && (
//                 <div className="alert alert-danger" role="alert">
//                   {error}
//                 </div>
//               )}
//               <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                   <label htmlFor="email">Email</label>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="form-control"
//                     required
//                     autoComplete="off"
//                     placeholder="Enter Email"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="password">Password</label>
//                   <input
//                     type="password"
//                     id="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     className="form-control"
//                     required
//                     autoComplete="off"
//                     placeholder="Enter Password"
//                   />
//                 </div>
//                 <button type="submit" className="btn btn-primary btn-block">
//                   Login
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;