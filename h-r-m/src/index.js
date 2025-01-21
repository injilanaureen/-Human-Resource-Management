import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import AppRouters from './appRouter';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root
root.render(
  <React.StrictMode>
    <AppRouters />  // Render the AppRouters component to the root element
  </React.StrictMode>
);
