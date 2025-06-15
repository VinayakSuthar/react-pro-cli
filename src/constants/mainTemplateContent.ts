const MAIN_FILE_CONTENT = `
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'; 
import { BrowserRouter as Router } from 'react-router-dom';
~~mui-import~~
~~mui-theme-import~~

import App from './App'; 
import './index.css';

createRoot(document.getElementById('root')~~main-ts-non-null~~).render(
  <StrictMode>
    ~~mui-style-engine-open-tag~~
      ~~mui-open-tag~~
        <Router>
          <App />
        </Router>
      ~~mui-close-tag~~
    ~~mui-style-engine-close-tag~~
  </StrictMode>
);
`;

export default MAIN_FILE_CONTENT;
