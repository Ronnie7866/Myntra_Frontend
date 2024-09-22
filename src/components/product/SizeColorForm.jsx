import { useState } from "react";
import styles from "./SizeColorForm.module.css"; // Import CSS module
import { showErrorToast, showSuccessToast } from "../../utils/toastify";

export default function SizeColorForm() {
  const [newSize, setNewSize] = useState("");
  const [newColor, setNewColor] = useState("");

  const handleSizeSubmit = async (e) => {
    e.preventDefault();
    if (newSize) {
      await addSize(newSize);
      setNewSize("");
    }
  };

  const handleColorSubmit = async (e) => {
    e.preventDefault();
    if (newColor) {
      await addColor(newColor);
      setNewColor("");
    }
  };

  // Functions for adding size and color
  const addSize = async (newSize) => {
    try {
      const response = await fetch("http://localhost:8080/api/sizes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newSize }),
      });
      const data = await response.json();
      showSuccessToast("Size added:", data);
    } catch (error) {
      showErrorToast("Failed to add size:", error);
    }
  };

  const addColor = async (newColor) => {
    try {
      const response = await fetch("http://localhost:8080/api/colors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newColor }),
      });
      const data = await response.json();
      showSuccessToast("Color added:", data);
    } catch (error) {
      showErrorToast("Failed to add color:", error);
    }
  };

  return (
    <div className={styles["form-container"]}>
      {/* Form for adding new size */}
      <form onSubmit={handleSizeSubmit}>
        <label htmlFor="sizeInput" className={styles["form-label"]}>
          Add Size:
        </label>
        <input
          type="text"
          id="sizeInput"
          value={newSize}
          onChange={(e) => setNewSize(e.target.value)}
          placeholder="Enter new size"
          className={styles["form-input"]}
        />
        <button type="submit" className={styles["form-button"]}>
          Add Size
        </button>
      </form>

      {/* Form for adding new color */}
      <form onSubmit={handleColorSubmit}>
        <label htmlFor="colorInput" className={styles["form-label"]}>
          Add Color:
        </label>
        <input
          type="text"
          id="colorInput"
          value={newColor}
          onChange={(e) => setNewColor(e.target.value)}
          placeholder="Enter new color"
          className={styles["form-input"]}
        />
        <button type="submit" className={styles["form-button"]}>
          Add Color
        </button>
      </form>
    </div>
  );
}
