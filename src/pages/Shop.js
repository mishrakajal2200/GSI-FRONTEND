
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaHeart, FaRegHeart, FaTags } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// 🟡 Extracted outside the component
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Shop = () => {
  const [sortOption] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [brandsData, setBrandsData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [openBrand, setOpenBrand] = useState(null);
  const [openCategories, setOpenCategories] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false); // State for mobile filter visibility

  const query = useQuery();
  const defaultCategory = query.get("category");

  const navigate = useNavigate();
  const location = useLocation();

  const { cart, addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const isInWishlist = (product) =>
    wishlist.some((item) => item._id === product._id);

  useEffect(() => {
    if (defaultCategory) {
      setSelectedCategories([defaultCategory]);
    }
  }, [defaultCategory]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [brandRes, categoryRes] = await Promise.all([
          axios.get("https://gsi-backend-1.onrender.com/api/filters/brands"),
          axios.get("https://gsi-backend-1.onrender.com/api/filters/categories"),
        ]);
        console.log("Brand response:", brandRes.data);
        console.log("Category response:", categoryRes.data);
        setBrandsData(brandRes.data);
        setCategoriesData(categoryRes.data);
        if (defaultCategory) {
          setSelectedCategories([defaultCategory]);
        }
      } catch (error) {
        console.error("Error fetching filter data:", error);
      }
    };
    fetchFilters();
  }, [defaultCategory]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust breakpoint as needed
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleCategory = (categoryName) => {
    setOpenCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((name) => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  useEffect(() => {
    const fetchProducts = async () => {
      if (location.state?.searchResults) {
        setProducts(location.state.searchResults);
      } else {
        try {
          const brandQuery = selectedBrands.join(",");
          const categoryQuery = selectedCategories.join(",");
          const res = await axios.get("https://gsi-backend-1.onrender.com/api/getproducts/products", {
            params: {
              brands: brandQuery,
              categories: categoryQuery,
              sort: sortOption,
            },
          });
          setProducts(res.data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      }
    };
    fetchProducts();
  }, [selectedBrands, selectedCategories, sortOption, location.state]);

  const handleAddToCart = (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const isAlreadyInCart = cart.some(
      (item) => item.productId === product._id || item._id === product._id
    );

    if (isAlreadyInCart) {
      toast.warning("Product is already in the cart");
      return;
    }

    addToCart(product);
  };

  const handleWishlistClick = (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      toggleWishlist(productId);
    }
  };

  const handleCategoryChange = (categoryName) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((c) => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  const handleBrandChange = (brandName) => {
    setSelectedBrands((prevSelectedBrands) =>
      prevSelectedBrands.includes(brandName)
        ? prevSelectedBrands.filter((name) => name !== brandName)
        : [...prevSelectedBrands, brandName]
    );
  };


  const toggleSubcategories = (brandName) => {
    setOpenBrand((prevOpenBrand) =>
      prevOpenBrand === brandName ? null : brandName
    );
  };

  const toggleWishlist = (productId) => {
    const product = products.find((p) => p._id === productId);
    if (!product) return;
    isInWishlist(product)
      ? removeFromWishlist(productId)
      : addToWishlist(productId);
  };


  const renderSubcategories = (items, level = 0) => {
    const marginLeft = level * 12;

    return (
      <ul className="mt-1 space-y-1 text-sm text-white" style={{ marginLeft }}>
        {items.map((item, index) => {
          if (typeof item === "string") {
            return (
              <li key={`${item}-${index}`} className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 accent-purple-500 h-4 w-4"
                  onChange={() => handleCategoryChange(item)}
                  checked={selectedCategories.includes(item)}
                />
                <label className="cursor-pointer">{item}</label>
              </li>
            );
          }

          const name = item?.name;
          const children = Array.isArray(item?.children) ? item.children : [];
          const isOpen = openCategories.includes(name);

          return (
            <li key={name + index} className="flex flex-col">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 accent-purple-500 h-4 w-4"
                    onChange={() => handleCategoryChange(name)}
                    checked={selectedCategories.includes(name)}
                  />
                  <label className="cursor-pointer font-semibold">{name}</label>
                </div>
                {children.length > 0 && (
                  <span
                    className="cursor-pointer text-purple-300 hover:text-purple-500 text-sm"
                    onClick={() => toggleCategory(name)}
                  >
                    {isOpen ? "▲" : "▼"}
                  </span>
                )}
              </div>

              {isOpen && renderSubcategories(children, level + 1)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="bg-gradient-to-br from-purple-300 via-pink-300 to-yellow-300 min-h-screen py-10">
      <ToastContainer />
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Shop Our Products</h1>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Conditionally render the sidebar on non-mobile screens */}
          {!isMobile && (
            <aside className="md:w-1/4 bg-gradient-to-br from-gray-800 via-gray-900 to-black p-6 rounded-xl shadow-lg sticky top-6 text-white">
              <h2 className="text-2xl font-bold mb-6 text-purple-400 tracking-wide flex items-center gap-2">
                <FaTags /> Filters
              </h2>
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3 border-b border-gray-700 pb-1">Brands</h3>
                <ul className="space-y-2">
                  {brandsData.map((brand, index) => (
                    <li key={brand.name + index} className="flex flex-col">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="mr-2 accent-purple-500 h-4 w-4"
                            onChange={() => handleBrandChange(brand.name)}
                            checked={selectedBrands.includes(brand.name)}
                          />
                          <label className="cursor-pointer">{brand.name}</label>
                        </div>
                        {brand.subcategories.length > 0 && (
                          <span
                            className="cursor-pointer text-purple-300 hover:text-purple-500 text-sm"
                            onClick={() => toggleSubcategories(brand.name)}
                          >
                            {openBrand === brand.name ? "▲" : "▼"}
                          </span>
                        )}
                      </div>
                      {brand.subcategories.length > 0 && openBrand === brand.name && (
                        <ul className="ml-4 space-y-1 mt-1">
                          {renderSubcategories(brand.subcategories)}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 border-b border-gray-700 pb-1">Categories</h3>
                {renderSubcategories(categoriesData)}
              </div>
            </aside>
          )}

          <section className="flex-1">
            <div className="flex justify-between mb-6">     
              {/* Button to show filters on mobile */}
              {isMobile && (
                <button
                  onClick={() => setShowMobileFilters(true)} // Set state to show mobile filters
                  className="bg-purple-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-purple-600 transition"
                >
                  Show Filters
                </button>
              )}
            </div>

            {/* Mobile Filter Section (conditionally rendered) */}
            {isMobile && showMobileFilters && (
              <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-white mb-8">
                <h2 className="text-2xl font-bold mb-6 text-purple-400 tracking-wide flex items-center gap-2">
                  <FaTags /> Filters
                </h2>
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3 border-b border-gray-700 pb-1">Brands</h3>
                  <ul className="space-y-2">
                    {brandsData.map((brand, index) => (
                      <li key={brand.name + index} className="flex flex-col">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              className="mr-2 accent-purple-500 h-4 w-4"
                              onChange={() => handleBrandChange(brand.name)}
                              checked={selectedBrands.includes(brand.name)}
                            />
                            <label className="cursor-pointer">{brand.name}</label>
                          </div>
                          {brand.subcategories.length > 0 && (
                            <span
                              className="cursor-pointer text-purple-300 hover:text-purple-500 text-sm"
                              onClick={() => toggleSubcategories(brand.name)}
                            >
                              {openBrand === brand.name ? "▲" : "▼"}
                            </span>
                          )}
                        </div>
                        {brand.subcategories.length > 0 && openBrand === brand.name && (
                          <ul className="ml-4 space-y-1 mt-1">
                            {renderSubcategories(brand.subcategories)}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 border-b border-gray-700 pb-1">Categories</h3>
                  {renderSubcategories(categoriesData)}
                </div>
                {/* Option to close the mobile filters */}
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="bg-purple-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-purple-600 transition mt-4 w-full"
                >
                  Close Filters
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="flex flex-col bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 group h-full"
                >
                  {/* Image Section */}
                  <div className="relative overflow-hidden rounded-t-2xl">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-52 object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                    <button
                      className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md text-red-500 hover:scale-110 transition"
                      onClick={() => handleWishlistClick(product._id)}
                    >
                      {isInWishlist(product) ? <FaHeart /> : <FaRegHeart />}
                    </button>
                  </div>

                  {/* Info Section */}
                  <div className="flex flex-col justify-between flex-grow p-4">
                    <div>
                      <h4 className="text-lg font-bold text-gray-800 mb-1">{product.name}</h4>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-purple-600 text-lg font-bold">₹{product.price}</span>
                        <span className="text-gray-400 text-sm line-through">₹{product.mrp}</span>

                      </div>
                    </div>

                    {/* Add to Cart */}
                    <button
                      className="mt-4 bg-purple-600 w-full text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
                      onClick={() => handleAddToCart(product)}
                    >
                      <HiOutlineShoppingBag className="inline-block mr-1" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Shop;