const MAIN_FILE_CONTENT = `
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'; 
~~react-router-import~~
~~react-query-import~~
~~mui-import~~
~~mui-theme-import~~

import App from './App'; 
import './index.css';

~~query-client-declaration~~

createRoot(document.getElementById('root')~~main-ts-non-null~~).render(
  <StrictMode>
    ~~mui-style-engine-open-tag~~
      ~~mui-open-tag~~
        ~~router-open-tag~~
          ~~query-client-provider-open~~
            <App />
          ~~query-client-provider-close~~
        ~~router-close-tag~~
      ~~mui-close-tag~~
    ~~mui-style-engine-close-tag~~
  </StrictMode>
);
`;

export default MAIN_FILE_CONTENT;
