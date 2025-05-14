
import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Link,useNavigate } from "react-router-dom";
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

const [couponCode, setCouponCode] = useState('');
const [discountedCart, setDiscountedCart] = useState(null);
 const [showModal, setShowModal] = useState(false);
 const navigate = useNavigate();
  const totalPrice = cart.reduce((sum, item) => {
    if (item.price) {
      return sum + item.price * item.quantity;
    }
    return sum;
  }, 0);
  

   const handleProceed = () => {
    setShowModal(true); // show confirmation modal
  };

  const confirmCheckout = () => {
    setShowModal(false);
    navigate("/checkout", { state: { cart } }); // pass cart to checkout
  };
  
// SAVE FOR LATER - removes from cart, adds to savedItems
// const handleSaveForLater = (itemId) => {
//   // Find the item in the cart
//   const itemToSave = cart.find((item) => item._id === itemId);
  
//   // If the item isn't found, return early and do nothing
//   if (!itemToSave) {
//     console.error("Item not found in cart");
//     return;
//   }

//   // Proceed if the item is not already in the saved items
//   if (!savedItems.some((item) => item._id === itemId)) {
//     const updatedSaved = [...savedItems, itemToSave];
//     setSavedItems(updatedSaved);
//     localStorage.setItem("savedItems", JSON.stringify(updatedSaved));
//   }

//   // Remove the item from the cart
//   removeFromCart(itemId);
// };


// MOVE BACK TO CART
const handleMoveToCart = (item) => {
  // Check if item already in the cart
  const itemInCart = cart.find((cartItem) => cartItem._id === item._id);

  // If the item is not in the cart, add it with quantity = 1
  if (!itemInCart) {
    addToCart({ ...item, quantity: 1 });  // Using addToCart from context to add to cart
  }

  // Remove the item from saved items
  const updatedSaved = savedItems.filter((savedItem) => savedItem._id !== item._id);
  setSavedItems(updatedSaved);
  localStorage.setItem("savedItems", JSON.stringify(updatedSaved));
};


const handleApplyCoupon = async () => {
  try {
    const res = await axios.post('gsi-backend-production-244c.up.railway.app/api/cart/apply-coupon', { code: couponCode });
    setDiscountedCart(res.data); // e.g., updated cart with discount
    alert("Coupon applied!");
  } catch (err) {
    alert(err.response?.data?.message || "Failed to apply coupon.");
  }
};

  useEffect(() => {
    const storedSaved = localStorage.getItem("savedItems");
    if (storedSaved) {
      setSavedItems(JSON.parse(storedSaved));
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-center">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500 w-full max-w-7xl  text-center">
          Your cart is empty.{" "}
          <Link to="/shop" className="text-blue-600 underline">
            Go shopping →
          </Link>
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => {
  if (!item || !item.productId) return null; // defensive check
  return (
    <div
      key={item.productId}
      className="bg-white p-4 rounded-xl shadow flex flex-col sm:flex-row justify-between items-center gap-4"
    >
      <div className="flex items-center gap-4">
        <img
          src={item.image || "/fallback.jpg"} // Replace with your local image if needed
          alt={item.name || "Product"}
          className="w-20 h-20 object-cover rounded-lg"
          onError={(e) => {
            e.target.src = "/fallback.jpg"; // fallback on error
          }}
        />
        <div>
          <h4 className="text-lg font-semibold">{item.name}</h4>
          <p className="text-sm text-gray-600">₹{item.price}</p>
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={() => decreaseQuantity(item.productId)}
              className="w-8 h-8 rounded-full bg-red-500 text-white"
            >
              −
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() => increaseQuantity(item.productId)}
              className="w-8 h-8 rounded-full bg-green-500 text-white"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="text-right space-y-2">
        <p className="font-bold text-gray-700">
          ₹{item.price * item.quantity}
        </p>
        <button
          onClick={() => removeFromCart(item.productId)}
          className="text-red-500 text-sm hover:underline"
        >
          Remove
        </button>
        {/* <button
          onClick={() => handleSaveForLater(item.productId)}
          className="text-blue-500 text-sm hover:underline block"
        >
          Save for Later
        </button> */}
      </div>
    </div>
  );
})}


            {/* Saved for Later Section */}
            {savedItems.map((item) => {
  if (!item || !item.productId) return null;
  return (
    <div
      key={item.productId}
      className="bg-gray-100 p-4 rounded-lg flex justify-between items-center mb-2"
    >
      <div>
        <p className="font-semibold">{item.name}</p>
        <p className="text-sm text-gray-600">₹{item.price}</p>
      </div>
      <button
        onClick={() => handleMoveToCart(item)}
        className="text-blue-500 text-sm hover:underline"
      >
        Move to Cart
      </button>
    </div>
  );
})}


          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-xl shadow h-fit">
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


            <button onClick={handleProceed} className="w-full mt-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Proceed to Checkout
            </button>
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
        </div>
      )}
    </div>
  );
};

export default CartPage;
