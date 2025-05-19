
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHeart,
  FaShoppingCart,
  FaSearch,
  FaStore,
  FaHome,
  FaUser,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext.js";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const user = true;
  const navigate = useNavigate();
  const { cart, clearCart, setUser } = useCart();
  const { wishlist } = useWishlist();

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  const handleLogout = () => {
    console.log("Logged out");

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id || user?.email;

    if (userId && cart) {
      localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    clearCart && clearCart();
    setUser && setUser(null);

    navigate("/login");
  };

  const handleSearch = async (e) => {
  e.preventDefault();

  const trimmedTerm = searchTerm.trim();

  if (!trimmedTerm) return;  // avoid empty search

  const searchUrl = `https://gsi-backend-production.up.railway.app/api/getproducts/search?query=${encodeURIComponent(trimmedTerm)}`;

  console.log("Fetching search with URL:", searchUrl);

  try {
    const response = await fetch(searchUrl);

    if (response.ok) {
      const result = await response.json();

      if (result.success) {
        console.log("Search results:", result.products);

        // Navigate or set state with results
        navigate(`/shop?search=${encodeURIComponent(trimmedTerm)}`, {
          state: { products: result.products },
        });

        setSearchTerm("");
      } else {
        console.error("Search failed:", result.message);
      }
    } else {
      console.error("Error fetching search results:", response.status);
    }
  } catch (error) {
    console.error("Search error:", error);
  }
};


  return (
    <nav className="bg-black text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 py-3 flex justify-between items-center">
        {/* Logo & Search Bar */}
        <div className="flex items-center space-x-4">
          <img
            src="/images/bhumi.png"
            alt="Logo"
            className="h-9 cursor-pointer rounded-md"
            onClick={() => navigate("/")}
          />

          {/* Desktop Search */}
          <div className="hidden md:block relative ml-4 w-64 lg:w-96 transition-all duration-300">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
              className="w-full border border-gray-600 rounded-full py-1 px-3 bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <button
              onClick={handleSearch}
              className="absolute right-3 top-2 text-gray-400 hover:text-white"
            >
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/nearby-shops"
            className="flex items-center text-white hover:text-gray-300"
          >
            <FaMapMarkerAlt className="mr-1" /> Nearby Shops
          </Link>

          <Link
            to="/shop"
            className="flex items-center text-white hover:text-gray-300"
          >
            <FaStore className="mr-1" /> Shop
          </Link>

          <Link to="/" className="text-white hover:text-gray-300">
            <FaHome className="text-xl" />
          </Link>

          {user ? (
            <>
              <Link to="/wishlist" className="relative text-white hover:text-gray-200">
                <FaHeart className="text-xl" />
                {Array.isArray(wishlist) && wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <Link to="/cart" className="relative text-white hover:text-gray-200">
                <FaShoppingCart className="text-xl" />
                {Array.isArray(cart) && cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Link>

              <div className="relative group">
                <button className="flex items-center text-white hover:text-gray-200 focus:outline-none">
                  <FaUser className="text-xl" />
                  <IoIosArrowDown className="ml-1" />
                </button>
                <div className="absolute right-0 mt-2 w-44 bg-white text-black border rounded shadow-lg z-50 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-indigo-100">
                    My Profile
                  </Link>
                  <Link to="/my-orders" className="block px-4 py-2 hover:bg-indigo-100">
                    My Orders
                  </Link>
                  <Link to="/address" className="block px-4 py-2 hover:bg-indigo-100">
                    Saved Address
                  </Link>
                  <Link to="/contact" className="block px-4 py-2 hover:bg-indigo-100">
                    Contact Us
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-indigo-100 text-red-600"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-white text-indigo-600 px-4 py-1.5 rounded hover:bg-gray-100"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="border border-white text-white px-4 py-1.5 rounded hover:bg-white hover:text-indigo-600"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button onClick={toggleNav} className="md:hidden text-white">
          {isNavOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isNavOpen && (
        <div className="md:hidden px-2 pb-4 space-y-3 bg-black">
          {/* Mobile Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
              className="w-full border border-gray-600 rounded-md py-1 px-3 bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <button
              onClick={handleSearch}
              className="absolute right-3 top-2 text-gray-400 hover:text-white"
            >
              <FaSearch />
            </button>
          </div>

          <Link to="/" className="flex items-center text-white hover:text-gray-300 space-x-2">
            <FaHome />
            <span>Home</span>
          </Link>
          <Link to="/shop" className="flex items-center text-white hover:text-gray-300 space-x-2">
            <FaStore />
            <span>Shop</span>
          </Link>
          <Link
            to="/dashboard"
            className="flex items-center text-white hover:text-gray-300 space-x-2"
          >
            <FaStore />
            <span>Dashboard</span>
          </Link>

          {user ? (
            <>
              <Link to="/wishlist" className="flex items-center text-white hover:text-gray-300 space-x-2">
                <FaHeart />
                <span>Wishlist</span>
              </Link>
              <Link to="/cart" className="flex items-center text-white hover:text-gray-300 space-x-2">
                <FaShoppingCart />
                <span>Cart</span>
              </Link>
              <Link to="/profile" className="flex items-center text-white hover:text-gray-300 space-x-2">
                <FaUser />
                <span>My Profile</span>
              </Link>
              <Link to="/contact" className="flex items-center text-white hover:text-gray-300 space-x-2">
                <FaUser />
                <span>Contact Us</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center w-full text-left text-white hover:text-gray-300 space-x-2"
              >
                <FaTimes />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center text-white hover:text-gray-300 space-x-2"
            >
              <FaUser />
              <span>Login</span>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
