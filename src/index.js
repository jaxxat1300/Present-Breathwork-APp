import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import PhoneFrame from './PhoneFrame';
import Logo from './Logo';
import './index.css';

const Root = () => {
  const [showLogo, setShowLogo] = useState(true);
  const isDesktop = window.innerWidth > 768;

  if (showLogo) {
    return <Logo onComplete={() => setShowLogo(false)} />;
  }

  return (
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
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);
