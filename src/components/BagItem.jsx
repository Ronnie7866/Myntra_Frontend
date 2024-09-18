import { useDispatch } from "react-redux";
import { RiDeleteBinFill } from "react-icons/ri";
import { bagActions } from "../store/slices/bagSlice.js";

const dispatch = useDispatch();
export default function BagItem({ item }) {
  const dispatch = useDispatch();
  const handleRemoveItem = () => {
    dispatch(bagActions.removeFromBag(item.id));
  };

  return (
    <div className="bag-item-container">
      <div className="item-left-part">
        <img className="bag-item-img" src={`/images/${item.imageURL}`} />
      </div>
      <div className="item-right-part">
        <div className="company">{item.brand}</div>
        <div className="item-name">{item.name}</div>
        <div className="price-container">
          <span className="current-price">Rs {item.price}</span>
          <span className="original-price">Rs {item.price}</span>
          <span className="discount-percentage">
            ({item.discount_percentage}% OFF)
          </span>
        </div>
        <div className="return-period">
          <span className="return-period-days">{item.returnPeriod} days</span>{" "}
          return available
        </div>
        <div className="delivery-details">
          Delivery by
          <span className="delivery-details-days">{item.delivery_date}</span>
        </div>
      </div>

      <div className="remove-from-cart" onClick={handleRemoveItem}>
        <RiDeleteBinFill />
      </div>
    </div>
  );
}
