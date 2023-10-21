import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import './styles/index.scss';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
} else {
  console.error("Element with ID 'root' not found in the document.");
}
