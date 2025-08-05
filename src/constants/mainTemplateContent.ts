const MAIN_FILE_CONTENT = `
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'; 
~~react-router-import~~
~~react-query-import~~
~~mui-import~~
~~mui-theme-import~~
~~antd-import~~

import App from './App'; 
import './index.css';

~~query-client-declaration~~

createRoot(document.getElementById('root')~~main-ts-non-null~~).render(
  <StrictMode>
    ~~query-client-provider-open~~
      ~~mui-style-engine-open-tag~~
        ~~mui-open-tag~~
          ~~antd-config-provider-open-tag~~
            ~~router-open-tag~~
                <App />
            ~~router-close-tag~~
          ~~antd-config-provider-close-tag~~
        ~~mui-close-tag~~
      ~~mui-style-engine-close-tag~~
    ~~query-client-provider-close~~
  </StrictMode>
);
`;

export default MAIN_FILE_CONTENT;
