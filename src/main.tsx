import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './main.css';
import { AppThemeProvider } from './themes/ThemeProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppThemeProvider>
      <App />
    </AppThemeProvider>
  </React.StrictMode>,
);
