import React, { useEffect, useState } from "react";
import styles from "./ProductForm.module.css";
import axiosInstance from "../../utils/api.js";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../utils/toastify.js";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    discountedPercentage: "",
    currentPrice: "",
    returnPeriod: "",
    description: "",
    stockQuantity: "",
    averageRating: "",
    availability: "",
    categoryId: "",
    size: "",
    color: "",
    deliveryDate: "",
    brand: "", // New field for brand
  });

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

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

    // Update formData state
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Calculate current price if price or discounted percentage changes
    if (name === "price" || name === "discountedPercentage") {
      const price = parseFloat(value) || 0; // Use the current value instead of prevData
      const discount = parseFloat(formData.discountedPercentage) || 0;

      // If price or discount percentage is updated, calculate the current price
      if (name === "price") {
        const discountedPrice = price - (price * discount) / 100;
        setFormData((prevData) => ({
          ...prevData,
          currentPrice: discountedPrice.toFixed(2),
        }));
      } else if (name === "discountedPercentage") {
        const discountedPrice = parseFloat(formData.price) - (parseFloat(formData.price) * value) / 100;
        setFormData((prevData) => ({
          ...prevData,
          currentPrice: discountedPrice.toFixed(2),
        }));
      }
    }
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
        discountedPercentage: "",
        currentPrice: "",
        returnPeriod: "",
        description: "",
        stockQuantity: "",
        averageRating: "",
        availability: "",
        categoryId: "",
        size: "",
        color: "",
        deliveryDate: "",
        brand: "", // Reset brand field
      });
      const productId = response.data.id;
      navigate(`/upload-image/${productId}`);
      showSuccessToast("Product Uploaded successfully!");
    } catch (err) {
      setError("Failed to add product. Please try again.");
      setSuccess(null);
      showErrorToast("An error occurred!", err);
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

          {/* Discounted Percentage Field */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Discounted Percentage (%)</label>
            <input
                type="number"
                name="discountedPercentage"
                className={styles.input}
                value={formData.discountedPercentage}
                onChange={handleChange}
                min="0"
                max="100"
            />
          </div>

          {/* Current Price Field */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Current Price</label>
            <input
                type="text"
                name="currentPrice"
                className={styles.input}
                value={formData.currentPrice}
                readOnly
            />
          </div>

          {/* Brand Field */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Brand</label>
            <input
                type="text"
                name="brand"
                className={styles.input}
                value={formData.brand}
                onChange={handleChange}
                required
            />
          </div>

          {/* Return Period Field */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Return Period</label>
            <input
                type="text"
                name="returnPeriod"
                className={styles.input}
                value={formData.returnPeriod}
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

          {/* Delivery Date Field */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Delivery Date</label>
            <input
                type="date"
                name="deliveryDate"
                className={styles.input}
                value={formData.deliveryDate}
                onChange={handleChange}
                required
            />
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
