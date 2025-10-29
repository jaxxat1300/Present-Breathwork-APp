import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Website from './Website';
import PhoneFrame from './PhoneFrame';
import App from './App';
import './index.css';

const Root = () => {
  const [showWebsite, setShowWebsite] = useState(true);

  if (showWebsite) {
    return <Website onTryApp={() => setShowWebsite(false)} />;
  }

  return (
    <div className="demo-container">
      <div className="demo-header">
        <button onClick={() => setShowWebsite(true)} className="back-to-site-btn">
          ← Back to Website
        </button>
        <h2>Present Breathwork - Interactive Demo</h2>
        <p>Try the full app experience below</p>
      </div>
      <PhoneFrame>
        <App />
      </PhoneFrame>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
