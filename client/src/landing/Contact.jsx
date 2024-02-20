import React from "react";

const Contact = () => {
    const redirectToEmail = () => {
    const emailAddress = 'deliverwise@gmail.com';
    const mailtoLink = `mailto:${emailAddress}`;
    window.location.href = mailtoLink;
  };
  return (
    <div className="contact-page-wrapper">
      <h1 className="primary-heading">Have Questions In Mind?</h1>
      <h1 className="primary-heading">Let Us Help You</h1>
        <button className="secondary-button" onClick={redirectToEmail}>Write to us here!</button>
    </div>
  );
};

export {Contact}