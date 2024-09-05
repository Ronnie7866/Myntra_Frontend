// src/components/InventoryForm.jsx
import React, { useState } from "react";
import axios from "axios";
import styles from "./InventoryForm.module.css";

const InventoryForm = () => {
  const [inventoryData, setInventoryData] = useState({
    productId: "",
    quantity: "",
    location: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInventoryData({ ...inventoryData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/inventory",
        inventoryData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      setSuccessMessage("Inventory updated successfully!");
      console.log("Inventory updated:", response.data);
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
      console.error("Error updating inventory:", error);
    }
  };

  return (
    <div className={styles.inventoryContainer}>
      <h2 className={styles.title}>Update Inventory</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="productId" className={styles.label}>
            Product ID
          </label>
          <input
            type="text"
            id="productId"
            name="productId"
            value={inventoryData.productId}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="quantity" className={styles.label}>
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={inventoryData.quantity}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="location" className={styles.label}>
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={inventoryData.location}
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

export default InventoryForm;
