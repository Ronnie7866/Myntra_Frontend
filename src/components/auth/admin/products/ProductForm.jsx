import React, { useEffect, useState } from "react";
import styles from "./ProductForm.module.css";
import axiosInstance from "../../../../utils/api";
import { useNavigate } from "react-router-dom"; // Import for navigation after product creation

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    stockQuantity: "",
    averageRating: "",
    availability: "",
    categoryId: "",
    size:"",
    color: "",
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/api/category");
        setCategories(response.data);
      } catch (err) {
        setError("Failed to fetch categories.");
        console.log("Error Occurred: ", err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/api/products", formData);
      setSuccess("Product added successfully!");
      setError(null);
      setFormData({
        name: "",
        price: "",
        description: "",
        stockQuantity: "",
        averageRating: "",
        availability: "",
        categoryId: "",
        size: "",
        color: "",
      });
      // Navigate to image upload page with the new product's ID
      const productId = response.data.id; // Assuming the ID is returned in the response
      navigate(`/upload-image/${productId}`);
    } catch (err) {
      setError("Failed to add product. Please try again.");
      setSuccess(null);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Add Product</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Name Field */}
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

        {/* Price Field */}
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

        {/* Description Field */}
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

        {/* Stock Quantity Field */}
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

        {/* Average Rating Field */}
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

        {/* Availability Field */}
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
            <option value="AVAILABLE">In Stock</option>
            <option value="UNAVAILABLE">Out of Stock</option>
          </select>
        </div>

        {/* Category Dropdown */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Category</label>
          <select
            name="categoryId"
            className={styles.input}
            value={formData.categoryId}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" className={styles.submitButton}>
          Add Product
        </button>

        {/* Error and Success Messages */}
        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}
      </form>
    </div>
  );
};

export default ProductForm;
