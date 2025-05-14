
import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import ProductList from "../components/PrductCard.js";
import carltonImg from "../images/carlton.webp";
import skybags from "../images/skybags-buddy.webp";
import accessries from "../images/vip-accessries.avif";

const categories = [
  { title: "Carlton", img: carltonImg },
  { title: "Accessories", img: accessries },
  { title: "Skybags", img: skybags },
];

const priceRanges = [
  { label: "Under ₹1000", value: "under1000" },
  { label: "₹1000 - ₹3000", value: "1000-3000" },
  { label: "Above ₹3000", value: "above3000" },
];

const sortOptions = [
  { label: "Price: Low to High", value: "low" },
  { label: "Price: High to Low", value: "high" },
];

const VIPpages = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  const applyFilters = useCallback(() => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory && selectedCategory !== "All") {
      filtered = filtered.filter(
        (p) => p.subCategory?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by price
    if (selectedPriceRange) {
      filtered = filtered.filter((p) => {
        if (!p.price) return false;
        if (selectedPriceRange === "under1000") return p.price < 1000;
        if (selectedPriceRange === "1000-3000") return p.price >= 1000 && p.price <= 3000;
        if (selectedPriceRange === "above3000") return p.price > 3000;
        return true;
      });
    }

    // Sort products
    if (sortOrder === "low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, selectedPriceRange, sortOrder]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products?brand=VIP`);
        const data = await res.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [selectedCategory, selectedPriceRange, sortOrder, applyFilters]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 via-pink-300 to-yellow-300 py-12 px-6">
      {/* Header */}
      <header className="text-center mb-12 text-white">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">
          Discover Premium VIP Products
        </h1>
        <p className="text-lg">Shop your favorites with exclusive deals</p>
      </header>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto mb-12">
        <h2 className="text-3xl font-semibold text-white mb-8 text-center">
          🛍️ Explore Categories 🛍️
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 justify-center mx-auto md:w-2/3 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              onClick={() => setSelectedCategory(cat.title)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`relative overflow-hidden rounded-xl shadow-lg cursor-pointer transition-all transform hover:scale-105`}
            >
              <img
                src={cat.img}
                alt={cat.title}
                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white text-2xl font-bold">
                {cat.title}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Filters Section */}
      <section className="max-w-7xl mx-auto mb-12">
  <div className="flex flex-col lg:flex-row items-center lg:justify-center gap-4 mb-6">
    <div className="flex flex-wrap justify-center gap-4">
      <select
        onChange={(e) => setSelectedPriceRange(e.target.value)}
        value={selectedPriceRange || ""}
        className="px-6 py-3 rounded-md border-2 border-gray-300 focus:ring-indigo-500 focus:outline-none"
      >
        <option value="">Price Range</option>
        {priceRanges.map((price) => (
          <option key={price.value} value={price.value}>
            {price.label}
          </option>
        ))}
      </select>

      <select
        onChange={(e) => setSortOrder(e.target.value)}
        value={sortOrder || ""}
        className="px-6 py-3 rounded-md border-2 border-gray-300 focus:ring-indigo-500 focus:outline-none"
      >
        <option value="">Sort By</option>
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>

    {(selectedCategory || selectedPriceRange || sortOrder) && (
      <button
        onClick={() => {
          setSelectedCategory(null);
          setSelectedPriceRange(null);
          setSortOrder(null);
          setFilteredProducts(products);
        }}
        className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-all"
      >
        Reset Filters
      </button>
    )}
  </div>
</section>


      {/* Featured Products */}
      <section className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-white mb-8 text-center">
          🌟 Featured Products 🌟
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductList key={product._id} product={product} />
            ))
          ) : (
            <p className="text-center text-gray-400">No products found with the applied filters.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default VIPpages;
