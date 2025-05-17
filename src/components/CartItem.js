// import { motion } from "framer-motion";
// import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";

// const CartItem = ({ item, increaseQty, decreaseQty, removeItem }) => {
//   return (
//     <motion.div
//       className="flex gap-4 p-4 bg-white rounded-lg shadow-md items-center"
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//     >
//       <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />

//       <div className="flex-1">
//         <h3 className="text-lg font-semibold">{item.name}</h3>
//         <p className="text-sm text-gray-600">Price: ₹{item.price.toLocaleString()}</p>
//         <p className="text-sm text-gray-600">
//           Subtotal: ₹{(item.price * item.quantity).toLocaleString()}
//         </p>

//         <div className="flex items-center mt-2 gap-2">
//           <button
//             onClick={() => decreaseQty(item.id)}
//             className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
//           >
//             <FaMinus size={12} />
//           </button>
//           <span className="px-3">{item.quantity}</span>
//           <button
//             onClick={() => increaseQty(item.id)}
//             className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
//           >
//             <FaPlus size={12} />
//           </button>
//         </div>
//       </div>

//       <button
//         onClick={() => removeItem(item.id)}
//         className="text-red-600 hover:text-red-800"
//         title="Remove item"
//       >
//         <FaTrash />
//       </button>
//     </motion.div>
//   );
// };

// export default CartItem;
