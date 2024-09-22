import { useDispatch, useSelector } from "react-redux";
import { bagActions } from "../store/slices/bagSlice.js";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { useEffect } from "react";
import { fetchProductImage } from "../store/slices/imageSlice.js";
import { Link } from "react-router-dom";

export default function HomeItem({ item }) {
  // const [imageURL, setImageURL] = useState("");
  const bagItems = useSelector((store) => store.bag);
  const imageURL = useSelector((store) => store.images[item.id]);
  const elementFound = bagItems.indexOf(item.id) >= 0; // returns -1 if element not found

  const dispatch = useDispatch();

  useEffect(() => {
    // if image is not is the store only then fetch it
    if (!imageURL) {
      dispatch(fetchProductImage(item.id));
    }
  }, [item.id, imageURL, dispatch]);

  const handleAddToBag = () => dispatch(bagActions.addToBag(item.id));

  const handleRemove = () => {
    dispatch(bagActions.removeFromBag(item.id));
  };
  return (
    <>
      <div className="item-container">
        <Link to={`product/${item.id}`}>
          <img className="item-image" src={imageURL} alt="item image" />
          <div className="rating">
            {/*{item.rating.stars} ⭐ | {item.rating.count}*/}
          </div>
          <div className="company-name">{item.brand}</div>
          <div className="item-name">{item.name}</div>
          <div className="price">
            <span className="current-price">Rs {item.price}</span>
            <span className="original-price">Rs {item.price}</span>
            <span className="discount">({item.discountedPercentage}% OFF)</span>
          </div>
        </Link>
        {elementFound ? (
          <button
            type="button"
            className="btn btn-add-bag btn-danger"
            onClick={handleRemove}
          >
            <MdDeleteForever />
            Remove
          </button>
        ) : (
          <button
            type="button"
            className=" btn btn-add-bag btn-success"
            onClick={handleAddToBag}
          >
            <IoMdAdd />
            Add to Bag
          </button>
        )}
      </div>
    </>
  );
}
