import React from 'react';
import './PhoneFrame.css';

const PhoneFrame = ({ children }) => {
  return (
    <div className="phone-preview-container">
      <div className="phone-frame">
        <div className="phone-notch"></div>
        <div className="phone-speaker"></div>
        <div className="phone-camera"></div>
        <div className="phone-screen">
          {children}
        </div>
        <div className="phone-home-indicator"></div>
      </div>
    </div>
  );
};

export default PhoneFrame;

