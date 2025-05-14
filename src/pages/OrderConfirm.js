import React from 'react';
import { CheckCircleIcon, ShoppingBagIcon, TruckIcon } from '@heroicons/react/outline';

const OrderConfirm = ({ orderId, totalAmount, items = [], expectedDeliveryDate }) => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Order Confirmation Card */}
        <div className="bg-white shadow-2xl rounded-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-green-500 to-green-700 py-16 text-center text-white">
            <CheckCircleIcon className="w-24 h-24 mx-auto mb-4" />
            <h2 className="text-4xl font-semibold">Order Placed Successfully!</h2>
            <p className="text-lg mt-2">Thank you for shopping with us. Your order is on its way!</p>
          </div>

          {/* Order Summary Section */}
          <div className="px-8 py-10 space-y-6 bg-white">
            <h3 className="text-2xl font-semibold text-gray-800">Order Summary</h3>

            {/* Order Details */}
            <div className="text-lg text-gray-700">
              <div className="flex justify-between">
                <span className="font-semibold">Order ID:</span>
                <span>{orderId}</span>
              </div>
              <div className="flex justify-between mt-4">
                <span className="font-semibold">Total Amount:</span>
                <span className="text-2xl text-gray-900 font-bold">₹{totalAmount}</span>
              </div>
            </div>

            {/* Items List */}
            <div className="mt-6 space-y-6">
              <h4 className="text-xl font-semibold text-gray-800">Items in your order</h4>
              <div className="space-y-4">
                {items && items.length > 0 ? (
                  items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center bg-gray-100 rounded-lg p-4 shadow-sm">
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.image || "https://via.placeholder.com/150"}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-md shadow-md"
                        />
                        <div>
                          <p className="font-semibold text-gray-800">{item.name}</p>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="text-gray-800 font-semibold">₹{item.price * item.quantity}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No items in your order.</p>
                )}
              </div>
            </div>
          </div>

          {/* Shipping and Delivery Info */}
          <div className="px-8 py-6 bg-gray-100">
            <h3 className="text-2xl font-semibold text-gray-800">Shipping & Delivery</h3>
            <div className="space-y-4 mt-6">
              <div className="flex items-center space-x-4">
                <TruckIcon className="w-8 h-8 text-gray-700" />
                <div className="flex-1">
                  <span className="text-gray-600">Expected Delivery Date:</span>
                  <span className="font-semibold text-gray-900">{expectedDeliveryDate}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <ShoppingBagIcon className="w-8 h-8 text-gray-700" />
                <div className="flex-1">
                  <span className="text-gray-600">Shipping Method:</span>
                  <span className="font-semibold text-gray-900">Standard Shipping</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Section */}
          <div className="px-8 py-8 bg-white flex justify-between items-center">
            <button className="bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-full text-xl transition duration-300">
              Continue Shopping
            </button>
            <p className="text-sm text-gray-600">
              Need help? <a href="/support" className="text-green-600 hover:underline">Contact Support</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirm;
