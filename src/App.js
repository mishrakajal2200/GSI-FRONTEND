
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import { SearchProvider } from './context/SearchContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Shop from './pages/Shop';
import ContactUs from './pages/ContactUs';
import CartPage from './pages/CartPage';
import Footer from './components/Footer';
import WishlistPage from './pages/WishlishtPage.js';
import OrdersPage from './pages/OrdersPage';
import Checkout from './pages/Checkout';
import OrderConfirm from './pages/OrderConfirm';
import Profile from './pages/Profile';
import NearBy from './pages/NearBy.js';
import PrivacyPolicy from './pages/PrivacyPolicy.js';
import ReturnExchangePolicy from './pages/ReturnExchangePolicy.js';
import CompanyInfo from './pages/CompanyInfo.js';
import OrderHistory from './pages/OrderHistory.js';
import TrackOrder from './pages/TrackOrder.js';
import ShippingInfo from './pages/ShippingInfo.js';
import FAQPage from './pages/FAQPage.js';
import SavedAddressesPage from './pages/SavedAddressesPage.js';


import TermsAndConditions from './pages/TermsConditions.js';



// ✅ ProtectedRoute Component
const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem('token');
  return token ? element : <Navigate to="/login" />;
};

function App() {
  
  return (
    <SearchProvider>
      <Router>
        <Navbar />
        <div>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/orders" element={<OrderHistory />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirm" element={<OrderConfirm />} />
            <Route path="/nearby-shops" element={<NearBy />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/returns" element={<ReturnExchangePolicy />} />
            <Route path="/companyinfo" element={<CompanyInfo />} />    
            <Route path="/trackorder" element={<TrackOrder />} />
            <Route path="/shipinginfo" element={<ShippingInfo />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/address" element={<SavedAddressesPage />} />
            <Route path="/terms" element={<TermsAndConditions />} />
           
           

            {/* Protected Routes */}
            <Route
              path="/profile"
              element={<ProtectedRoute element={<Profile />} />}
            />
            <Route
              path="/wishlist"
              element={<ProtectedRoute element={<WishlistPage />} />}
            />
            <Route
              path="/orders"
              element={<ProtectedRoute element={<OrdersPage />} />}
            />
            <Route
              path="/cart"
              element={<ProtectedRoute element={<CartPage />} />}
            />
          </Routes>
        </div>
        <Footer />
      </Router>
    </SearchProvider>
  );
}

export default App;
