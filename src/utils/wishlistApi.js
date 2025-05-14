// utils/wishlistApi.js
import axios from "axios";

export const fetchWishlist = async (token) => {
  const { data } = await axios.get("/api/wishlist", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const addToWishlist = async (productId, token) => {
  const { data } = await axios.post(
    "/api/wishlist/add",
    { productId },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data;
};

export const removeFromWishlist = async (productId, token) => {
  const { data } = await axios.delete(`/api/wishlist/remove/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
