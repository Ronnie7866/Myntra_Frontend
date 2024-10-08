import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FaShoppingCart, FaStar, FaChevronDown, FaChevronUp, FaTruck, FaBox } from "react-icons/fa";
import { fetchProductImage } from "../../store/slices/imageSlice";
import { addToBag } from "../../store/slices/bagSlice";
import styles from "./ProductPage.module.css";

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showSizes, setShowSizes] = useState(false);
  const [showColors, setShowColors] = useState(false);
  const imageURL = useSelector((store) => store.images[id]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
        if (!imageURL) {
          dispatch(fetchProductImage(id));
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    fetchProduct();
  }, [id, imageURL, dispatch]);

  const handleAddToCart = () => {
    if (selectedSize && selectedColor) {
      dispatch(addToBag({ userId: 1, productId: product.id, quantity }));
    } else {
      alert("Please select a size and color");
    }
  };

  if (!product) {
    return <div className={styles.loading}>Loading...</div>;
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
            alt={product.name}
            className={styles.productImage}
          />
        </motion.div>
        <motion.div
          className={styles.detailsWrapper}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className={styles.productTitle}>{product.name}</h1>
          <p className={styles.productDescription}>{product.description}</p>
          <div className={styles.priceWrapper}>
  <span className={styles.productPrice}>₹{product.price.toFixed(2)}</span>
  {product.discountPercentage > 0 && (
    <span className={styles.discount}>{product.discountPercentage}% OFF</span>
  )}
</div>
          <div className={styles.ratingWrapper}>
            <div className={styles.starRating}>
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={i < Math.floor(product.rating) ? styles.starFilled : styles.starEmpty}
                />
              ))}
            </div>
            <span className={styles.reviewCount}>{product.reviewCount} reviews</span>
          </div>
          <div className={styles.optionWrapper}>
            <div className={styles.dropdownWrapper} onClick={() => setShowSizes(!showSizes)}>
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
                  {(product.sizes || []).map((size) => (
                    <div
                      key={size}
                      className={styles.dropdownItem}
                      onClick={() => {
                        setSelectedSize(size);
                        setShowSizes(false);
                      }}
                    >
                      {size}
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
            <div className={styles.dropdownWrapper} onClick={() => setShowColors(!showColors)}>
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
                  {(product.colors || []).map((color) => (
                    <div
                      key={color}
                      className={styles.dropdownItem}
                      onClick={() => {
                        setSelectedColor(color);
                        setShowColors(false);
                      }}
                    >
                      {color}
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
            Buy Now
          </motion.button>
          <div className={styles.additionalInfo}>
            <h2 className={styles.sectionTitle}>Product Details</h2>
            <p><strong>Brand:</strong> {product.brand}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Material:</strong> {product.material}</p>
            <p><strong>Care Instructions:</strong> {product.careInstructions}</p>
          </div>
          <div className={styles.deliveryInfo}>
            <FaTruck className={styles.infoIcon} />
            <p>Free Delivery on orders over $50</p>
          </div>
          <div className={styles.stockInfo}>
            <FaBox className={styles.infoIcon} />
            <p>{product.stock > 0 ? `In Stock: ${product.stock} available` : 'Out of Stock'}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductPage;