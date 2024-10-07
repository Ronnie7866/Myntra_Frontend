import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./SearchBar.module.css"; // Import CSS Module
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length > 2) {
      // Trigger search only if the query length is greater than 2
      axios
        .get(`http://localhost:8080/api/products/suggestions`, {
          params: { query },
        })
        .then((response) => {
          setSuggestions(response.data);
        })
        .catch((error) => {
          console.error("Error fetching suggestions:", error);
        });
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSuggestionClick = (productId) => {
    navigate(`products/${productId}`)
  }

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search for products..."
        className={styles.searchInput}
      />
      {suggestions.length > 0 && (
        <ul className={styles.suggestionsList}>
          {suggestions.map((product) => (
            <li key={product.id} className={styles.suggestionItem} onClick={() => handleSuggestionClick(product.id)}>
              {product.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
