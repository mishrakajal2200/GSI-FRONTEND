
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [savedItems, setSavedItems] = useState([]);

  // 🔃 Fetch cart and wishlist from backend on load
  const fetchCartData = async () => {
    try {
      const token = localStorage.getItem("token");
  
      const res = await axios.get("https://gsi-backend-1.onrender.com/api/cart/getcart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setCart(res.data.cart);
      setSavedItems(res.data.savedItems);
    } catch (err) {
      console.error("Error fetching cart data:", err.response?.data || err.message);
    }
  };
  
  

  useEffect(() => {
    fetchCartData();
  }, []);

  // ➕ Add to Cart
  const addToCart = async (productId) => {
  const token = localStorage.getItem("token");
  try {
    await axios.post(
      "https://gsi-backend-1.onrender.com/api/cart/add",
      { productId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchCartData(); // <-- refresh cart after adding
  } catch (err) {
    console.error("Error adding to cart:", err);
  }
};
  
  
  

  // ❌ Remove Item from Cart
  
  const removeFromCart = async (productId) => {
  console.log("Product ID received:", productId);

  if (!productId) {
    console.error("No product ID provided");
    return;
  }


  try {
    const token = localStorage.getItem("token");
    const res = await axios.delete(`https://gsi-backend-1.onrender.com/api/cart/remove/${productId}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    // ✅ Use the response to update your cart state
    setCart(res.data.cart); // <-- assuming you have a setCart method from context or state
  } catch (error) {
    console.error("Error removing from cart:", error);
  }
};


  // 🔼 Increase quantity
  const increaseQuantity = async (productId) => {
    try {
      const token = localStorage.getItem("token"); // or however you store it
  
      const res = await axios.patch(
        `https://gsi-backend-1.onrender.com/api/cart/increase/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
  
      setCart(res.data.cart);
    } catch (err) {
      console.error("Error increasing quantity:", err.response?.data || err.message);
    }
  };
  

// 🔽 Decrease quantity
  const decreaseQuantity = async (productId) => {
    try {
      const token = localStorage.getItem("token"); // or however you store it
  
      const res = await axios.patch(
        `https://gsi-backend-1.onrender.com/api/cart/decrease/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
  
      setCart(res.data.cart);
    } catch (err) {
      console.error("Error decreasing quantity:", err.response?.data || err.message);
    }
  };
  
  
  
  // 💾 Save for Later
//   const handleSaveForLater = async (productId) => {
//   try {
//     console.log("Calling API with:", productId); // ✅ Debug
//     const res = await axios.patch(`http://localhost:5000/api/cart/save/${productId}`);
//     setCart(res.data.cart);
//     setSavedItems(res.data.savedItems);
//   } catch (err) {
//     console.error("Error saving item for later:", err);
//   }
// };


  // 🔁 Move from Wishlist to Cart
  const handleMoveToCart = async (productId) => {
    try {
      const res = await axios.patch(`https://gsi-backend-1.onrender.com/api/cart/move/${productId}`);
      setCart(res.data.cart);
      setSavedItems(res.data.savedItems);
    } catch (err) {
      console.error("Error moving item to cart:", err);
    }
  };

  // 🧹 Clear Entire Cart
  const clearCart = async () => {
    try {
      const res = await axios.delete("https://gsi-backend-1.onrender.com/api/cart");
      setCart(res.data.cart);
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };

  // 🧮 Total items
  // const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalItems = cart.filter(item => item).length;

  return (
    <CartContext.Provider
      value={{
        cart,
        savedItems,
        totalItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
       
        handleMoveToCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
