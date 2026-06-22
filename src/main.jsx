import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';
import './styles/macos-overrides.css';

function LoadingScreen() {
  return (
    <div className="loading-screen loading-screen--macos" role="status" aria-label="Loading">
      <div className="loading-screen-inner">
        <img src="/icons/dock/apple-loading.svg" className="loading-screen-logo" alt="" aria-hidden="true" />
        <div className="loading-screen-bar" aria-hidden="true">
          <div className="loading-screen-bar-fill" />
        </div>
      </div>
    </div>
  );
}

function Root() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 2000);
    return () => window.clearTimeout(timer);
  }, []);

  return isLoading ? <LoadingScreen /> : <App />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
