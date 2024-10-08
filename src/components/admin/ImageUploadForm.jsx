import React, { useState } from "react";
import styles from "./ImageUploadForm.module.css";
import axiosInstance from "../../utils/api.js";
import {useNavigate, useParams} from "react-router-dom";
import {showErrorToast, showSuccessToast} from "../../utils/toastify.js";

const ImageUploadForm = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); // extract the productId form the url

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please choose a file before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("productId", id);

    try {
      await axiosInstance.post("/api/s3", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess("Image uploaded successfully!");
      showSuccessToast("Image upload successfully!");
      setError(null);
      setFile(null); // Reset the file input
      navigate(`/product-form`);
    } catch (err) {
      setError("Failed to upload the image. Please try again.");
      setSuccess(null);
      showErrorToast("An error occurred while uploading image", err);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Upload Product Image</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* File Input */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Select Image</label>
          <input
            type="file"
            name="file"
            accept="image/*"
            className={styles.input}
            onChange={handleFileChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className={styles.submitButton}>
          Upload Image
        </button>

        {/* Error and Success Messages */}
        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}
      </form>
    </div>
  );
};

export default ImageUploadForm;
