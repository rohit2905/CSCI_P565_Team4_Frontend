import React from "react";
import Global from "../Assets/l1.svg";
import Options from "../Assets/l2.svg";
import Simple from "../Assets/l3.svg";

const Work = () => {
  const workInfoData = [
    {
      image: Global,
      title: "Available Globally",
      text: "DeliverWise aims for a worldwide reach, linking delivery stakeholders globally and fostering inclusivity across diverse delivery management landscapes.",
    },
    {
      image: Options,
      title: "Seamless Deliveries",
      text: "With Endless options, Efficiently manage and track deliveries seamlessly online, ensuring swift and secure shipping for your packages, no matter where they're headed.",
    },
    {
      image: Simple,
      title: "Simple and Adaptable",
      text: "Empower recipients to steer their delivery journey by effortlessly managing information, choosing delivery options, and scheduling arrivals, all within a unified platform.",
    },
  ];
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Features</p>
        <h1 className="primary-heading">What We Offer</h1>
        <p className="primary-text">
          Discover Our Features: Streamlined, Efficient, Reliable
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export {Work}