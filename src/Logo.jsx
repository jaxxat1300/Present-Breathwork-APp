import React, { useEffect, useState } from 'react';
import './Logo.css';

const Logo = ({ onComplete }) => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
      setTimeout(() => {
        onComplete();
      }, 600);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`logo-screen ${!isAnimating ? 'fade-out' : ''}`}>
      <div className="logo-container">
        <div className="breathing-animation">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <div className="circle circle-3"></div>
          <div className="logo-center">
            <svg viewBox="0 0 100 100" className="logo-icon">
              <circle cx="50" cy="50" r="40" className="logo-circle" />
              <path 
                d="M 30 50 Q 50 30, 70 50 T 70 70" 
                className="breath-path"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
        <h1 className="logo-title">Present Breathwork</h1>
        <p className="logo-subtitle">Find Your Calm</p>
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default Logo;

