import React, { useState } from "react";
import { FcBusinesswoman, FcLike } from "react-icons/fc";
import { FaShoppingBag } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileCard from "./ProfileCard";
import SearchBar from "../SearchBar";

export default function Header() {
  const bag = useSelector((store) => store.bag);
  const [isProfileCardVisible, setIsProfileCardVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsProfileCardVisible(true);
  };

  const handleMouseLeave = () => {
    setIsProfileCardVisible(false);
  };

  return (
    <header className="header-fix">
      <div className="logo_container">
        <Link to="/">
          <img
            className="myntra_home"
            src="/images/myntra_logo.webp"
            alt="Myntra Home"
          />
        </Link>
      </div>
      <nav className="nav_bar">
        <a href="#">Men</a>
        <a href="#">Women</a>
        <a href="#">Kids</a>
        <a href="#">Home & Living</a>
        <a href="#">Beauty</a>
        <a href="#">
          Studio <sup>New</sup>
        </a>
      </nav>
      <SearchBar />
      <div className="action_bar">
        {/* Profile Container with hover detection */}
        <div
          className="action_container"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ position: "relative" }}
        >
          <FcBusinesswoman />
          <span className="action_name">Profile</span>

          {/* Conditional rendering of ProfileCard */}
          {isProfileCardVisible && (
            <div style={{ position: "absolute", top: "100%", right: "0" }}>
              <ProfileCard />
            </div>
          )}
        </div>

        <div className="action_container">
          <FcLike />
          <span className="action_name">Wishlist</span>
        </div>

        <Link className="action_container" to="bag">
          <FaShoppingBag />
          <span className="action_name">Bag</span>
          <span className="bag-item-count">{bag.length}</span>
        </Link>
      </div>
    </header>
  );
}
