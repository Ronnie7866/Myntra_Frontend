import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBinFill } from "react-icons/ri";
import { bagActions } from "../store/slices/bagSlice.js";
import { useEffect } from "react";
import { fetchProductImage } from "../store/slices/imageSlice.js";
import styles from "../components/BagItem.module.css"; // Updated import for styles

export default function BagItem({ item }) {
  const dispatch = useDispatch();
  const imageURL = useSelector((store) => store.images[item.id]);

  const handleRemoveItem = () => {
    dispatch(bagActions.removeFromBag(item.id));
  };

  useEffect(() => {
    // If image is not in the store, only then fetch it
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
