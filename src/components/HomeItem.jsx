import { useDispatch, useSelector } from "react-redux";
import { bagActions } from "../store/slices/bagSlice.js";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { useEffect, useState } from "react";

export default function HomeItem({ item }) {
  const [imageUrl, setImageUrl] = useState("");
  const bagItems = useSelector((store) => store.bag);
  const elementFound = bagItems.indexOf(item.id) >= 0; // returns -1 if element not found

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductImage = async () => {
      try {
        // fetch the image filename from backend
        const response = await fetch(
          `http://localhost:8080/products/${item.id}/image`
        );

        if (!response.ok) {
          throw new Error("Image filename not found");
        }
        const fileName = await response.text();
        // construct the image URL
        setImageUrl(`http://localhost:8080/products/images/${fileName}`);
      } catch (error) {
        console.log("Error fetching product image:", error);
      }
    };
    fetchProductImage();
  }, [item.id]);

  const handleAddToBag = () => {
    dispatch(bagActions.addToBag(item.id));
  };

  const handleRemove = () => {
    dispatch(bagActions.removeFromBag(item.id));
  };

  return (
    <div className="item-container">
      <img className="item-image" src={imageUrl} alt="item image" />
      <div className="rating">
        {item.rating.stars} ⭐ | {item.rating.count}
      </div>
      <div className="company-name">{item.company}</div>
      <div className="item-name">{item.name}</div>
      <div className="price">
        <span className="current-price">Rs {item.currentPrice}</span>
        <span className="original-price">Rs {item.originalPrice}</span>
        <span className="discount">({item.discountedPercentage}% OFF)</span>
      </div>

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
  );
}
