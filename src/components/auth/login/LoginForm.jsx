// import React, { useState } from "react";
// import axios from "axios";
// import styles from "./LoginForm.module.css";
// import { Link } from "react-router-dom";
//
// const LoginForm = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };
//
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage("");
//     setSuccessMessage("");
//
//     try {
//       const response = await axios.post(
//         "http://localhost:8080/api/auth/authenticate",
//         formData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         },
//       );
//
//       // save token in localStorage
//       localStorage.setItem("token", response.data.token);
//
//       setSuccessMessage("Login successful!");
//       console.log("Login successful:", response.data);
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         setErrorMessage("Invalid email or password.");
//       } else {
//         setErrorMessage("An error occurred. Please try again.");
//       }
//     }
//   };
//
//   return (
//     <div className={styles.loginContainer}>
//       <h2 className={styles.title}>Login to Your Account</h2>
//       <form onSubmit={handleSubmit} className={styles.form}>
//         <div className={styles.formGroup}>
//           <label htmlFor="email" className={styles.label}>
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className={styles.input}
//             required
//           />
//         </div>
//
//         <div className={styles.formGroup}>
//           <label htmlFor="password" className={styles.label}>
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             className={styles.input}
//             required
//           />
//         </div>
//
//         <button type="submit" className={styles.submitButton}>
//           Login
//         </button>
//
//         {errorMessage && <p className={styles.error}>{errorMessage}</p>}
//         {successMessage && <p className={styles.success}>{successMessage}</p>}
//       </form>
//       <div className={styles.createAccountSection}>
//         <p>Don't have an account</p>
//         <Link to="/signup">Create New Account</Link>
//       </div>
//     </div>
//   );
// };
//
// export default LoginForm;

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../store/slices/authSlice.js";
import styles from "./LoginForm.module.css";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hasNavigated = useRef(false);

  const { isLoading, error, successMessage, user, isAuthenticated } =
    useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && !hasNavigated.current) {
      if (user.role === "ADMIN") {
        navigate("/admin-dashboard");
      } else if (user.role === "USER") {
        navigate("/");
      }
      hasNavigated.current = true;
    }
  }, [isAuthenticated, user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.title}>Login to Your Account</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        {error && <p className={styles.error}>{error}</p>}
        {successMessage && <p className={styles.success}>{successMessage}</p>}
      </form>
      <div className={styles.createAccountSection}>
        <p>Don't have an account</p>
        <Link to="/signup">Create New Account</Link>
      </div>
    </div>
  );
};

export default LoginForm;
