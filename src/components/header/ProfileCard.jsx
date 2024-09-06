import React from "react";
import styles from "./ProfileCard.module.css";

const ProfileCard = () => {
  return (
    <div className={`${styles.card} ${styles.visible}`}>
      <ul className={styles.menu}>
        <li>
          <a href="/login">Login</a>
        </li>
        <li>
          <a href="/signup">Signup</a>
        </li>
        <li>
          <a href="/orders">Your Orders</a>
        </li>
        <li>
          <a href="/wishlist">Wishlist</a>
        </li>
        <li>
          <a href="/contact">Contact Us</a>
        </li>
      </ul>
    </div>
  );
};

export default ProfileCard;
