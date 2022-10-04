import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ColorModeScript } from '@chakra-ui/react';
import App from './components/App';
import { ContextAllProvider } from './components/ContextAll';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ColorModeScript />
    <ContextAllProvider>
      <App />
    </ContextAllProvider>

  </StrictMode>,
);
