import { useDispatch, useSelector } from "react-redux";
import { bagActions } from "../store/slices/bagSlice.js";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";

export default function HomeItem({ item }) {
  const [imageURL, setImageURL] = useState("");
  const bagItems = useSelector((store) => store.bag);
  const elementFound = bagItems.indexOf(item.id) >= 0; // returns -1 if element not found

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductImage = async () => {
      try {
        // fetch the image filename from backend
        const response = await fetch(
          `http://localhost:8080/api/products/${item.id}`
        );
        if (!response.ok) {
          throw new Error("Image filename not found");
        }
        const product = await response.json();
        const fileName = product.imageURL;

        // Make another request to get the full URL from the backend
git add .        const imageResponse = await fetch(
          `http://localhost:8080/api/s3/${fileName}`
        );
        if (!imageResponse.ok) {
          throw new Error("Image not found");
        }
        const fullImageUrl = await imageResponse.text(); // Expecting backend to return the URL as plain text
        setImageURL(fullImageUrl); // Set the full image URL in state
      } catch (error) {
        console.error("Error fetching product image:", error);
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
  console.log(imageURL);

  return (
    <>
      <div className="item-container">
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

// import React, { useEffect } from "react";
// import axiosInstance from "./utils/api.js";
//
// const HomeItem = () => {
//   const [user, setUser] = React.useState("");
//
//   useEffect(() => {
//     // Fetch user info if logged in
//     const fetchUserInfo = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:8080/api/auth/user-info",
//         );
//         if (response.ok) {
//           const data = await response.json();
//           setUser(data);
//         }
//       } catch (error) {
//         console.error("Failed to fetch user info:", error);
//       }
//     };
//
//     fetchUserInfo();
//   }, []);
//
//   return (
//     <div>
//       <h1>Name:{user.name}</h1>
//       <h1>Email:{user.email}</h1>
//     </div>
//   );
// };
//
// export default HomeItem;
