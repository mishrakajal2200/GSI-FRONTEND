// src/pages/AmericanTourister.jsx

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import ProductCard from "../components/AmericanProductCard.js";
import luggage from "../images/at-4.jpg";
import  accessries from "../images/ameircan-lock.webp";
import kamiliant from "../images/Kamilian.webp";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const categories = [
  {
    title: "AT",
    img: luggage,
  },
  {
    title: "Kamiliant",
    img: kamiliant,
  },
  {
    title: "Accessries",
    img: accessries,
  },
];

const Americanpage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/americanproduct/american");
        const data = await res.json();



        setProducts(data);
        setFilteredProducts(data); // Initially show all products
      } catch (error) {
        console.error("Error fetching american products:", error);
      }
    };

    fetchProducts();
  }, []);

  const filterProductsByCategory = (categoryTitle) => {
    setActiveCategory(categoryTitle);
    if (categoryTitle === null) {
      setFilteredProducts(products); // Show all products
    } else {
      const filtered = products.filter(
        (product) => product.category && product.category.toLowerCase() === categoryTitle.toLowerCase()
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100">
      {/* Category Cards */}
      <h1 className="text-3xl font-extrabold mb-8 text-center text-indigo-800">✨Explore Categories✨</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center max-w-6xl mx-auto">
        {categories.map((cat, idx) => (
          <motion.div
            key={idx}
            onClick={() => filterProductsByCategory(cat.title)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`flex flex-col items-center gap-1 cursor-pointer ${
              activeCategory === cat.title ? "opacity-100" : "opacity-70 hover:opacity-100"
            }`}
          >
            <img
              src={cat.img}
              alt={cat.title}
              className="w-full h-60 bg-white object-contain md:w-2/3 rounded-xl shadow-md"
            />
            <h3 className="text-xl font-bold text-gray-700">{cat.title}</h3>
          </motion.div>
        ))}
        {activeCategory && (
          <motion.button
            onClick={() => filterProductsByCategory(null)}
            className="mt-6 px-4 py-2 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Show All
          </motion.button>
        )}
      </div>

      {/* Products */}
      <h2 className="text-2xl font-extrabold mt-14 mb-6 text-center text-indigo-800">🪶Featured Products🪶</h2>
      <div className="flex flex-wrap gap-6 justify-center max-w-7xl mx-auto">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((prod) => (
            <motion.div
              key={prod._id}
              whileHover={{
                scale: 1.03,
                boxShadow: "0px 0px 25px rgba(255, 0, 150, 0.3)",
              }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard product={prod} />
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-600">
            {activeCategory ? `No products found for ${activeCategory}` : "Loading or no products found..."}
          </p>
        )}
      </div>
    </div>
  );
};

export default Americanpage;