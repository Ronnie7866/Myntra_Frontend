import React, { useState } from "react";
import styles from "./CategoryForm.module.css";
import axiosInstance from "../../utils/api.js";

const CategoryForm = () => {
  const [categoryData, setCategoryData] = useState({
    name: "",
    description: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({ ...categoryData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axiosInstance.post("/api/category", categoryData);
      setSuccessMessage("Category saved successfully!");
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
      console.error("Error saving category:", error);
    }
  };

  return (
    <div className={styles.categoryContainer}>
      <h2 className={styles.title}>Add or Update Category</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={categoryData.name}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={categoryData.description}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Submit
        </button>

        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        {successMessage && <p className={styles.success}>{successMessage}</p>}
      </form>
    </div>
  );
};

export default CategoryForm;
