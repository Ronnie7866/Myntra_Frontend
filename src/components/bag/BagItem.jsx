import React from 'react';
import { RiDeleteBinFill } from "react-icons/ri";
import { removeFromBag, updateQuantity } from "../../store/slices/bagSlice.js";
import { useEffect } from "react";
import { fetchProductImage } from "../../store/slices/imageSlice.js";
import styles from "./BagItem.module.css";
import { useDispatch, useSelector } from "react-redux";

export default function BagItem({ item, quantity }) {
  const dispatch = useDispatch();
  console.log("Quantity: ", quantity)
  const imageURL = useSelector((store) => store.images[item.id]);
  const user = useSelector((state) => state.auth);
  const userId = user?.user?.id || 1; // Use 1 as default if user id is not available

  const handleRemoveItem = () => {
    dispatch(removeFromBag({ userId, productId: item.id, quantity }));
  };

  const handleIncreaseQuantity = () => {
    if (userId) {
      // Pass the new quantity directly
      dispatch(updateQuantity({ userId, productId: item.id, quantity: quantity + 1 }));
    } else {
      console.error("User ID not found");
    }
  }

  const handleDecreaseQuantity = () => {
    if (userId && quantity > 1) {
      dispatch(updateQuantity({ userId, productId: item.id, quantity: quantity - 1 }));
    } else if (userId && quantity === 1) {
      handleRemoveItem();
    }
  };


  useEffect(() => {
    if (!imageURL) {
      dispatch(fetchProductImage(item.id));
    }
  }, [item.id, imageURL, dispatch]);

  return (
    <div className={styles.bagItemContainer}>
      <div className={styles.itemLeftPart}>
        <img className={styles.bagItemImg} src={imageURL} alt="productImage" />
      </div>
      <div className={styles.itemRightPart}>
        <div className="company">{item.brand}</div>
        <div className="item-name">{item.name}</div>
        <div className="price-container">
          <span className="current-price">Rs {item.price}</span>
          <span className="original-price">Rs {item.currentPrice}</span>
          <span className="discount-percentage">
            ({item.discountedPercentage}% OFF)
          </span>
        </div>

        <div className={styles.quantityControls}>
          <button onClick={handleDecreaseQuantity} disabled={quantity <= 1}>-</button>
          <span>{quantity}</span>
          <button onClick={handleIncreaseQuantity}>+</button>
        </div>

        <div className={styles.returnPeriod}>
          <span className={styles.returnPeriodDays}>{item.returnPeriod} days</span>{" "}
          return available
        </div>
        <div className={styles.deliveryDetails}>
          Delivery by <span className={styles.deliveryDetailsDays}>{item.deliveryDate}</span>
        </div>
      </div>

      <div className={styles.removeFromCart} onClick={handleRemoveItem}>
        <RiDeleteBinFill />
      </div>
    </div>
  );
}