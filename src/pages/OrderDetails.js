import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(`https://gsi-backend-1.onrender.com/api/payment/order/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setOrder(data);
      } catch (err) {
        console.error('Error fetching order:', err);
        setError('Failed to load order details.');
        toast.error('Failed to load order details.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return <div className="flex justify-center items-center h-screen"><p className="text-xl">Loading...</p></div>;
  if (error) return <div className="flex justify-center items-center h-screen"><p className="text-xl text-red-600">{error}</p></div>;

  const {
    _id,
    createdAt,
    shippingAddress,
    paymentMethod,
    isPaid,
    isDelivered,
    items: orderItems,
    totalPrice
  } = order;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <ToastContainer />
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-800">Order Details</h1>
          <p className="text-sm text-gray-600">Order ID: {_id}</p>
          <p className="text-sm text-gray-600">Placed on: {new Date(createdAt).toLocaleString()}</p>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Shipping Information */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Shipping Information</h2>
            <p><span className="font-medium">Name:</span> {shippingAddress.fullName}</p>
            <p><span className="font-medium">Phone:</span> {shippingAddress.phone}</p>
            <p><span className="font-medium">Address:</span> {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.country} - {shippingAddress.postalCode}</p>
          </div>

          {/* Payment & Status */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Payment & Status</h2>
            <p><span className="font-medium">Method:</span> {paymentMethod}</p>
            <p>
              <span className="font-medium">Paid:</span>{' '}
              {isPaid
                ? <span className="text-green-600 font-semibold">Yes</span>
                : <span className="text-red-600 font-semibold">No</span>}
            </p>
            <p>
              <span className="font-medium">Delivered:</span>{' '}
              {isDelivered
                ? <span className="text-green-600 font-semibold">Yes</span>
                : <span className="text-yellow-600 font-semibold">Pending</span>}
            </p>
          </div>
        </div>

        {/* Items List */}
        <div className="p-6 border-t">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Items</h2>
          <ul className="space-y-4">
            {orderItems.map(item => (
              <li key={item.productId} className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold">₹{item.price * item.quantity}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Summary & Actions */}
        <div className="p-6 border-t flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-lg font-semibold">Order Total:</p>
            <p className="text-2xl font-bold text-indigo-600">₹{totalPrice}</p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Back to Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
