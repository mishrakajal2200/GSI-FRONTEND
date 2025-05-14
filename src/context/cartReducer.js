// const cartReducer = (state, action) => {
//   switch (action.type) {
//     case 'SET_LOADING':
//       return { ...state, loading: true, error: null };
//     case 'SET_LOADING_FALSE':
//       return { ...state, loading: false };
//     case 'SET_ERROR':
//       return { ...state, loading: false, error: action.payload };
//     case 'LOAD_CART':
//       return { ...state, cartItems: action.payload };
//     case 'ADD_TO_CART_LOCAL': // For non-logged-in users
//       const existingItemIndexLocal = state.cartItems.findIndex(
//         (item) => item._id === action.payload._id
//       );
//       if (existingItemIndexLocal >= 0) {
//         const updatedCartItemsLocal = state.cartItems.map((item) =>
//           item._id === action.payload._id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//         return { ...state, cartItems: updatedCartItemsLocal };
//       } else {
//         return { ...state, cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }] };
//       }
//     case 'SET_CART_ITEMS': // When cart is updated from backend
//       return { ...state, cartItems: action.payload };
//     case 'REMOVE_ITEM':
//       return {
//         ...state,
//         cartItems: state.cartItems.filter((item) => item._id !== action.payload),
//       };
//     case 'INCREASE_QUANTITY':
//       return {
//         ...state,
//         cartItems: state.cartItems.map((item) =>
//           item._id === action.payload
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         ),
//       };
//     case 'DECREASE_QUANTITY':
//       return {
//         ...state,
//         cartItems: state.cartItems.map((item) =>
//           item._id === action.payload && item.quantity > 1
//             ? { ...item, quantity: item.quantity - 1 }
//             : item
//         ),
//       };
//     case 'CLEAR_CART':
//       return {
//         ...state,
//         cartItems: [],
//         totalAmount: 0,
//         totalItems: 0,
//       };
//     case 'UPDATE_TOTALS':
//       return {
//         ...state,
//         totalAmount: action.payload.totalAmount,
//         totalItems: action.payload.totalItems,
//       };
//     default:
//       return state;
//   }
// };

// export default cartReducer;