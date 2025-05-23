/* eslint-disable no-undef */


import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const WishlistContext = createContext();
export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // Fetch wishlist from backend
  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://gsi-backend-1.onrender.com/api/wishlist/getWishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWishlist(res.data.wishlist);
    } catch (err) {
      console.error("Error fetching wishlist:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // Add to wishlist
  const addToWishlist = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://gsi-backend-1.onrender.com/api/wishlist/add",
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchWishlist();
    } catch (err) {
      console.error("Error adding to wishlist:", err);
    }
  };

  
const removeFromWishlist = async (productId) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.delete(
      `https://gsi-backend-1.onrender.com/api/wishlist/remove/${productId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // use res so it’s not “unused”
    console.log("Wishlist remove response status:", res.status);

    // ✅ Update the wishlist by filtering out the removed item
    setWishlist(prev => prev.filter(item => item._id !== productId));
  } catch (err) {
    console.error("Error removing from wishlist:", err);
  }
};
  // Move from wishlist to cart
  const moveToCart = async (productId) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.patch(
      `https://gsi-backend-1.onrender.com/api/wishlist/move/${productId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setWishlist(res.data.wishlist);
    setCart(res.data.cart); // If using context
    navigate("/cart"); // <--- move to cart page
  } catch (err) {
    console.error("Error moving item to cart:", err);
  }
};


  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        moveToCart,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
