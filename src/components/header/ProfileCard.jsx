import React from "react";
import styles from "./ProfileCard.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/slices/authSlice.js";

const ProfileCard = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className={`${styles.card} ${styles.visible}`}>
      <ul className={styles.menu}>
        {isAuthenticated ? (
          <li>
            <button className={styles.logoutButton} onClick={handleLogout}>
              Logout
            </button>
            {/* Change to logout button */}
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
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
