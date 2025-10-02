
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Create context
const CartContext = createContext();

// Custom hook to use Cart context
export const useCart = () => useContext(CartContext);

// Provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [savedItems, setSavedItems] = useState([]);

  // Fetch cart data from backend

// const fetchCartData = async () => {
//   try {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     const res = await axios.get("https://api.gsienterprises.com/api/cart/getcart", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       withCredentials: true,
//     });
    
//     setCart(res.data?.items || res.data?.cart?.items || []);
//     console.log("🛒 Cart Items Fetched:", res.data?.items || res.data?.cart?.items || []);
//   } catch (err) {
//     console.error("Error fetching cart data:", err.response?.data || err.message);
//   }
// };
const fetchCartData = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await axios.get("https://gsienterprises.com/api/cart/getcart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    // Map product and quantity into one flat object for UI
    // const items = res.data?.items?.map((item) => ({
    //   ...item.product,
    //   quantity: item.quantity,
    // })) || [];
    const items = res.data?.items || [];

    setCart(items); // this sets cart items with full product data
    console.log("🛒 Cart items loaded:", items);
  } catch (err) {
    console.error("Error fetching cart data:", err.response?.data || err.message);
  }
};



  // Run once on mount
  useEffect(() => {
    fetchCartData();
  }, []);

  // Add to cart
  const addToCart = async (item) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const { productId, quantity } = item;

      await axios.post(
        "https://api.gsienterprises.com/api/cart/add",
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      fetchCartData();
    } catch (err) {
      console.error("Error adding to cart:", err.response?.data || err.message);
    }
  };

  // Remove from cart
  // const removeFromCart = async (productId) => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     if (!productId || !token) return;

  //     const res = await axios.delete(`https://api.gsienterprises.com/api/cart/remove/${productId}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       withCredentials: true,
  //     });

  //     setCart(res.data.cart);
  //   } catch (error) {
  //     console.error("Error removing from cart:", error.response?.data || error.message);
  //   }
  // };
const removeFromCart = async (productId) => {
  try {
    const token = localStorage.getItem("token");
    if (!productId || !token) return;

    const res = await axios.delete(
      `https://gsienterprises.com/api/cart/remove/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    setCart(res.data.cart); // ✅ update full cart object
  } catch (error) {
    console.error("Error removing from cart:", error.response?.data || error.message);
    alert(error.response?.data?.message || "Failed to remove item.");
  }
};



  // Increase item quantity
  const increaseQuantity = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `https://gsienterprises.com/api/cart/increase/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      setCart(res.data.cart);
    } catch (err) {
      console.error("Error increasing quantity:", err.response?.data || err.message);
    }
  };

  // Decrease item quantity
 const decreaseQuantity = async (productId, size, color) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.patch(
      `https://gsienterprises.com/api/cart/decrease/${productId}`,
      { size, color },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    setCart(res.data.cart);
  } catch (err) {
    console.error("Error decreasing quantity:", err.response?.data || err.message);
  }
};



  // Move item from savedItems to cart
  const handleMoveToCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `https://api.gsienterprises.com/api/cart/move/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      setCart(res.data.cart);
      setSavedItems(res.data.savedItems);
    } catch (err) {
      console.error("Error moving item to cart:", err.response?.data || err.message);
    }
  };

  // Clear cart
  const clearCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete("https://api.gsienterprises.com/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setCart(res.data.cart);
    } catch (err) {
      console.error("Error clearing cart:", err.response?.data || err.message);
    }
  };

  // Count total items in cart
  const totalItems = (cart || []).filter(Boolean).length;

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        savedItems,
        totalItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        handleMoveToCart,
        clearCart,
        fetchCartData, // ✅ exposed for manual refresh
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
