import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { AuthProvider } from './context/AuthContext.js';
import { CartProvider } from './context/CartContext.js';
import { WishlistProvider } from './context/WishlistContext.js';
import { SearchProvider } from './context/SearchContext.js';
import { OrderProvider } from './context/OrderContext.js'; // ✅ Import OrderProvider

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
 
      <CartProvider>
        <WishlistProvider>
          <SearchProvider>
            <OrderProvider> {/* ✅ Wrap OrderProvider here */}
              <App />
            </OrderProvider>
          </SearchProvider>
        </WishlistProvider>
      </CartProvider>
    
  </React.StrictMode>
);

reportWebVitals();
