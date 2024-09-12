import React, { useState, useEffect } from "react";
import styles from "./InventoryForm.module.css";
import axiosInstance from "../../../utils/api.js"; // Assuming you're using CSS modules

const InventoryForm = () => {
  const [formData, setFormData] = useState({
    productId: "", // getting this in long
    quantity: "", // getting this in int from backend
  });

  const [products, setProducts] = useState([]); // To store available products
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch products for the dropdown list
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/api/products"); // Fetch products
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Convert productId and quantity to numbers
    const { productId, quantity } = formData;
    try {
      await axiosInstance.post(
        `/api/inventory/${Number(productId)}?stock=${Number(quantity)}`,
      ); // Send inventory data to backend
      setSuccess("Inventory updated successfully!");
      setError(null);
      setFormData({
        productId: "",
        quantity: "",
      });
    } catch (err) {
      setError("Failed to update inventory. Please try again.");
      setSuccess(null);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Update Inventory</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Product Dropdown */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Product</label>
          <select
            name="productId"
            className={styles.input}
            value={formData.productId}
            onChange={handleChange}
            required
          >
            <option value="">Select Product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        {/* Quantity Field */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Quantity</label>
          <input
            type="number"
            name="quantity"
            className={styles.input}
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className={styles.submitButton}>
          Update Inventory
        </button>

        {/* Error and Success Messages */}
        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}
      </form>
    </div>
  );
};

export default InventoryForm;
