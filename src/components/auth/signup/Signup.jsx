import React, { useState } from "react";
import styles from "./Signup.module.css";
import axios from "axios"; // Import CSS module
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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

    setErrorMessage(""); // Clear any previous error messages
    setSuccessMessage(""); // Clear any previous success messages

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        formData,
        {
          "Content-Type": "application/json",
        },
      );

      // save the token in local storage
      localStorage.setItem("token", response.data.token);

      setSuccessMessage("Registration successfully!");
    } catch (error) {
      console.error(error);
      setErrorMessage("Registration failed!");
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

        <button type="submit" className={styles.submitButton}>
          Register
        </button>
      </form>
      <div className={styles.OAuthButtonContainer}>
        <button
          className={`${styles.button} ${styles.googleButton}`}
          onClick={handleGoogleLogin}
        >
          <FcGoogle />
          Login with Google
        </button>
        <button
          className={`${styles.button} ${styles.githubButton}`}
          onClick={handleGithubLogin}
        >
          <FaGithub />
          Login with Github
        </button>
      </div>
    </div>
  );
};

export default Signup;
