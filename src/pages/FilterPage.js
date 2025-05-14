import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ImageCard from "../components/ImageCard.js"; // Assuming your ImageCard component is in the same folder

const FilterPage = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const location = useLocation();

  // Assuming you have a list of all products
  const shopByCategories = [
    { name: "Messenger", children: ["Laptop Messenger", "Briefcase"] },
    { name: "Duffle Backpack", children: ["Travel Duffle", "Gym Duffle"] },
    { name: "Luggage", children: ["Cabin Luggage", "Check-In Suitcase"] },
    "Backpack",
    "Laptop Backpack",
    "Office Bags",
    "Kitchen",
  ];

  useEffect(() => {
    // Parse the query parameters from the URL
    const queryParams = new URLSearchParams(location.search);
    const brand = queryParams.get("brand");
    const category = queryParams.get("category");

    // Filter products based on the query parameters
    let filtered = shopByCategories;

    if (brand) {
      filtered = filtered.filter((product) => product.brand === brand);
    }

    if (category) {
      filtered = filtered.filter((product) => product.mainCategory === category);
    }

    setFilteredProducts(filtered);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Filtered Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ImageCard key={product.id} product={product} type={product.brand ? "brand" : "category"} />
          ))
        ) : (
          <p className="text-center text-gray-500">No products found</p>
        )}
      </div>
    </div>
  );
};

export default FilterPage;
