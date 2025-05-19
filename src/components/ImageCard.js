

import { useNavigate } from "react-router-dom";

const ImageCard = ({ product, type }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Use brand or mainCategory based on type
    const value = type === "brand" ? product.brand : product.mainCategory;

    if (value) {
      const encodedValue = encodeURIComponent(value);

      if (type === "brand") {
        navigate(`/filter?brand=${encodedValue}`);
      } else {
        navigate(`/filter?category=${encodedValue}`);
      }
    } else {
      console.error("Error: Invalid product data (brand/mainCategory not defined)");
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group relative h-64 rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
    >
      {/* Product Image */}
      <div className="aspect-w-1 aspect-h-1 w-full bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-4 transform group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 text-center">
        <h3 className="text-base md:text-sm font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm md:text-base text-green-600 font-medium mt-1">₹{product.price}</p>
        <p className="text-xs md:text-sm text-gray-500 mt-2 line-clamp-2">{product.description}</p>
      </div>
    </div>
  );
};

export default ImageCard;
