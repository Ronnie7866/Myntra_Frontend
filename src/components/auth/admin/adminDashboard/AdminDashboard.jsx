import React, { useState } from "react";
import ProductForm from "../../../auth/admin/products/ProductForm.jsx";
import InventoryForm from "../../../auth/admin/products/InventoryForm.jsx";
import CategoryForm from "../../../auth/admin/products/CategoryForm.jsx";
import styles from "./AdminDashboard.module.css"; // Dashboard CSS

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("product");

  const renderTabContent = () => {
    switch (activeTab) {
      case "product":
        return <ProductForm />;
      case "inventory":
        return <InventoryForm />;
      case "category":
        return <CategoryForm />;
      default:
        return <ProductForm />;
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li
            className={activeTab === "product" ? styles.active : ""}
            onClick={() => setActiveTab("product")}
          >
            Product Management
          </li>
          <li
            className={activeTab === "inventory" ? styles.active : ""}
            onClick={() => setActiveTab("inventory")}
          >
            Inventory Management
          </li>
          <li
            className={activeTab === "category" ? styles.active : ""}
            onClick={() => setActiveTab("category")}
          >
            Category Management
          </li>
        </ul>
      </nav>

      <div className={styles.content}>{renderTabContent()}</div>
    </div>
  );
};

export default AdminDashboard;
