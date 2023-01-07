import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './fonts/Tungsten-Bold.ttf'
import { AppThemeProvider } from './themes/ThemeProvider';
import { DrawerProvider } from './contexts/DrawerContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppThemeProvider>
      <DrawerProvider>
        <App />
      </DrawerProvider>
    </AppThemeProvider>
  </React.StrictMode>,
);
