import React from "react";
import BannerBackground from "../Assets/home-banner-background.png";
import BannerImage from "../Assets/main.svg";
import { FiArrowRight } from "react-icons/fi";

const Home1 = () => {
  return (
    <div className="home-container">
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            <b>Your Trusted Delivery Partner Test</b>
          </h1>
          <p className="primary-text">
            Experience Seamless Global Deliveries With Our One-Stop-Shop Delivery Management System, Where Every Package Finds Its Perfect Journey!
          </p>
          <button className="secondary-button">
            Get Started <FiArrowRight />{" "}
          </button>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export {Home1}