import React, { useState } from 'react';

const TrackOrder = () => {
  const [trackingId, setTrackingId] = useState('');
  const [orderStatus, setOrderStatus] = useState(null);

  // Dummy tracking data (you should replace this with actual API response)
  const dummyTracking = {
    orderId: 'ORD123456',
    steps: ['Order Placed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'],
    currentStep: 3,
  };

  const handleTrack = () => {
    // Simulate fetching tracking data
    if (trackingId === dummyTracking.orderId) {
      setOrderStatus(dummyTracking);
    } else {
      setOrderStatus('notfound');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Track Your Order</h1>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <input
            type="text"
            placeholder="Enter Order ID or Tracking ID"
            className="px-4 py-2 border rounded-md w-full sm:w-auto"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
          />
          <button
            onClick={handleTrack}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-500 transition"
          >
            Track Order
          </button>
        </div>

        {/* Order Status */}
        {orderStatus === 'notfound' ? (
          <p className="text-red-500">No tracking information found for this ID.</p>
        ) : orderStatus ? (
          <div className="mt-10 text-left">
            <h2 className="text-xl font-semibold mb-4">Tracking Order: {orderStatus.orderId}</h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {orderStatus.steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center flex-1 relative">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-bold ${
                      index <= orderStatus.currentStep
                        ? 'bg-green-500'
                        : 'bg-gray-300'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <p className="text-sm mt-2">{step}</p>
                  {index < orderStatus.steps.length - 1 && (
                    <div className="absolute top-5 left-1/2 w-full h-1 bg-gray-200 z-[-1] transform -translate-x-1/2 sm:block hidden">
                      <div
                        className={`h-1 ${
                          index < orderStatus.currentStep ? 'bg-green-500' : 'bg-gray-300'
                        } transition-all duration-300`}
                      ></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TrackOrder;
