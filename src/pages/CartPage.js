// import React, { useState, useEffect } from "react";
// import { useCart } from "../context/CartContext";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// const CartPage = () => {
//   const { cart, totalItems, increaseQuantity, decreaseQuantity, removeFromCart, addToCart } = useCart();
//   const [savedItems, setSavedItems] = useState([]);
//   const [couponCode, setCouponCode] = useState("");
//   const [setDiscountedCart] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [activeImage, setActiveImage] = useState("");
//   const navigate = useNavigate();

//   const totalPrice = cart.reduce((sum, item) => item.price ? sum + item.price * item.quantity : sum, 0);

//   const handleProceed = () => setShowModal(true);

//   const confirmCheckout = () => {
//     setShowModal(false);
//     navigate("/checkout", { state: { cart } });
//   };

//   const handleMoveToCart = (item) => {
//     if (!cart.find(ci => ci._id === item._id)) {
//       addToCart({ ...item, quantity: 1 });
//     }
//     const updatedSaved = savedItems.filter(si => si._id !== item._id);
//     setSavedItems(updatedSaved);
//     localStorage.setItem("savedItems", JSON.stringify(updatedSaved));
//   };

//   const handleApplyCoupon = async () => {
//     try {
//       const res = await axios.post("https://www.gsienterprises.com/api/cart/apply-coupon", { code: couponCode }, { withCredentials: true });
//       setDiscountedCart(res.data);
//       alert("Coupon applied!");
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to apply coupon.");
//     }
//   };

//   useEffect(() => {
//     const stored = localStorage.getItem("savedItems");
//     if (stored) setSavedItems(JSON.parse(stored));
//   }, []);

//   const groupedCart = cart.reduce((acc, item) => {
//     const key = `${item.brand}_${item.selectedColor || "default"}`;
//     if (!acc[key]) acc[key] = [];
//     acc[key].push(item);
//     return acc;
//   }, {});

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8 min-h-screen bg-gray-50">
//       <h2 className="text-3xl font-bold mb-6 text-center">🛒 Your Cart</h2>

//       {cart.length === 0 ? (
//         <p className="text-gray-500 text-center">
//           Your cart is empty. <Link to="/shop" className="text-blue-600 underline">Go shopping →</Link>
//         </p>
//       ) : (
//         <div className="grid md:grid-cols-3 gap-8">
//           <div className="md:col-span-2 space-y-6">
//             {Object.entries(groupedCart).map(([key, items]) => (
//               <div key={key} className="mb-6 border rounded-lg p-4 shadow-md bg-white">
//                 <h3 className="text-xl font-semibold mb-3 text-purple-700">
//                   {items[0].brand} {items[0].selectedColor && ` - ${items[0].selectedColor}`}
//                 </h3>
//                 <div className="flex flex-wrap gap-4">
//                   {items.map((item) => (
//                     <div key={item.productId} className="w-full sm:w-48 bg-gray-50 p-2 rounded-lg border hover:shadow">
//                       <img
//                         src={item.cartImage || item.image}
//                         alt={item.name}
//                         className="w-full h-40 object-cover mb-2 rounded cursor-pointer"
//                         onClick={() => {
//                           setSelectedItem(item);
//                           setActiveImage(item.cartImage || item.image);
//                         }}
//                       />
//                       <h4 className="text-sm font-semibold">{item.name}</h4>
//                       <p className="text-sm text-gray-500">{item.description}</p>
//                       <div className="text-purple-600 font-bold mt-1">₹{item.price}</div>
//                       {item.mrp > item.price && (
//                         <div className="text-sm text-gray-400 line-through">₹{item.mrp}</div>
//                       )}
//                       <div className="flex items-center gap-2 mt-2">
//                         <button onClick={() => decreaseQuantity(item.productId)} className="w-6 h-6 rounded-full bg-red-500 text-white">−</button>
//                         <span>{item.quantity}</span>
//                         <button onClick={() => increaseQuantity(item.productId)} className="w-6 h-6 rounded-full bg-green-500 text-white">+</button>
//                       </div>
//                       <button onClick={() => removeFromCart(item.productId)} className="text-red-500 text-sm mt-2 hover:underline">Remove</button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}

//             {savedItems.length > 0 && (
//               <div className="mt-6">
//                 <h3 className="text-lg font-semibold mb-2">Saved for Later</h3>
//                 {savedItems.map(item => (
//                   !item || !item.productId ? null : (
//                     <div key={item.productId} className="bg-gray-100 p-4 rounded-lg flex justify-between items-center mb-2">
//                       <div>
//                         <p className="font-semibold">{item.name}</p>
//                         <p className="text-sm text-gray-600">₹{item.price}</p>
//                       </div>
//                       <button onClick={() => handleMoveToCart(item)} className="text-blue-500 text-sm hover:underline">Move to Cart</button>
//                     </div>
//                   )
//                 ))}
//               </div>
//             )}
//           </div>

//           <div className="bg-white p-6 rounded-xl shadow">
//             <h3 className="text-xl font-bold mb-4">Order Summary</h3>
//             <p className="text-sm text-gray-700">Total Items: {totalItems}</p>
//             <p className="text-lg font-semibold my-3">Total Price: ₹{totalPrice}</p>
//             <input
//               type="text"
//               value={couponCode}
//               onChange={e => setCouponCode(e.target.value)}
//               placeholder="Enter coupon code"
//               className="w-full p-2 border rounded mb-2"
//             />
//             <button
//               onClick={handleApplyCoupon}
//               className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
//             >
//               Apply Coupon
//             </button>
//             <button
//               onClick={handleProceed}
//               className="w-full mt-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             >
//               Proceed to Checkout
//             </button>
//             {showModal && (
//               <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                 <div className="bg-white p-6 rounded-lg shadow-lg">
//                   <p className="text-lg font-semibold mb-4">Proceed to Checkout?</p>
//                   <div className="flex justify-end gap-4">
//                     <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setShowModal(false)}>Cancel</button>
//                     <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={confirmCheckout}>Confirm</button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {selectedItem && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
//           <div className="bg-white p-4 rounded-xl w-full max-w-4xl">
//             <div className="flex justify-between mb-4">
//               <h2 className="text-xl font-bold">{selectedItem.name}</h2>
//               <button onClick={() => setSelectedItem(null)} className="text-gray-600">✖</button>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
//                 {(selectedItem.images ? Object.values(selectedItem.images).filter(Boolean) : [selectedItem.cartImage || selectedItem.selectedImage || selectedItem.image]).map((img, idx) => (
//                   <img
//                     key={idx}
//                     src={img}
//                     alt={`thumb-${idx}`}
//                     onClick={() => setActiveImage(img)}
//                     className={`w-20 h-20 object-cover rounded cursor-pointer border ${activeImage === img ? 'border-blue-500' : 'border-transparent'}`}
//                   />
//                 ))}
//               </div>
//               <div className="md:col-span-2 flex items-center justify-center">
//                 <div className="relative group w-full max-w-lg overflow-hidden rounded-lg">
//                   <img
//                     src={activeImage}
//                     alt={selectedItem.name}
//                     className="object-contain w-full h-full transition-transform duration-500 transform group-hover:scale-150"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartPage;




// import React, { useState, useEffect } from "react";
// import { useCart } from "../context/CartContext";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// const CartPage = () => {
//   const { cart, totalItems, increaseQuantity, decreaseQuantity, removeFromCart, addToCart } = useCart();
//   const [savedItems, setSavedItems] = useState([]);
//   const [couponCode, setCouponCode] = useState("");
//   const [setDiscountedCart] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [activeImages, setActiveImages] = useState({});
//   const navigate = useNavigate();

//   const totalPrice = cart.reduce((sum, item) => item.price ? sum + item.price * item.quantity : sum, 0);

//   const handleProceed = () => setShowModal(true);

//   const confirmCheckout = () => {
//     setShowModal(false);
//     navigate("/checkout", { state: { cart } });
//   };

//   const handleMoveToCart = (item) => {
//     if (!cart.find(ci => ci._id === item._id)) {
//       addToCart({ ...item, quantity: 1 });
//     }
//     const updatedSaved = savedItems.filter(si => si._id !== item._id);
//     setSavedItems(updatedSaved);
//     localStorage.setItem("savedItems", JSON.stringify(updatedSaved));
//   };

//   const handleApplyCoupon = async () => {
//     try {
//       const res = await axios.post("https://www.gsienterprises.com/api/cart/apply-coupon", { code: couponCode }, { withCredentials: true });
//       setDiscountedCart(res.data);
//       alert("Coupon applied!");
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to apply coupon.");
//     }
//   };

//   useEffect(() => {
//     const stored = localStorage.getItem("savedItems");
//     if (stored) setSavedItems(JSON.parse(stored));

//     // initialize active images
//     const initialImages = {};
//     cart.forEach((item) => {
//       initialImages[item.productId] = item.image;
//     });
//     setActiveImages(initialImages);
//   }, [cart]);

//   const groupedCart = cart.reduce((acc, item) => {
//     const key = `${item.brand}_${item.selectedColor || "default"}`;
//     if (!acc[key]) acc[key] = [];
//     acc[key].push(item);
//     return acc;
//   }, {});

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8 min-h-screen bg-gray-50">
//       <h2 className="text-3xl font-bold mb-6 text-center">🛒 Your Cart</h2>

//       {cart.length === 0 ? (
//         <p className="text-gray-500 text-center">
//           Your cart is empty. <Link to="/shop" className="text-blue-600 underline">Go shopping →</Link>
//         </p>
//       ) : (
//         <div className="grid md:grid-cols-3 gap-8">
//           <div className="md:col-span-2 space-y-6">
//             {Object.entries(groupedCart).map(([key, products]) => (
//               <div key={key} className="border rounded-lg p-4 shadow-md bg-white">
//                 <h3 className="text-xl font-semibold mb-3 text-purple-700">
//                   {products[0].brand} {products[0].selectedColor && ` - ${products[0].selectedColor}`}
//                 </h3>

//                 <div className="flex flex-wrap gap-4">
//                   {products.map((product) => (
//                     <div key={product._id} className="w-full sm:w-60 bg-gray-50 p-3 rounded-lg border hover:shadow">
//                       <img
//                         src={activeImages[product.productId] || product.image}
//                         alt={product.name}
//                         className="w-full h-40 object-contain rounded"
//                       />

//                       {/* Thumbnails */}
//                       <div className="flex gap-2 mt-2 overflow-x-auto">
//                         {(product.images || [product.image]).map((img, idx) => (
//                           <img
//                             key={idx}
//                             src={img}
//                             alt={`thumb-${idx}`}
//                             onClick={() => setActiveImages(prev => ({ ...prev, [product.productId]: img }))}
//                             className={`w-10 h-10 object-cover rounded border cursor-pointer ${activeImages[product.productId] === img ? 'border-purple-500' : 'border-gray-300'}`}
//                           />
//                         ))}
//                       </div>

//                       <h4 className="text-sm font-bold mt-2">{product.name}</h4>
//                       <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
//                       <div className="text-purple-600 font-bold mt-1">₹{product.price}</div>
//                       {product.mrp > product.price && (
//                         <div className="text-sm text-gray-400 line-through">₹{product.mrp}</div>
//                       )}

//                       <div className="flex items-center gap-2 mt-2">
//                         <button onClick={() => decreaseQuantity(product.productId)} className="w-6 h-6 rounded-full bg-red-500 text-white">−</button>
//                         <span>{product.quantity}</span>
//                         <button onClick={() => increaseQuantity(product.productId)} className="w-6 h-6 rounded-full bg-green-500 text-white">+</button>
//                       </div>
//                       <button onClick={() => removeFromCart(product.productId)} className="text-red-500 text-sm mt-2 hover:underline">Remove</button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}

//             {/* Saved Items */}
//             {savedItems.length > 0 && (
//               <div className="mt-6">
//                 <h3 className="text-lg font-semibold mb-2">Saved for Later</h3>
//                 {savedItems.map(item => (
//                   item?.productId && (
//                     <div key={item.productId} className="bg-gray-100 p-4 rounded-lg flex justify-between items-center mb-2">
//                       <div>
//                         <p className="font-semibold">{item.name}</p>
//                         <p className="text-sm text-gray-600">₹{item.price}</p>
//                       </div>
//                       <button onClick={() => handleMoveToCart(item)} className="text-blue-500 text-sm hover:underline">Move to Cart</button>
//                     </div>
//                   )
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Order Summary */}
//           <div className="bg-white p-6 rounded-xl shadow">
//             <h3 className="text-xl font-bold mb-4">Order Summary</h3>
//             <p className="text-sm text-gray-700">Total Items: {totalItems}</p>
//             <p className="text-lg font-semibold my-3">Total Price: ₹{totalPrice}</p>
//             <input
//               type="text"
//               value={couponCode}
//               onChange={e => setCouponCode(e.target.value)}
//               placeholder="Enter coupon code"
//               className="w-full p-2 border rounded mb-2"
//             />
//             <button
//               onClick={handleApplyCoupon}
//               className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
//             >
//               Apply Coupon
//             </button>
//             <button
//               onClick={handleProceed}
//               className="w-full mt-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             >
//               Proceed to Checkout
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Checkout Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <p className="text-lg font-semibold mb-4">Proceed to Checkout?</p>
//             <div className="flex justify-end gap-4">
//               <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setShowModal(false)}>Cancel</button>
//               <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={confirmCheckout}>Confirm</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartPage;

import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CartPage = () => {
  const {
    cart,
    totalItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    addToCart,
  } = useCart();
  const [savedItems, setSavedItems] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [setDiscountedCart] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeImages, setActiveImages] = useState({});
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (sum, item) => (item.price ? sum + item.price * item.quantity : sum),
    0
  );

  const handleProceed = () => setShowModal(true);

  const confirmCheckout = () => {
    setShowModal(false);
    navigate("/checkout", { state: { cart } });
  };

  const handleSaveForLater = (product) => {
    // Add to savedItems
    const updatedSaved = [...savedItems, product];
    setSavedItems(updatedSaved);
    localStorage.setItem("savedItems", JSON.stringify(updatedSaved));
    // Remove from cart
    removeFromCart(product.productId);
  };

  const handleMoveToCart = (item) => {
    if (!cart.find((ci) => ci._id === item._id)) {
      addToCart({ ...item, quantity: 1 });
    }
    const updatedSaved = savedItems.filter((si) => si._id !== item._id);
    setSavedItems(updatedSaved);
    localStorage.setItem("savedItems", JSON.stringify(updatedSaved));
  };

  const handleApplyCoupon = async () => {
    try {
      const res = await axios.post(
        "https://www.gsienterprises.com/api/cart/apply-coupon",
        { code: couponCode },
        { withCredentials: true }
      );
      setDiscountedCart(res.data);
      alert("Coupon applied!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to apply coupon.");
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem("savedItems");
    if (stored) setSavedItems(JSON.parse(stored));

    // initialize active images
    const initialImages = {};
    cart.forEach((item) => {
      initialImages[item.productId] = item.image;
    });
    setActiveImages(initialImages);
  }, [cart]);

  const groupedCart = cart.reduce((acc, item) => {
    const key = `${item.brand}_${item.selectedColor || "default"}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-center">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-center">
          Your cart is empty.{" "}
          <Link to="/shop" className="text-blue-600 underline">
            Go shopping →
          </Link>
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {Object.entries(groupedCart).map(([key, products]) => (
              <div
                key={key}
                className="border rounded-lg p-4 shadow-md bg-white"
              >
                <h3 className="text-xl font-semibold mb-3 text-purple-700">
                  {products[0].brand}{" "}
                  {products[0].selectedColor &&
                    ` - ${products[0].selectedColor}`}
                </h3>

                <div className="flex flex-wrap gap-4">
                  {products.map((product) => (
                    <div
                      key={product._id}
                      className="w-full sm:w-60 bg-gray-50 p-3 rounded-lg border hover:shadow"
                    >
                      <img
                        src={
                          activeImages[product.productId] || product.image
                        }
                        alt={product.name}
                        className="w-full h-40 object-contain rounded"
                      />

                      {/* Thumbnails */}
                      <div className="flex gap-2 mt-2 overflow-x-auto">
                        {(product.images || [product.image]).map((img, idx) => (
                          <img
                            key={idx}
                            src={img}
                            alt={`thumb-${idx}`}
                            onClick={() =>
                              setActiveImages((prev) => ({
                                ...prev,
                                [product.productId]: img,
                              }))
                            }
                            className={`w-10 h-10 object-cover rounded border cursor-pointer ${
                              activeImages[product.productId] === img
                                ? "border-purple-500"
                                : "border-gray-300"
                            }`}
                          />
                        ))}
                      </div>

                      <h4 className="text-sm font-bold mt-2">
                        {product.name}
                      </h4>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="text-purple-600 font-bold mt-1">
                        ₹{product.price}
                      </div>
                      {product.mrp > product.price && (
                        <div className="text-sm text-gray-400 line-through">
                          ₹{product.mrp}
                        </div>
                      )}

                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() =>
                            decreaseQuantity(product.productId)
                          }
                          className="w-6 h-6 rounded-full bg-red-500 text-white"
                        >
                          −
                        </button>
                        <span>{product.quantity}</span>
                        <button
                          onClick={() =>
                            increaseQuantity(product.productId)
                          }
                          className="w-6 h-6 rounded-full bg-green-500 text-white"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(product.productId)}
                        className="text-red-500 text-sm mt-2 hover:underline"
                      >
                        Remove
                      </button>

                      <button
                        onClick={() => handleSaveForLater(product)}
                        className="text-yellow-600 text-sm mt-1 hover:underline"
                      >
                        Save for Later
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Saved Items */}
            {savedItems.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Saved for Later</h3>
                {savedItems.map(
                  (item) =>
                    item?.productId && (
                      <div
                        key={item.productId}
                        className="bg-gray-100 p-4 rounded-lg flex justify-between items-center mb-2"
                      >
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm text-gray-600">
                            ₹{item.price}
                          </p>
                        </div>
                        <button
                          onClick={() => handleMoveToCart(item)}
                          className="text-blue-500 text-sm hover:underline"
                        >
                          Move to Cart
                        </button>
                      </div>
                    )
                )}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            <p className="text-sm text-gray-700">Total Items: {totalItems}</p>
            <p className="text-lg font-semibold my-3">
              Total Price: ₹{totalPrice}
            </p>
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter coupon code"
              className="w-full p-2 border rounded mb-2"
            />
            <button
              onClick={handleApplyCoupon}
              className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Apply Coupon
            </button>
            <button
              onClick={handleProceed}
              className="w-full mt-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg font-semibold mb-4">Proceed to Checkout?</p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={confirmCheckout}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
