import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FaShoppingCart,
  FaStar,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { motion } from "framer-motion";
import styles from "./ProductPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductImage } from "../../store/slices/imageSlice";
import { bagActions } from "../../store/slices/bagSlice"; // Adjust import path as needed

const ProductPage = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null); // Initialize product state
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showSizes, setShowSizes] = useState(false);
  const [showColors, setShowColors] = useState(false);
  const dispatch = useDispatch();
  const imageURL = useSelector((store) => store.images[id]);

  useEffect(() => {
    // Fetch product data when component mounts or ID changes
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/products/${id}`
        );
        const data = await response.json();
        setProduct(data); // Set product data to state
        if (!imageURL) {
          dispatch(fetchProductImage(id));
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    const fetchSizesAndColors = async () => {
      try {
        const sizesResponse = await fetch("http://localhost:8080/api/sizes");
        const colorsResponse = await fetch("http://localhost:8080/api/colors");
        const sizesData = await sizesResponse.json();
        const colorsData = await colorsResponse.json();
        setSizes(sizesData);
        setColors(colorsData);
        console.log("Fetching Color and size");
        console.log(sizes);
        console.log(colors);
      } catch (error) {
        console.error("Failed to fetch sizes or colors:", error);
      }
    };

    fetchProduct();
    fetchSizesAndColors();
  }, [id, imageURL, dispatch]);

  const handleAddToCart = () => {
    dispatch(
      bagActions.addToBag(id, {
        size: selectedSize,
        color: selectedColor,
        quantity,
      })
    );
    console.log("Added to cart:", {
      product: product.name,
      size: selectedSize,
      color: selectedColor,
      quantity,
    });
  };

  const addSize = async (newSize) => {
    try {
      const response = await fetch("http://localhost:8080/api/sizes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newSize }),
      });
      const data = await response.json();
      setSizes([...sizes, data]);
    } catch (error) {
      console.error("Failed to add size:", error);
    }
  };

  const addColor = async (newColor) => {
    try {
      const response = await fetch("http://localhost:8080/api/colors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newColor }),
      });
      const data = await response.json();
      setColors([...colors, data]);
    } catch (error) {
      console.error("Failed to add color:", error);
    }
  };

  if (!product) {
    return <div>Loading...</div>; // Handle loading state
  }

  return (
    <div className={styles.container}>
      <div className={styles.flexContainer}>
        <motion.div
          className={styles.imageWrapper}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={imageURL || product.imageURL}
            alt={product.title}
            className={styles.productImage}
          />
        </motion.div>
        <motion.div
          className={styles.detailsWrapper}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className={styles.productTitle}>{product.title}</h1>
          <p className={styles.productDescription}>{product.description}</p>
          <div className={styles.priceWrapper}>
            <span className={styles.productPrice}>
              ${product.price.toFixed(2)}
            </span>
            {product.discount > 0 && (
              <>
                <span className="text-lg text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
                <span className="ml-2 text-green-500 font-semibold">
                  {product.discount}% OFF
                </span>
              </>
            )}
          </div>
          <div className={styles.ratingWrapper}>
            <div className={styles.starRating}>
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={
                    i < Math.floor(product.rating)
                      ? styles.starFilled
                      : styles.starEmpty
                  }
                />
              ))}
            </div>
            <span className={styles.reviewCount}>
              {product.reviews} reviews
            </span>
          </div>
          {/* Dropdowns for size and color selection */}
          <div className={styles.optionWrapper}>
            <div
              className={styles.dropdownWrapper}
              onClick={() => setShowSizes(!showSizes)}
            >
              <button className={styles.dropdownButton}>
                {selectedSize || "Select Size"}
                {showSizes ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {showSizes && (
                <motion.div
                  className={styles.dropdownMenu}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {sizes.map((sizeObj) => (
                    <div
                      key={sizeObj.id}
                      className={styles.dropdownItem}
                      onClick={() => {
                        setSelectedSize(sizeObj.name);
                        setShowSizes(false);
                      }}
                    >
                      {sizeObj.name}
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
          <div className={styles.optionWrapper}>
            <div
              className={styles.dropdownWrapper}
              onClick={() => setShowColors(!showColors)}
            >
              <button className={styles.dropdownButton}>
                {selectedColor || "Select Color"}
                {showColors ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {showColors && (
                <motion.div
                  className={styles.dropdownMenu}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {colors.map((colorObj) => (
                    <div
                      key={colorObj.id}
                      className={styles.dropdownItem}
                      onClick={() => {
                        setSelectedColor(colorObj.name);
                        setShowColors(false);
                      }}
                    >
                      {colorObj.name22}
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
          <div className={styles.quantityWrapper}>
            <button
              className={styles.quantityButton}
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              -
            </button>
            <span className={styles.quantityDisplay}>{quantity}</span>
            <button
              className={styles.quantityButton}
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
          <motion.button
            className={styles.addToCartButton}
            onClick={handleAddToCart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaShoppingCart className={styles.cartIcon} />
            Add to Cart
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductPage;

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import {
//   FaShoppingCart,
//   FaStar,
//   FaChevronDown,
//   FaChevronUp,
// } from "react-icons/fa";
// import { motion } from "framer-motion";
// import styles from "./ProductPage.module.css";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProductImage } from "../../store/slices/imageSlice";
// import { bagActions } from "../../store/slices/bagSlice";

// const ProductPage = () => {
//   const { id } = useParams(); // Get the product ID from the URL
//   const [product, setProduct] = useState(null); // Initialize product state
//   const [sizes, setSizes] = useState([]);
//   const [colors, setColors] = useState([]);
//   const [selectedSize, setSelectedSize] = useState("");
//   const [selectedColor, setSelectedColor] = useState("");
//   const [quantity, setQuantity] = useState(1);
//   const [showSizes, setShowSizes] = useState(false);
//   const [showColors, setShowColors] = useState(false);
//   const dispatch = useDispatch();
//   const imageURL = useSelector((store) => store.images[id]);

//   useEffect(() => {
//     // Fetch product data when component mounts or ID changes
//     const fetchProduct = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:8080/api/products/${id}`
//         );
//         const data = await response.json();
//         setProduct(data); // Set product data to state
//         if (!imageURL) {
//           dispatch(fetchProductImage(id));
//         }
//       } catch (error) {
//         console.error("Failed to fetch product:", error);
//       }
//     };

//     const fetchSizesAndColors = async () => {
//       try {
//         const sizesResponse = await fetch("http://localhost:8080/api/sizes");
//         const colorsResponse = await fetch("http://localhost:8080/api/colors");
//         const sizesData = await sizesResponse.json();
//         const colorsData = await colorsResponse.json();
//         setSizes(sizesData);
//         setColors(colorsData);
//       } catch (error) {
//         console.error("Failed to fetch sizes or colors:", error);
//       }
//     };

//     fetchProduct();
//     fetchSizesAndColors();
//   }, [id, imageURL, dispatch]);

//   const handleAddToCart = () => {
//     dispatch(
//       bagActions.addToBag(id, {
//         size: selectedSize,
//         color: selectedColor,
//         quantity,
//       })
//     );
//     console.log("Added to cart:", {
//       product: product.name,
//       size: selectedSize,
//       color: selectedColor,
//       quantity,
//     });
//   };

//   const addSize = async (newSize) => {
//     try {
//       const response = await fetch("http://localhost:8080/api/sizes", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ name: newSize }),
//       });
//       const data = await response.json();
//       setSizes([...sizes, data]);
//     } catch (error) {
//       console.error("Failed to add size:", error);
//     }
//   };

//   const addColor = async (newColor) => {
//     try {
//       const response = await fetch("http://localhost:8080/api/colors", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ name: newColor }),
//       });
//       const data = await response.json();
//       setColors([...colors, data]);
//     } catch (error) {
//       console.error("Failed to add color:", error);
//     }
//   };

//   if (!product) {
//     return <div>Loading...</div>; // Handle loading state
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.flexContainer}>
//         <motion.div
//           className={styles.imageWrapper}
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <img
//             src={imageURL || product.imageURL}
//             alt={product.title}
//             className={styles.productImage}
//           />
//         </motion.div>
//         <motion.div
//           className={styles.detailsWrapper}
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//         >
//           <h1 className={styles.productTitle}>{product.title}</h1>
//           <p className={styles.productDescription}>{product.description}</p>
//           <div className={styles.priceWrapper}>
//             <span className={styles.productPrice}>
//               ${product.price.toFixed(2)}
//             </span>
//             {product.discount > 0 && (
//               <>
//                 <span className="text-lg text-gray-500 line-through">
//                   ${product.price.toFixed(2)}
//                 </span>
//                 <span className="ml-2 text-green-500 font-semibold">
//                   {product.discount}% OFF
//                 </span>
//               </>
//             )}
//           </div>
//           <div className={styles.ratingWrapper}>
//             <div className={styles.starRating}>
//               {[...Array(5)].map((_, i) => (
//                 <FaStar
//                   key={i}
//                   className={
//                     i < Math.floor(product.rating)
//                       ? styles.starFilled
//                       : styles.starEmpty
//                   }
//                 />
//               ))}
//             </div>
//             <span className={styles.reviewCount}>
//               {product.reviews} reviews
//             </span>
//           </div>
//           {/* Dropdowns for size and color selection */}
//           <div className={styles.optionWrapper}>
//             <div
//               className={styles.dropdownWrapper}
//               onClick={() => setShowSizes(!showSizes)}
//             >
//               <button className={styles.dropdownButton}>
//                 {selectedSize || "Select Size"}
//                 {showSizes ? <FaChevronUp /> : <FaChevronDown />}
//               </button>
//               {showSizes && (
//                 <motion.div
//                   className={styles.dropdownMenu}
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   transition={{ duration: 0.2 }}
//                 >
//                   {(product.sizes || []).map((size) => (
//                     <div
//                       key={size}
//                       className={styles.dropdownItem}
//                       onClick={() => {
//                         setSelectedSize(size);
//                         setShowSizes(false);
//                       }}
//                     >
//                       {size}
//                     </div>
//                   ))}
//                 </motion.div>
//               )}
//             </div>
//           </div>
//           <div className={styles.optionWrapper}>
//             <div
//               className={styles.dropdownWrapper}
//               onClick={() => setShowColors(!showColors)}
//             >
//               <button className={styles.dropdownButton}>
//                 {selectedColor || "Select Color"}
//                 {showColors ? <FaChevronUp /> : <FaChevronDown />}
//               </button>
//               {showColors && (
//                 <motion.div
//                   className={styles.dropdownMenu}
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   transition={{ duration: 0.2 }}
//                 >
//                   {(product.colors || []).map((color) => (
//                     <div
//                       key={color}
//                       className={styles.dropdownItem}
//                       onClick={() => {
//                         setSelectedColor(color);
//                         setShowColors(false);
//                       }}
//                     >
//                       {color}
//                     </div>
//                   ))}
//                 </motion.div>
//               )}
//             </div>
//           </div>
//           <div className={styles.quantityWrapper}>
//             <button
//               className={styles.quantityButton}
//               onClick={() => setQuantity(Math.max(1, quantity - 1))}
//             >
//               -
//             </button>
//             <span className={styles.quantityDisplay}>{quantity}</span>
//             <button
//               className={styles.quantityButton}
//               onClick={() => setQuantity(quantity + 1)}
//             >
//               +
//             </button>
//           </div>
//           <motion.button
//             className={styles.addToCartButton}
//             onClick={handleAddToCart}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <FaShoppingCart className={styles.cartIcon} />
//             Add to Cart
//           </motion.button>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default ProductPage;
