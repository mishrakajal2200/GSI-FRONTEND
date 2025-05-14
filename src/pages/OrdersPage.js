// components/OrdersPage.js
import React, { useContext, useEffect } from "react";
import { OrderContext } from "../context/OrderContext";

const OrdersPage = () => {
  const { orders, loading, error, fetchOrders } = useContext(OrderContext);

  // Fetch orders when the component mounts
  useEffect(() => {
    const userId = "123"; // Replace with dynamic user ID
    fetchOrders(userId);
  }, [fetchOrders]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div>
          {orders.map((order) => (
            <div key={order._id} style={{ border: "1px solid #ddd", margin: "10px", padding: "10px" }}>
              <h3>Order ID: {order._id}</h3>
              <p>Status: {order.orderStatus}</p>
              <p>Total: ${order.totalAmount}</p>
              <p>Payment: {order.paymentStatus}</p>
              <p>Address: {order.shippingAddress.street}, {order.shippingAddress.city}</p>
              <div>
                {order.items.map((item, index) => (
                  <div key={index}>
                    <p>Product: {item.product.name} (x{item.quantity}) - ${item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
