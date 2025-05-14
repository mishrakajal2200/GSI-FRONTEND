export const getCart = () => {
  const data = localStorage.getItem("cart");
  return data ? JSON.parse(data) : [];
};

export const saveCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};
