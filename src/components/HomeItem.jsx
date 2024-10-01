/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { bagActions } from "../store/slices/bagSlice.js";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { useEffect } from "react";
import { fetchProductImage } from "../store/slices/imageSlice.js";
import { Link, useNavigate } from "react-router-dom";
import styles from "../components/HomeItem.module.css"; // Importing the CSS module

export default function HomeItem({ item }) {
  const bagItems = useSelector((store) => store.bag);
  const imageURL = useSelector((store) => store.images[item.id]);
  const elementFound = bagItems.indexOf(item.id) >= 0; // returns -1 if element not found
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // If image is not in the store, only then fetch it
    if (!imageURL) {
      dispatch(fetchProductImage(item.id));
    }
  }, [item.id, imageURL, dispatch]);

  const handleAddToBag = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      dispatch(bagActions.addToBag(item.id));
    }
  };

  const handleRemove = () => {
    dispatch(bagActions.removeFromBag(item.id));
  };

  return (
      <div className={styles.itemContainer}>
        <Link to={`product/${item.id}`} className={styles.link}>
          <img className={styles.itemImage} src={imageURL} alt="item" />
          <div className={styles.rating}>
            {/* Display rating stars */}
            {/* {item.rating.stars} ⭐ | {item.rating.count} reviews */}
          </div>
          <div className={styles.companyName}>{item.brand}</div>
          <div className={styles.itemName}>{item.name}</div>
          <div className={styles.price}>
            <span className={styles.currentPrice}>Rs {item.price}</span>
            <span className={styles.originalPrice}>Rs {item.originalPrice}</span>
            <span className={styles.discount}>({item.discountedPercentage}% OFF)</span>
          </div>
        </Link>
        {elementFound ? (
            <button
                type="button"
                className={`${styles.btnAddBag} ${styles.btnDanger}`}
                onClick={handleRemove}
            >
              <MdDeleteForever />
              Remove
            </button>
        ) : (
            <button
                type="button"
                className={`${styles.btnAddBag} ${styles.btnSuccess}`}
                onClick={handleAddToBag}
            >
              <IoMdAdd />
              Add to Bag
            </button>
        )}
      </div>
  );
}
