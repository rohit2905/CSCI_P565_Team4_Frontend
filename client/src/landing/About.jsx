import React from "react";
import AboutBackground from "../Assets/about-background.png";
import AboutBackgroundImage from "../Assets/main2.svg";
import { BsFillPlayCircleFill } from "react-icons/bs";

const About = () => {
  return (
    <div className="about-section-container">
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </div>
      <div className="about-section-image-container">
        <img src={AboutBackgroundImage} alt="" />
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading">About</p>
        <h1 className="primary-heading">
          <b>DeliverWise offers everything you need</b>
        </h1>
        <p className="primary-text">
         We offer streamlines worldwide shipping, offering customers a wide range of services to choose from including UPS, USPS, FedEx, and more. With intuitive order placement, real-time tracking, and comprehensive review capabilities, it's your ultimate solution for hassle-free deliveries.
        </p>
      </div>
    </div>
  );
};

export {About}