import React, { useState } from "react";
import axiosObject from "../auth/axiosInstance.js";
import styles from "./ProductForm.module.css";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    imageUrl: "",
    stockQuantity: "",
    averageRating: "",
    availability: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosObject.post("/products", formData); // Use the axios instance
      setSuccess("Product added successfully!");
      setError(null);
      setFormData({
        name: "",
        price: "",
        description: "",
        imageUrl: "",
        stockQuantity: "",
        averageRating: "",
        availability: "",
      });
    } catch (err) {
      setError("Failed to add product. Please try again.");
      setSuccess(null);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Add Product</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Name</label>
          <input
            type="text"
            name="name"
            className={styles.input}
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Price</label>
          <input
            type="text"
            name="price"
            className={styles.input}
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Description</label>
          <textarea
            name="description"
            className={styles.input}
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Image URL</label>
          <input
            type="text"
            name="imageUrl"
            className={styles.input}
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Stock Quantity</label>
          <input
            type="number"
            name="stockQuantity"
            className={styles.input}
            value={formData.stockQuantity}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Average Rating</label>
          <input
            type="number"
            name="averageRating"
            className={styles.input}
            value={formData.averageRating}
            onChange={handleChange}
            step="0.1"
            min="0"
            max="5"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Availability</label>
          <select
            name="availability"
            className={styles.input}
            value={formData.availability}
            onChange={handleChange}
            required
          >
            <option value="">Select Availability</option>
            <option value="IN_STOCK">In Stock</option>
            <option value="OUT_OF_STOCK">Out of Stock</option>
          </select>
        </div>
        <button type="submit" className={styles.submitButton}>
          Add Product
        </button>
        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}
      </form>
    </div>
  );
};

export default ProductForm;
