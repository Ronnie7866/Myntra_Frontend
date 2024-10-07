import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToBag, removeFromBag } from "../../store/slices/bagSlice.js";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { fetchProductImage } from "../../store/slices/imageSlice.js";
import { Link, useNavigate } from "react-router-dom";
import styles from "./HomeItem.module.css";

export default function HomeItem({ item }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bagItems = useSelector((state) => state.bag.items);
  const imageURL = useSelector((store) => store.images[item.id]);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const elementFound = bagItems.some(bagItem => bagItem.product.id === item.id);

  useEffect(() => {
    if (!imageURL) {
      dispatch(fetchProductImage(item.id));
    }
  }, [item.id, imageURL, dispatch]);

  const handleAddToBag = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      dispatch(addToBag({ userId: user.id, productId: item.id, quantity: 1 }));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromBag({ userId: user.id, productId: item.id, quantity: 1 }));
  };

  return (
    <div className={styles.itemContainer}>
      <Link to={`product/${item.id}`} className={styles.link}>
        <img className={styles.itemImage} src={imageURL} alt={item.name}/>
        <div className={styles.itemDetails}>
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
        </div>
      </Link>
      {elementFound ? (
        <button
          type="button"
          className={`${styles.btnAddBag} ${styles.btnDanger}`}
          onClick={handleRemove}
        >
          <MdDeleteForever/>
          Remove
        </button>
      ) : (
        <button
          type="button"
          className={styles.btnAddBag}
          onClick={handleAddToBag}
        >
          <IoMdAdd/>
          Add to Bag
        </button>
      )}
    </div>
  );
}