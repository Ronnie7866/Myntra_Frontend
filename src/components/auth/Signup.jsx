import React, { useState } from "react";
import styles from "./Signup.module.css";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import { useNavigate } from "react-router-dom";
import { showSuccessToast, showErrorToast } from "../../utils/toastify.js";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false); // State for spinner
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  const handleGithubLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/github";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Start loading when the form is submitted

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        formData,
        {
          "Content-Type": "application/json",
        }
      );

      // Save the token in local storage
      localStorage.setItem("token", response.data.token);

      // Display success toast
      showSuccessToast("Registration successful!");
      navigate("/");
    } catch (error) {
      // Check if error response exists
      if (error.response) {
        if (error.response.status === 409) {
          // Handle duplicate entry error
          showErrorToast("User already registered! Please log in.");
        } else if (error.response.status === 500) {
          // Handle internal server error
          const errorMessage =
            error.response.data.detail ||
            "An error occurred. Please try again.";
          showErrorToast(errorMessage);
        } else {
          // Handle other errors
          showErrorToast("Registration failed! Please try again.");
        }
      } else {
        // Handle network or other unexpected errors
        showErrorToast("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Create an Account</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="firstName" className={styles.label}>
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="lastName" className={styles.label}>
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

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
          disabled={loading}
        >
          {loading ? "Submitting..." : "Register"}
        </button>
      </form>
      <div className={styles.OAuthButtonContainer}>
        <button
          className={`${styles.button} ${styles.googleButton}`}
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          <FcGoogle />
          Login with Google
        </button>
        <button
          className={`${styles.button} ${styles.githubButton}`}
          onClick={handleGithubLogin}
          disabled={loading}
        >
          <FaGithub />
          Login with Github
        </button>
      </div>
    </div>
  );
};

export default Signup;
