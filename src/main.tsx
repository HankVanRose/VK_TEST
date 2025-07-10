import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import { ThemeProvider } from '@emotion/react';
import theme from './theme.ts';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>
  </ThemeProvider>
);
