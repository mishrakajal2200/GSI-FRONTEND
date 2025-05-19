// import React from 'react';

// const OrderHistory = () => {
//   // Sample order data (you can replace this with real data from your backend)
//   const orders = [
//     {
//       id: 'ORD123456',
//       date: '2025-04-20',
//       total: 1899,
//       status: 'Delivered',
//     },
//     {
//       id: 'ORD123457',
//       date: '2025-04-15',
//       total: 2999,
//       status: 'Shipped',
//     },
//     {
//       id: 'ORD123458',
//       date: '2025-04-10',
//       total: 999,
//       status: 'Cancelled',
//     },
//   ];

//   return (
//     <div className="bg-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-sans">
//       <div className="max-w-5xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Order History</h1>
        
//         {orders.length === 0 ? (
//           <p className="text-center text-gray-600">You have no past orders.</p>
//         ) : (
//           <div className="bg-white shadow-md rounded-lg overflow-hidden">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-indigo-600 text-white">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Order ID</th>
//                   <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Date</th>
//                   <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Status</th>
//                   <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Total</th>
//                   <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100 bg-white text-gray-700">
//                 {orders.map((order) => (
//                   <tr key={order.id} className="hover:bg-gray-50 transition duration-200">
//                     <td className="px-6 py-4 font-medium">{order.id}</td>
//                     <td className="px-6 py-4">{order.date}</td>
//                     <td className="px-6 py-4">
//                       <span
//                         className={`px-3 py-1 text-sm font-medium rounded-full ${
//                           order.status === 'Delivered'
//                             ? 'bg-green-100 text-green-700'
//                             : order.status === 'Shipped'
//                             ? 'bg-yellow-100 text-yellow-700'
//                             : 'bg-red-100 text-red-700'
//                         }`}
//                       >
//                         {order.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 font-semibold">₹{order.total}</td>
//                     <td className="px-6 py-4">
//                       <button className="text-indigo-600 hover:underline text-sm">
//                         View Details
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OrderHistory;





// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const OrderHistory = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchOrders = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/payment/get-orders', {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}` // send auth token if required
//         }
//       });
//       setOrders(res.data);
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   if (loading) return <p className="text-center mt-20">Loading orders...</p>;

//   return (
//     <div className="bg-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-sans">
//       <div className="max-w-5xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Order History</h1>
        
//         {orders.length === 0 ? (
//           <p className="text-center text-gray-600">You have no past orders.</p>
//         ) : (
//           <div className="bg-white shadow-md rounded-lg overflow-hidden">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-indigo-600 text-white">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Order ID</th>
//                   <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Date</th>
//                   <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Status</th>
//                   <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Total</th>
//                   <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100 bg-white text-gray-700">
//                 {orders.map((order) => (
//                   <tr key={order._id} className="hover:bg-gray-50 transition duration-200">
//                     <td className="px-6 py-4 font-medium">{order._id}</td>
//                     <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
//                     <td className="px-6 py-4">
//                       <span
//                         className={`px-3 py-1 text-sm font-medium rounded-full ${
//                           order.status === 'Delivered'
//                             ? 'bg-green-100 text-green-700'
//                             : order.status === 'Shipped'
//                             ? 'bg-yellow-100 text-yellow-700'
//                             : 'bg-red-100 text-red-700'
//                         }`}
//                       >
//                         {order.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 font-semibold">₹{order.total}</td>
//                     <td className="px-6 py-4">
//                       <button className="text-indigo-600 hover:underline text-sm">
//                         View Details
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OrderHistory;





// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {  useNavigate } from 'react-router-dom'; // or useNavigate in v6

// const OrderHistory = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const { data } = await axios.get(
//           '/api/payment/get-orders',
//           { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
//         );
//         setOrders(data);
//       } catch (err) {
//         console.error('Error fetching orders:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, []);

//   if (loading) return <p className="text-center mt-20">Loading orders...</p>;

//   return (
//     <div className="bg-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-sans">
//       <div className="max-w-5xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
//           Your Order History
//         </h1>

//         {orders.length === 0 ? (
//           <p className="text-center text-gray-600">You have no past orders.</p>
//         ) : (
//           <div className="bg-white shadow-md rounded-lg overflow-hidden">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-indigo-600 text-white">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Order ID</th>
//                   <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Date</th>
//                   <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Status</th>
//                   <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Total</th>
//                   <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100 bg-white text-gray-700">
//                 {orders.map(order => (
//                   <tr key={order._id} className="hover:bg-gray-50 transition duration-200">
//                     <td className="px-6 py-4 font-medium">{order._id}</td>
//                     <td className="px-6 py-4">
//                       {new Date(order.createdAt).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4">
//                       <span
//                         className={`px-3 py-1 text-sm font-medium rounded-full ${
//                           order.isDelivered
//                             ? 'bg-green-100 text-green-700'
//                             : order.isPaid
//                             ? 'bg-yellow-100 text-yellow-700'
//                             : 'bg-red-100 text-red-700'
//                         }`}
//                       >
//                         {order.isDelivered
//                           ? 'Delivered'
//                           : order.isPaid
//                           ? 'Paid'
//                           : 'Processing'}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 font-semibold">₹{order.totalPrice}</td>
//                     <td className="px-6 py-4">
//                       <button
//                         className="text-indigo-600 hover:underline text-sm"
//                         onClick={() => navigate(`/orders/${order._id}`)}
//                       >
//                         View Details
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OrderHistory;




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('/api/payment/get-orders', {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        console.log("Fetched data:", data); // Debug log
        setOrders(data.orders || []); // ✅ Fixed: Extract orders array
      } catch (err) {
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p className="text-center mt-20">Loading orders...</p>;

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Your Order History
        </h1>

        {orders.length === 0 ? (
          <p className="text-center text-gray-600">You have no past orders.</p>
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Order ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Total</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white text-gray-700">
                {orders.map(order => (
                  <tr key={order._id} className="hover:bg-gray-50 transition duration-200">
                    <td className="px-6 py-4 font-medium">{order._id}</td>
                    <td className="px-6 py-4">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-sm font-medium rounded-full ${
                          order.isDelivered
                            ? 'bg-green-100 text-green-700'
                            : order.isPaid
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {order.isDelivered
                          ? 'Delivered'
                          : order.isPaid
                          ? 'Paid'
                          : 'Processing'}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold">₹{order.totalPrice}</td>
                    <td className="px-6 py-4">
                      <button
                        className="text-indigo-600 hover:underline text-sm"
                        onClick={() => navigate(`/orders/${order._id}`)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
