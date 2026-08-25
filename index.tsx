
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Prerendered HTML exists purely for crawlers/direct-link static serving, not for
// hydration: several components (lazy-loaded routes, viewport-dependent animations)
// are non-deterministic between the prerender snapshot and a fresh client render, which
// makes hydrateRoot() throw mismatch errors. A plain client render replaces that
// snapshot outright and is what we want here either way.
const root = ReactDOM.createRoot(rootElement);
root.render(app);
