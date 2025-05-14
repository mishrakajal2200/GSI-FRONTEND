import React, { createContext, useReducer } from "react";

// Initial state
const initialState = {
  orders: [],
  loading: false,
  error: null,
};

// Reducer to manage actions
const orderReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_ORDERS":
      return { ...state, loading: true };
    case "FETCH_ORDERS_SUCCESS":
      return { ...state, loading: false, orders: action.payload };
    case "FETCH_ORDERS_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  // Fetch orders for a specific user
  const fetchOrders = async (userId) => {
    dispatch({ type: "FETCH_ORDERS" });

    try {
      const response = await fetch(`/api/orders/${userId}`);
      
      // Check if the response is valid and if it has a successful status
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const data = await response.json();

      // Handle case where data might be empty or invalid
      if (data && Array.isArray(data)) {
        dispatch({ type: "FETCH_ORDERS_SUCCESS", payload: data });
      } else {
        throw new Error('Invalid data format');
      }
    } catch (error) {
      // Improved error handling
      const errorMessage = error.message || 'Something went wrong!';
      dispatch({ type: "FETCH_ORDERS_ERROR", payload: errorMessage });
    }
  };

  return (
    <OrderContext.Provider value={{ ...state, fetchOrders }}>
      {children}
    </OrderContext.Provider>
  );
};
