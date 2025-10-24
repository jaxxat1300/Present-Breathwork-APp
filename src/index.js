import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import PhoneFrame from './PhoneFrame';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Check if we're on desktop (width > 768px) to show phone frame
const isDesktop = window.innerWidth > 768;

root.render(
  <React.StrictMode>
    {isDesktop ? (
      <PhoneFrame>
        <App />
      </PhoneFrame>
    ) : (
      <App />
    )}
  </React.StrictMode>
);
