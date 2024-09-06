import React from "react";
import styles from "./ProfileCard.module.css";
import { Link } from "react-router-dom";

const ProfileCard = () => {
  return (
    <div className={`${styles.card} ${styles.visible}`}>
      <ul className={styles.menu}>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
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
