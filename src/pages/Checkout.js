
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaCashRegister, FaCreditCard } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const location = useLocation();
  const cartItems = location.state?.cart || [];

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    state: "",
    postalCode: "",
  });

//   const handleCODPayment = async () => {
//   // Check if any shipping field is empty
//   const isAnyFieldEmpty = Object.values(shippingInfo).some((value) => value.trim() === "");

//   if (isAnyFieldEmpty) {
//     toast.error("Please fill out all shipping information before placing an order.");
//     return;
//   }

//   try {
//     const res = await fetch("http://localhost:5000/api/payment/place-order", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         amount: totalPrice,
//         paymentMethod: "COD",
//         shippingInfo,
//         cartItems,
//       }),
//     });
//     const data = await res.json();
//     if (data.success) {
//      toast.success("Order placed successfully! You'll pay cash on delivery.");
//     } else {
//      toast.error("There was an error placing your order.");
//     }
//   } catch (error) {
//     console.log("Error placing COD order:", error);
//     toast.error("Error placing the order. Try again!");
//   }
// };

const handleCODPayment = async () => {
  // Log shippingInfo for debugging
  console.log("Shipping Info:", shippingInfo);

  // Check for empty fields and log which one is missing
  const isAnyFieldEmpty = Object.entries(shippingInfo).some(([key, value]) => {
    if (!value || value.trim() === "") {
      console.warn(`Missing field: ${key}`);
      return true;
    }
    return false;
  });

  if (isAnyFieldEmpty) {
    toast.error("Please fill out all shipping information before placing an order.");
    return;
  }

  const payload = {
    totalPrice,
    paymentMethod: "COD",
    shippingAddress: {
      fullName: shippingInfo.fullName,
      phone: shippingInfo.phone,
      address: shippingInfo.address,
      city: shippingInfo.city,
      country: shippingInfo.country,
      postalCode: shippingInfo.postalCode,
    },
    items: cartItems,
  };

  console.log("Payload being sent:", payload);

  try {
    const res = await fetch("https://gsi-backend-1.onrender.com/api/payment/place-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    });

    if (res.status === 500) {
      console.log("Server error:", await res.text());
      toast.error("Internal server error. Please try again.");
      return;
    }

    const data = await res.json();

    if (data.success) {
      toast.success("Order placed successfully! You'll pay cash on delivery.");
      setTimeout(() => {
        window.location.href = "/orders";
      }, 1500);
    } else {
      toast.error(data.message || "There was an error placing your order.");
    }
  } catch (error) {
    console.error("Error placing COD order:", error);
    toast.error("Error placing the order. Try again!");
  }
};



  // const handlePayment = async () => {
  //   try {
  //     const res = await fetch("https://gsi-backend-1.onrender.com/api/payment/create-order", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         amount: totalPrice,
  //         shippingInfo,
  //         cartItems,
  //       }),
  //     });

  //     const data = await res.json();

  //     const options = {
  //       key: "rzp_test_YourKeyHere", // replace with your real Razorpay key
  //       amount: data.amount,
  //       currency: data.currency,
  //       name: "Your Store",
  //       description: "Order Payment",
  //       order_id: data.id,
  //       handler: function (response) {
  //         alert("Payment Successful!");
  //         // optionally: send response.razorpay_payment_id to backend
  //       },
  //       prefill: {
  //         name: shippingInfo.fullName,
  //         email: "kajal@example.com",
  //         contact: shippingInfo.phone,
  //       },
  //       theme: { color: "#6366F1" },
  //     };

  //     const rzp = new window.Razorpay(options);
  //     rzp.open();
  //   } catch (error) {
  //     console.error("Payment Error:", error);
  //     alert("Something went wrong. Try again later.");
  //   }
  // };
const handlePayment = async () => {
  try {
    // 1. Get JWT token (you must have stored it during login)
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please log in to proceed with the payment.");
      return;
    }

    // 2. Make request to backend to create Razorpay order
    const res = await fetch("https://gsi-backend-1.onrender.com/api/payment/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ Send token to backend
      },
      body: JSON.stringify({
        amount: totalPrice,      // Amount in paisa (e.g., 50000 = ₹500)
        shippingInfo,            // Shipping info object
        cartItems,               // List of cart items
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to create Razorpay order");
    }

    // 3. Razorpay options
    const options = {
      key: "rzp_test_YourKeyHere", // ✅ Replace with your Razorpay test/live key
      amount: data.amount,          // Amount in paisa
      currency: data.currency,      // Usually "INR"
      name: "Your Store",
      description: "Order Payment",
      order_id: data.orderId,       // From backend
      handler: function (response) {
        // Optional: Confirm payment with backend
        alert("Payment Successful!");
        console.log("Payment response:", response);
      },
      prefill: {
        name: shippingInfo.fullName,
        email: "kajal@example.com",   // Or fetch from user data
        contact: shippingInfo.phone,
      },
      theme: { color: "#6366F1" },
    };

    // 4. Open Razorpay checkout
    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error("Payment Error:", error);
    alert(error.message || "Something went wrong. Try again later.");
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-100 to-indigo-100 px-4 py-10">
    <ToastContainer/>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-10">
          Checkout
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Shipping Info */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold mb-6 text-gray-700">
              Shipping Information
            </h2>
            <form className="space-y-5">
              <input
                placeholder="Full Name required"
                value={shippingInfo.fullName}
                onChange={(e) =>
                  setShippingInfo({ ...shippingInfo, fullName: e.target.value })
                }
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <input
                placeholder="Phone Number"
                value={shippingInfo.phone}
                onChange={(e) =>
                  setShippingInfo({ ...shippingInfo, phone: e.target.value })
                }
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <input
                placeholder="Address"
                value={shippingInfo.address}
                onChange={(e) =>
                  setShippingInfo({ ...shippingInfo, address: e.target.value })
                }
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <input
                placeholder="City"
                value={shippingInfo.city}
                onChange={(e) =>
                  setShippingInfo({ ...shippingInfo, city: e.target.value })
                }
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <input
                placeholder="Country"
                value={shippingInfo.country}
                onChange={(e) =>
                  setShippingInfo({ ...shippingInfo, country: e.target.value })
                }
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <div className="flex gap-4">
                <input
                  placeholder="State"
                  value={shippingInfo.state}
                  onChange={(e) =>
                    setShippingInfo({ ...shippingInfo, state: e.target.value })
                  }
                  className="w-1/2 border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
               <input
  name="postalCode"
  placeholder="Postal Code"
  value={shippingInfo.postalCode}
  onChange={(e) =>
    setShippingInfo({ ...shippingInfo, postalCode: e.target.value })
  }
  className="w-1/2 border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
/>
              </div>
            </form>
          </div>

          {/* Order Summary + Payment */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold mb-4 text-gray-700">Order Summary</h2>
              <div className="space-y-3 mb-4">
                {cartItems.map((item) => (
                  <div key={item.productId} className="flex justify-between text-gray-700">
                    <span>{item.name} x {item.quantity}</span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 flex justify-between font-bold text-lg text-gray-800">
                <span>Total:</span>
                <span>₹{totalPrice}</span>
              </div>

              {/* Payment Method */}
              <div className="mt-6">
                <h3 className="font-semibold mb-3 text-gray-800">Select Payment Method</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="COD"
                      checked={paymentMethod === "COD"}
                      onChange={() => setPaymentMethod("COD")}
                      className="accent-green-600"
                    />
                    <FaCashRegister className="text-green-500" />
                    <span>Cash on Delivery</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="Online"
                      checked={paymentMethod === "Online"}
                      onChange={() => setPaymentMethod("Online")}
                      className="accent-purple-600"
                    />
                    <FaCreditCard className="text-purple-500" />
                    <span>Pay Online (Razorpay)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Payment Buttons */}
            <div className="mt-8">
              {paymentMethod === "Online" && (
                <button
                  onClick={handlePayment}
                  className="w-full bg-purple-600 hover:bg-purple-700 transition-colors text-white py-3 rounded-lg font-medium shadow-lg"
                >
                  Pay ₹{totalPrice} with Razorpay
                </button>
              )}
              {paymentMethod === "COD" && (
                <button
                  onClick={handleCODPayment}
                  className="w-full bg-green-600 hover:bg-green-700 transition-colors text-white py-3 rounded-lg font-medium shadow-lg"
                >
                  Place COD Order
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
