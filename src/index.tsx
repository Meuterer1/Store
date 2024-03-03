import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';

import GlobalStyles from '../components/GlobalStyles';
import App from './App';

import { ThemeProvider } from 'styled-components';
import primaryTheme from '../theme/theme';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Router>
      <ThemeProvider theme={primaryTheme}>
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </Router>,
  );
} else {
  console.error("Element with ID 'root' not found in the document.");
}
