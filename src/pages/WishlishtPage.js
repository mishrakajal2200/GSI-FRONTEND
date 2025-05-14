// import React, { useEffect } from 'react';
// import { useWishlist } from '../context/WishlistContext';
// import { FaTrash, FaShoppingCart } from 'react-icons/fa';

// const WishlistPage = () => {
//   const { wishlist, getWishlist, removeFromWishlist, addToWishlist } = useWishlist();

//   useEffect(() => {
//     getWishlist(); // Fetch wishlist when component mounts
//   }, [getWishlist]);

//   return (
//     <div className="px-6 py-5 bg-gradient-to-r from-purple-300 to-zink-300 min-h-screen bg-gray-50">
//       <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">💖 My Wishlist 💖</h1>

//       {wishlist.length === 0 ? (
//         <div className="text-center mt-20 text-gray-600 text-xl">
//           Your wishlist is empty 😔
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
//           {wishlist.map((item) => (
//             <div
//               key={item._id}
//               className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4 flex flex-col justify-between"
//             >
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="h-48 w-full object-contain mb-4"
//               />
//               <h3 className="text-md font-semibold text-gray-800">{item.name}</h3>
//               <p className="text-gray-500 mt-1">₹{item.price}</p>

//               <div className="mt-4 flex items-center justify-between">
//                 <button
//                   onClick={() => removeFromWishlist(item._id)}
//                   className="text-red-500 hover:text-red-700 transition"
//                   title="Remove"
//                 >
//                   <FaTrash />
//                 </button>

//                 <button
//                   className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
//                   title="Move to Cart"
//                   onClick={() => addToWishlist(item._id)} // Assuming you want to move it to the cart
//                 >
//                   <FaShoppingCart />
//                   Move to Cart
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default WishlistPage;




import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, moveToCart } = useWishlist();

  // No need to call getWishlist explicitly here, since it's already handled in useEffect in context

  return (
    <div className="px-6 py-5 bg-gradient-to-r from-purple-300 to-zink-300 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">💖 My Wishlist 💖</h1>

      {wishlist.length === 0 ? (
        <div className="text-center mt-20 text-gray-600 text-xl">
          Your wishlist is empty 😔
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4 flex flex-col justify-between"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-48 w-full object-contain mb-4"
              />
              <h3 className="text-md font-semibold text-gray-800">{item.name}</h3>
              <p className="text-gray-500 mt-1">₹{item.price}</p>

              <div className="mt-4 flex items-center justify-between">
                <button
                  onClick={() => removeFromWishlist(item._id)}
                  className="text-red-500 hover:text-red-700 transition"
                  title="Remove"
                >
                  <FaTrash />
                </button>

                <button
                  className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                  title="Move to Cart"
                  onClick={() => moveToCart(item._id)} // Assuming you want to move it to the cart
                >
                  <FaShoppingCart />
                  Move to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
