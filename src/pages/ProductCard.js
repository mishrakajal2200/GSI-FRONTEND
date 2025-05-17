// import React, { useState } from 'react';
// import axios from 'axios';

// const ProductCard = ({ product }) => {
//   const [quantity, setQuantity] = useState(1);

//   const handleAddToCart = async () => {
//     try {
//       const token = localStorage.getItem('authToken'); // Get your auth token
//       if (!token) {
//         // Handle unauthenticated user (e.g., redirect to login)
//         console.error('User not authenticated');
//         return;
//       }

//       const response = await axios.post(
//         '/api/cart/add',
//         { productId: product._id, quantity },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log('Item added to cart:', response.data);
//       // Optionally provide feedback to the user (e.g., a notification)
//     } catch (error) {
//       console.error('Error adding to cart:', error.response ? error.response.data : error.message);
//       // Optionally display an error message to the user
//     }
//   };

//   const handleQuantityChange = (event) => {
//     setQuantity(parseInt(event.target.value));
//   };

//   return (
//     <div className="product-card">
//       {/* Display product details */}
//       <h3>{product.name}</h3>
//       <p>${product.price}</p>
//       {/* Optional quantity input */}
//       <input
//         type="number"
//         value={quantity}
//         min="1"
//         onChange={handleQuantityChange}
//         style={{ width: '50px', margin: '0 10px' }}
//       />
//       <button onClick={handleAddToCart}>Add to Cart</button>
//     </div>
//   );
// };

// export default ProductCard;