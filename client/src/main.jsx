import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { AppDataProvider } from './context/AppDataProvider.jsx'
import { CartProvider } from './context/CartContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppDataProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AppDataProvider>
    </BrowserRouter>
  </React.StrictMode>
)
