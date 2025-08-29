
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
 
  const [showModal, setShowModal] = useState(false);
  const [activeImages, setActiveImages] = useState({});
  const [showQuotationModal, setShowQuotationModal] = useState(false);
  const [quotationForm, setQuotationForm] = useState({
  budget: "",
  specialNotes: "",
});
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (sum, item) =>
      item.product?.price ? sum + item.product.price * item.quantity : sum,
    0
  );

  const handleProceed = () => setShowModal(true);

  const confirmCheckout = () => {
    setShowModal(false);
    navigate("/checkout", { state: { cart } });
  };

  const handleMoveToCart = (item) => {
    if (!cart.find((ci) => ci._id === item._id)) {
      addToCart({ ...item, quantity: 1 });
    }
    const updatedSaved = savedItems.filter((si) => si._id !== item._id);
    setSavedItems(updatedSaved);
    localStorage.setItem("savedItems", JSON.stringify(updatedSaved));
  };

 

  const handleQuotationSubmit = async () => {
  try {
    await axios.post(
      "https://api.gsienterprises.com/api/quotation/create",
      {
        items: cart.map((item) => ({
          productId: item.product._id,
          quantity: item.quantity,
        })),
        budget: quotationForm.budget,
        specialNotes: quotationForm.specialNotes,
      },
      { withCredentials: true }
    );

    alert("Quotation request submitted!");
    setShowQuotationModal(false);
  } catch (err) {
    alert(err.response?.data?.message || "Failed to submit quotation.");
  }
};

  useEffect(() => {
    const stored = localStorage.getItem("savedItems");
    if (stored) setSavedItems(JSON.parse(stored));

    const initialImages = {};
    cart.forEach((item) => {
      initialImages[item.product._id] = item.product.image;
    });
    setActiveImages(initialImages);
  }, [cart]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen bg-gradient-to-b from-gray-50 to-purple-50">
      <h2 className="text-4xl font-bold mb-8 text-center text-purple-800">
        🛒 Your Cart
      </h2>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">
          Your cart is empty.{" "}
          <Link
            to="/shop"
            className="text-purple-600 underline hover:text-purple-800"
          >
            Go shopping →
          </Link>
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {cart.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-md p-4 flex flex-col sm:flex-row items-start gap-4"
              >
                <img
                  src={
                    activeImages[product.product._id] ||
                    product.product.image
                  }
                  alt={product.product.name}
                  className="w-80 h-80 object-contain rounded-md border"
                />

                <div className="flex-1 ml-12 mt-10">
                  <h4 className="text-md font-semibold text-gray-800">
                    {product.product.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {product.product.brand}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-purple-700 font-bold text-lg">
                      ₹{product.product.price}
                    </span>
                    {product.product.mrp > product.product.price && (
                      <span className="text-sm line-through text-gray-400">
                        ₹{product.product.mrp}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-2 border px-2 py-1 rounded-md">
                      <button
  onClick={() => decreaseQuantity(product.product._id, product.size, product.color)}
  className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300"
>
  −
</button>
                      <span>{product.quantity}</span>
                      <button
                        onClick={() =>
                          increaseQuantity(product.product._id)
                        }
                        className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>

                   <button
  onClick={() => removeFromCart(product.product._id)}
  className="group inline-flex items-center gap-1 text-red-600 text-sm font-medium transition hover:text-red-800"
>
  <svg
    className="w-4 h-4 transition-transform duration-200 group-hover:rotate-90"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
  Remove
</button>

                  </div>

                  {product.product.images?.length > 0 && (
                    <div className="flex gap-2 mt-2 overflow-x-auto">
                      {product.product.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt={`thumb-${idx}`}
                          onClick={() =>
                            setActiveImages((prev) => ({
                              ...prev,
                              [product.product._id]: img,
                            }))
                          }
                          className={`w-20 h-20 object-cover rounded border cursor-pointer transition-all ${
                            activeImages[product.product._id] === img
                              ? "border-purple-500"
                              : "border-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

              </div>
            ))}

            {savedItems.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-3 text-gray-700">
                  Saved for Later
                </h3>
                {savedItems.map(
                  (item) =>
                    item?.productId && (
                      <div
                        key={item.productId}
                        className="bg-gray-100 p-4 rounded-lg flex justify-between items-center mb-3"
                      >
                        <div>
                          <p className="font-semibold text-sm">{item.name}</p>
                          <p className="text-xs text-gray-600">₹{item.price}</p>
                        </div>
                        <button
                          onClick={() => handleMoveToCart(item)}
                          className="text-blue-500 text-xs hover:underline"
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
          <div className="bg-white p-6 rounded-2xl shadow-lg h-fit sticky top-28">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Order Summary
            </h3>
            <p className="text-sm text-gray-700">Total Items: {totalItems}</p>
            <p className="text-lg font-semibold my-3 text-purple-700">
              Total Price: ₹{totalPrice}
            </p>

           
            <button
              onClick={handleProceed}
              className="w-full mt-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
              Proceed to Checkout
            </button>
            <button
  onClick={() => setShowQuotationModal(true)}
  className="w-full mt-2 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
>
  Request Quotation
</button>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <p className="text-lg font-semibold mb-4">
              Proceed to Checkout?
            </p>
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

      {/* Create the Quotation Modal */}
      {showQuotationModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-xl w-96">
      <h3 className="text-lg font-semibold mb-4">Request a Quotation</h3>

      {/* Budget Input */}
      <input
        type="number"
        placeholder="Your budget (₹)"
        value={quotationForm.budget}
        onChange={(e) =>
          setQuotationForm({ ...quotationForm, budget: e.target.value })
        }
        className="w-full p-2 border rounded mb-3 text-sm"
      />

      {/* Special Notes */}
      <textarea
        placeholder="Any special requirements?"
        value={quotationForm.specialNotes}
        onChange={(e) =>
          setQuotationForm({ ...quotationForm, specialNotes: e.target.value })
        }
        className="w-full p-2 border rounded mb-3 text-sm"
      />

      <div className="flex justify-end gap-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={() => setShowQuotationModal(false)}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={handleQuotationSubmit}
        >
          Submit Request
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default CartPage;
