import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/*
PACKAGES USED:
1. npm install react-router-dom (page navigation)
2. npm install firebase (backend stuff)
3. npm install react-firebase-hooks
4. npm install react-hook-form yup @hookform/resolvers (forms)
5. 
*/