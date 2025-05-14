import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import ProductCard from "../components/CosmosProducts.js";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Cosmos = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/cosmosproducts/cosmos");
        const data = await res.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Harissons products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100">
      <h1 className="text-3xl font-extrabold mb-10 text-center text-indigo-800">
        ✨ Cosmos Products Collection ✨
      </h1>

      <div className="flex flex-wrap gap-6 justify-center max-w-7xl mx-auto">
        {loading ? (
          <p className="text-center text-gray-600">Loading products...</p>
        ) : products.length > 0 ? (
          products.map((prod) => (
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
          <p className="text-center text-gray-600">No Cosmos products found.</p>
        )}
      </div>
    </div>
  );
};

export default Cosmos;
