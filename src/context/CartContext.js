
// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";

// const CartContext = createContext();
// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);
//   const [savedItems, setSavedItems] = useState([]);

//   // 🔃 Fetch cart and wishlist from backend on load
//  const fetchCartData = async () => {
//   try {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     const res = await axios.get("https://api.gsienterprises.com/api/cart/getcart", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       withCredentials: true,
//     });

//     setCart(Array.isArray(res.data.cart) ? res.data.cart : []);
//     setSavedItems(Array.isArray(res.data.savedItems) ? res.data.savedItems : []);
//   } catch (err) {
//     console.error("Error fetching cart data:", err.response?.data || err.message);
//   }
// };

// useEffect(() => {
//   fetchCartData();
// }, []);




//   // ➕ Add to Cart
// //   const addToCart = async (productId) => {
// //   const token = localStorage.getItem("token");
// //   try {
// //     await axios.post(
// //       "https://api.gsienterprises.com/api/cart/add",
// //       { productId }, // ✅ Request body
// //       {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //         withCredentials: true, // ✅ Moved into the config object
// //       }
// //     );

// //     fetchCartData(); // 🔄 Refresh cart after adding
// //   } catch (err) {
// //     console.error("Error adding to cart:", err.response?.data || err.message);
// //   }
// // };
// const addToCart = async ({ productId, name, image, images, price, quantity = 1 }) => {
//   try {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     await axios.post(
//       "https://api.gsienterprises.com/api/cart/add",
//       {
//         productId,
//         name,
//         image,
//         images,
//         price,
//         quantity,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         withCredentials: true,
//       }
//     );

//     // Optional: Update local state or just refetch from backend
//     fetchCartData();
//   } catch (err) {
//     console.error("Error adding to cart:", err.response?.data || err.message);
//   }
// };





// //   const addToCart = async ({ productId, color, size, image, price }) => {
// //   const token = localStorage.getItem("token");
// //   try {
// //     await axios.post(
// //       "https://api.gsienterprises.com/api/cart/add",
// //       {
// //         productId,
// //         color,
// //         size,
// //         image,
// //         price,
// //       },
// //       {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //         withCredentials: true,
// //       }
// //     );

// //     fetchCartData(); // refresh cart after adding
// //   } catch (err) {
// //     console.error("Error adding to cart:", err);
// //   }
// // };

  
  

//   // ❌ Remove Item from Cart
  
//   const removeFromCart = async (productId) => {
//   console.log("Product ID received:", productId);

//   if (!productId) {
//     console.error("No product ID provided");
//     return;
//   }


//   try {
//     const token = localStorage.getItem("token");
//     const res = await axios.delete(`https://api.gsienterprises.com/api/cart/remove/${productId}`,{
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       withCredentials:true
//     });
    
//     // ✅ Use the response to update your cart state
//     setCart(res.data.cart); // <-- assuming you have a setCart method from context or state
//   } catch (error) {
//     console.error("Error removing from cart:", error);
//   }
// };


//   // 🔼 Increase quantity
//   const increaseQuantity = async (productId) => {
//     try {
//       const token = localStorage.getItem("token"); // or however you store it
  
//       const res = await axios.patch(
//         `https://api.gsienterprises.com/api/cart/increase/${productId}`,
//         {withCredentials:true},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );
  
//       setCart(res.data.cart);
//     } catch (err) {
//       console.error("Error increasing quantity:", err.response?.data || err.message);
//     }
//   };
  

// // 🔽 Decrease quantity
//   const decreaseQuantity = async (productId) => {
//     try {
//       const token = localStorage.getItem("token"); // or however you store it
  
//       const res = await axios.patch(
//         `https://api.gsienterprises.com/api/cart/decrease/${productId}`,
//         {withCredentials:true},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );
  
//       setCart(res.data.cart);
//     } catch (err) {
//       console.error("Error decreasing quantity:", err.response?.data || err.message);
//     }
//   };
  
  
  
//   // 💾 Save for Later
// //   const handleSaveForLater = async (productId) => {
// //   try {
// //     console.log("Calling API with:", productId); // ✅ Debug
// //     const res = await axios.patch(`http://localhost:5000/api/cart/save/${productId}`);
// //     setCart(res.data.cart);
// //     setSavedItems(res.data.savedItems);
// //   } catch (err) {
// //     console.error("Error saving item for later:", err);
// //   }
// // };


//   // 🔁 Move from Wishlist to Cart
//   const handleMoveToCart = async (productId) => {
//     try {
//       const res = await axios.patch(`https://api.gsienterprises.com/api/cart/move/${productId}`,{
//         withCredentials:true
//       });
//       setCart(res.data.cart);
//       setSavedItems(res.data.savedItems);
//     } catch (err) {
//       console.error("Error moving item to cart:", err);
//     }
//   };

//   // 🧹 Clear Entire Cart
//   const clearCart = async () => {
//     try {
//       const res = await axios.delete("/api/cart");
//       setCart(res.data.cart);
//     } catch (err) {
//       console.error("Error clearing cart:", err);
//     }
//   };

//   // 🧮 Total items
  
//   // const totalItems = cart.filter(item => item).length;
// const totalItems = (cart || []).filter(item => item).length;

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         setCart ,
//         savedItems,
//         totalItems,
//         addToCart,
//         removeFromCart,
//         increaseQuantity,
//         decreaseQuantity,
//         handleMoveToCart,
//         clearCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };



import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Create Cart Context
const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [savedItems, setSavedItems] = useState([]);

  // 🔃 Fetch cart and saved items from backend
  const fetchCartData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get("https://api.gsienterprises.com/api/cart/getcart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setCart(Array.isArray(res.data.cart) ? res.data.cart : []);
      setSavedItems(Array.isArray(res.data.savedItems) ? res.data.savedItems : []);
    } catch (err) {
      console.error("Error fetching cart data:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  // ➕ Add to Cart
  const addToCart = async ({ productId, name, image, images, price, quantity = 1 }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.post(
        "https://api.gsienterprises.com/api/cart/add",
        {
          productId,
          name,
          image,
          images,
          price,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      fetchCartData(); // 🔄 Refresh cart after adding
    } catch (err) {
      console.error("Error adding to cart:", err.response?.data || err.message);
    }
  };

  // ❌ Remove Item from Cart
  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!productId || !token) {
        console.error("Missing productId or token");
        return;
      }

      const res = await axios.delete(`https://api.gsienterprises.com/api/cart/remove/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setCart(res.data.cart);
    } catch (error) {
      console.error("Error removing from cart:", error.response?.data || error.message);
    }
  };

  // 🔼 Increase quantity
  const increaseQuantity = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `https://api.gsienterprises.com/api/cart/increase/${productId}`,
        { withCredentials: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `https://api.gsienterprises.com/api/cart/decrease/${productId}`,
        { withCredentials: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCart(res.data.cart);
    } catch (err) {
      console.error("Error decreasing quantity:", err.response?.data || err.message);
    }
  };

  // 🔁 Move from Wishlist to Cart
  const handleMoveToCart = async (productId) => {
    try {
      const res = await axios.patch(`https://api.gsienterprises.com/api/cart/move/${productId}`, {
        withCredentials: true,
      });

      setCart(res.data.cart);
      setSavedItems(res.data.savedItems);
    } catch (err) {
      console.error("Error moving item to cart:", err.response?.data || err.message);
    }
  };

  // 🧹 Clear Entire Cart
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

  // 🧮 Total Items Count
  const totalItems = (cart || []).filter(item => item).length;

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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
