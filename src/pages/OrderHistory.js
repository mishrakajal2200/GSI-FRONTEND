
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaMoneyBill, FaBoxOpen, FaMapMarkerAlt } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(
          "https://gsi-backend-1.onrender.com/api/payment/get-orders",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setOrders(data.orders || []);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
        Loading your orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-10">
          🛒 Your Order History
        </h1>

        {orders.length === 0 ? (
          <div className="text-center text-gray-600 text-lg">
            You haven't placed any orders yet.
            <br />
            <button
              onClick={() => navigate("/")}
              className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
            >
              Go to Shop
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition p-6"
              >
                <div className="flex justify-between flex-wrap items-center mb-4">
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    <FaBoxOpen className="text-indigo-500" />
                    <span className="font-semibold">Order ID:</span> {order._id}
                  </div>
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    <MdDateRange className="text-green-600" />
                    {new Date(order.createdAt).toLocaleString()}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-gray-700">
                  <div className="flex items-center gap-2">
                    <FaMoneyBill className="text-green-500" />
                    <span>
                      <strong>Total:</strong> ₹{order.totalPrice}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMoneyBill className="text-yellow-600" />
                    <span>
                      <strong>Payment:</strong> {order.paymentMethod}
                    </span>
                  </div>
                  <div>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`inline-block px-2 py-1 text-sm font-medium rounded-full ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status || "Processing"}
                    </span>
                  </div>
                </div>

                <div className="mt-6 border-t pt-4">
                  <h3 className="font-semibold text-gray-800 mb-1 flex items-center gap-1">
                    <FaMapMarkerAlt className="text-indigo-500" />
                    Shipping Address:
                  </h3>
                  <p className="text-sm text-gray-600 leading-6 ml-6">
                    {order.shippingAddress.fullName}, {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city}, {order.shippingAddress.country} -{" "}
                    {order.shippingAddress.postalCode}
                    <br />
                    Phone: {order.shippingAddress.phone}
                  </p>
                </div>

                <div className="mt-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Items:</h3>
                  <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                    {order.items.map((item, idx) => (
                      <li key={idx}>
                        <span className="font-medium text-gray-700">{item.name}</span> x{" "}
                        {item.quantity} = ₹{item.price * item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
