import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.js';
import axios from 'axios';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { dispatch } = useCart();

  const handleAddToCart = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('User not authenticated. Cannot add to cart on backend.');
      dispatch({ type: 'ADD_TO_CART', payload: product });
      navigate('/cart');
      return;
    }

    try {
      await axios.post(
        'http://localhost:5000/api/cart/add',
        { _id: product._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({ type: 'ADD_TO_CART', payload: product });
      navigate('/cart');
    } catch (error) {
      console.error('Error adding to cart on backend:', error);
      dispatch({ type: 'ADD_TO_CART', payload: product });
      navigate('/cart');
    } finally {
      const cartState = JSON.parse(localStorage.getItem('cart')) || { items: [] };
      const updatedItems = [...cartState.items];
      const existingItemIndex = updatedItems.findIndex(item => item._id === product._id);

      if (existingItemIndex > -1) {
        updatedItems[existingItemIndex].quantity = (updatedItems[existingItemIndex].quantity || 0) + 1;
      } else {
        updatedItems.push({ ...product, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify({ items: updatedItems }));
    }
  };

  return (
    <div className="w-full sm:w-[300px] bg-white rounded-xl shadow-lg overflow-hidden p-4 flex flex-col justify-between">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-contain rounded-md"
      />
      <div className="mt-4">
        <h3 className="text-sm font-semibold">{product.name}</h3>
        <p className="text-gray-500">{product.category}</p>
        <p className="text-blue-600 font-bold text-lg mt-2">₹{product.price}</p>
      </div>

      <div className="flex flex-col-sm justify-between gap-2 mt-4">
        <button
          onClick={handleAddToCart}
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-3 rounded w-1/2"
        >
          Add to Cart
        </button>
        <button
          onClick={() => console.log("Buy now:", product.name)}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded w-1/2"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;