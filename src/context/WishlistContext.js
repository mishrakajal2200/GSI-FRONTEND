// import { createContext, useContext, useEffect, useState,useRef } from 'react';
// import axios from 'axios';

// const WishlistContext = createContext();

// export const WishlistProvider = ({ children }) => {
//   const [wishlist, setWishlist] = useState([]);

  
//   const token = localStorage.getItem('token'); // ✅ Check if it's set
//   const isMounted = useRef(false);  // To track the first render



//   useEffect(() => {
//     // Only run getWishlist once when the component is first mounted
//     if (token && !isMounted.current) {
//       getWishlist();
//       isMounted.current = true; // Set it to true after the first render
//     }
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [token]);

//   const getWishlist = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/wishlist/getwishlist', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setWishlist(res.data.wishlist);
//     } catch (err) {
//       console.error('Failed to fetch wishlist:', err);
//     }
//   };

  
//   const addToWishlist = async (productId) => {
//     try {
//       const res = await axios.post(
//         'http://localhost:5000/api/wishlist/add',
//         { productId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setWishlist(res.data.wishlist);
//     } catch (err) {
//       alert(err.response?.data?.message || "Couldn't add to wishlist");
//     }
//   };

//   const removeFromWishlist = async (productId) => {
//     try {
//       const res = await axios.delete(
//         `http://localhost:5000/api/wishlist/remove/${productId}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setWishlist(res.data.wishlist);
//     } catch (err) {
//       alert(err.response?.data?.message || "Couldn't remove from wishlist");
//     }
//   };

//   useEffect(() => {
//     if (token) getWishlist();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [token]);

//   return (
//     <WishlistContext.Provider
//       value={{ wishlist, addToWishlist, removeFromWishlist }}
//     >
//       {children}
//     </WishlistContext.Provider>
//   );
// };

// export const useWishlist = () => useContext(WishlistContext);



// import { createContext, useContext, useEffect, useState } from 'react';
// import axios from 'axios';

// const WishlistContext = createContext();

// export const WishlistProvider = ({ children }) => {
//   const [wishlist, setWishlist] = useState([]);
//   const token = localStorage.getItem('token'); // ✅ Check if it's set
 

//   const getWishlist = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/wishlist/getwishlist', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setWishlist(res.data.wishlist);
//     } catch (err) {
//       console.error('Failed to fetch wishlist:', err);
//     }
//   };

//   const addToWishlist = async (productId) => {
//     try {
//       const res = await axios.post(
//         'http://localhost:5000/api/wishlist/add',
//         { productId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setWishlist(res.data.wishlist);
//     } catch (err) {
//       alert(err.response?.data?.message || "Couldn't add to wishlist");
//     }
//   };

//   const removeFromWishlist = async (productId) => {
//     try {
//       const res = await axios.delete(
//         `http://localhost:5000/api/wishlist/remove/${productId}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setWishlist(res.data.wishlist);
//     } catch (err) {
//       alert(err.response?.data?.message || "Couldn't remove from wishlist");
//     }
//   };

//   const moveToCart = async (productId) => {
//     try {
//       const res = await axios.post(
//         `http://localhost:5000/api/wishlist/movetocart`,
//         { productId }, // Send productId in body
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );
  
//       // ✅ Update wishlist state with latest data
//       setWishlist(res.data.wishlist);
  
//       // ✅ Optional: Update cart if updateCart function is available
//       if (typeof updateCart === 'function') {
//         updateCart(res.data.cart);
//       }
  
//     } catch (err) {
//       alert(err.response?.data?.message || "Couldn't move to cart");
//     }
//   };
  
  
//   useEffect(() => {
//     getWishlist(); // Now it works because getWishlist is available
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <WishlistContext.Provider
//       value={{ wishlist,getWishlist, addToWishlist, removeFromWishlist,moveToCart }}
//     >
//       {children}
//     </WishlistContext.Provider>
//   );
// };

// export const useWishlist = () => useContext(WishlistContext);





// import { createContext, useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import { useCart } from './CartContext'; // Adjust path as needed

// const WishlistContext = createContext();

// export const WishlistProvider = ({ children }) => {
//   const [wishlist, setWishlist] = useState([]);
//   const token = localStorage.getItem('token');
//   const { setCart } = useCart(); // ✅ Use setCart from CartContext

//   // const getWishlist = async () => {
//   //   try {
//   //     const res = await axios.get('https://gsi-backend-1.onrender.com/api/wishlist/getwishlist', {
//   //       headers: { Authorization: `Bearer ${token}` },
//   //     });
//   //     setWishlist(res.data.wishlist);
//   //   } catch (err) {
//   //     console.error('Failed to fetch wishlist:', err);
//   //   }
//   // };

//   const getWishlist = async () => {
//   try {
//     const token = localStorage.getItem("token");

//     const res = await axios.get("https://gsi-backend-1.onrender.com/api/wishlist/getwishlist", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     setWishlist(res.data.wishlist); // Assuming you have setWishlist from context or state
//   } catch (err) {
//     console.error("Error fetching wishlist data:", err.response?.data || err.message);
//   }
// };

//  useEffect(() => {
//     getWishlist();
//   }, []);

//   const addToWishlist = async (productId) => {
//     try {
//       const res = await axios.post(
//         'https://gsi-backend-1.onrender.com/api/wishlist/add',
//         { productId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setWishlist(res.data.wishlist);
//     } catch (err) {
//       alert(err.response?.data?.message || "Couldn't add to wishlist");
//     }
//   };

//   // const removeFromWishlist = async (productId) => {
//   //   try {
//   //     const res = await axios.delete(
//   //       `https://gsi-backend-1.onrender.com/api/wishlist/remove/${productId}`,
//   //       { headers: { Authorization: `Bearer ${token}` } }
//   //     );
//   //     setWishlist(res.data.wishlist);
//   //   } catch (err) {
//   //     alert(err.response?.data?.message || "Couldn't remove from wishlist");
//   //   }
//   // };
// const removeFromWishlist = async (productId) => {
//   console.log("Product ID received for wishlist removal:", productId);

//   if (!productId) {
//     console.error("No product ID provided for wishlist removal");
//     return;
//   }

//   try {
//     const token = localStorage.getItem("token");
//     const res = await axios.delete(`https://gsi-backend-1.onrender.com/api/wishlist/remove/${productId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     // Update wishlist state based on backend response
//     setWishlist(res.data.wishlist); // Make sure setWishlist is available from context or state
//   } catch (error) {
//     console.error("Error removing from wishlist:", error);
//   }
// };

//   const moveToCart = async (productId) => {
//     try {
//       const res = await axios.post(
//         `https://gsi-backend-1.onrender.com/api/wishlist/movetocart/${productId}`, // ✅ Using URL param
//         {}, // ✅ No productId needed in body now
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
  
//       setWishlist(res.data.wishlist);
//       setCart(res.data.cart);
//     } catch (err) {
//       alert(err.response?.data?.message || "Couldn't move to cart");
//     }
//   };
  

//   useEffect(() => {
//     getWishlist();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <WishlistContext.Provider
//       value={{
//         wishlist,
//         getWishlist,
//         addToWishlist,
//         removeFromWishlist,
//         moveToCart,
//       }}
//     >
//       {children}
//     </WishlistContext.Provider>
//   );
// };

// export const useWishlist = () => useContext(WishlistContext);



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

  // Remove from wishlist
  // const removeFromWishlist = async (productId) => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const res = await axios.delete(`https://gsi-backend-1.onrender.com/api/wishlist/remove/${productId}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setWishlist(res.data.wishlist);
  //   } catch (err) {
  //     console.error("Error removing from wishlist:", err);
  //   }
  // };
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
