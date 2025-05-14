// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ProductCard from '../components/PrductCard.js';

// const shopByBrands = [
//   {
//     name: "VIP",
//     subcategories: [
//       { name: "Carlton", subsubcategories: [] },
//       { name: "Accessories", subsubcategories: [] },
//       { name: "Skybags", subsubcategories: [] }
//     ]
//   },
//   {
//     name: "American Tourister",
//     subcategories: [
//       { name: "AT", subsubcategories: [] },
//       { name: "Kamalian", subsubcategories: [] },
//       { name: "Accessories", subsubcategories: [] }
//     ]
//   },
//   {
//     name: "Safari",
//     subcategories: [
//       { name: "Safari", subsubcategories: [] },
//       { name: "Jungle", subsubcategories: [] },
//       { name: "Accessories", subsubcategories: [] }
//     ]
//   },
//   {
//     name: "Prestige",
//     subcategories: [
//       { name: "Kitchen Utensils and Cookware", subsubcategories: ["Cooking Appliances", "Food Preparation Appliances", "Kitchen Gadgets"] },
//       { name: "Kitchen Appliances", subsubcategories: ["Cooking Appliances", "Food Preparation Appliances", "Kitchen Gadgets"] }
//     ]
//   },
//   {
//     name: "GSI Enterprises",
//     subcategories: [
//       { name: "Corporate Gift Items", subsubcategories: [] },
//       { name: "Leather Products", subsubcategories: [] },
//       { name: "Promotional Items", subsubcategories: [] }
//     ]
//   }
// ];

// const CorporateGift = () => {
//   const [sortOption, setSortOption] = useState('');
//   const [expandedBrands, setExpandedBrands] = useState({});
//   const [selectedBrands, setSelectedBrands] = useState([]);
//   const [selectedSubcategories, setSelectedSubcategories] = useState([]);
//   const [selectedSubsubcategories, setSelectedSubsubcategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [wishlist, setWishlist] = useState([]);

//   const toggleWishlist = (productId) => {
//     setWishlist((prev) =>
//       prev.includes(productId)
//         ? prev.filter((id) => id !== productId)
//         : [...prev, productId]
//     );
//   };

//   const toggleBrand = (brand) => {
//     setExpandedBrands((prev) => ({
//       ...prev,
//       [brand]: !prev[brand],
//     }));
//   };

//   const handleBrandChange = (brand) => {
//     setSelectedBrands((prev) =>
//       prev.includes(brand)
//         ? prev.filter((b) => b !== brand)
//         : [...prev, brand]
//     );
//   };

//   const handleSubcategoryChange = (subcategory) => {
//     setSelectedSubcategories((prev) =>
//       prev.includes(subcategory)
//         ? prev.filter((s) => s !== subcategory)
//         : [...prev, subcategory]
//     );
//   };

//   const handleSubsubcategoryChange = (subsubcategory) => {
//     setSelectedSubsubcategories((prev) =>
//       prev.includes(subsubcategory)
//         ? prev.filter((s) => s !== subsubcategory)
//         : [...prev, subsubcategory]
//     );
//   };

//   useEffect(() => {
//     const fetchCorporateGiftingProducts = async () => {
//       try {
//         const res = await axios.get('/api/products', {
//           params: { mainCategory: 'Corporate Gifting' },
//         });
//         setProducts(res.data);
//       } catch (error) {
//         console.error('Error fetching corporate gifting products:', error);
//       }
//     };

//     fetchCorporateGiftingProducts();
//   }, []);

//   const filteredProducts = products
//     .filter((product) =>
//       (selectedBrands.length === 0 || selectedBrands.includes(product.brand)) &&
//       (selectedSubcategories.length === 0 || selectedSubcategories.includes(product.subcategory)) &&
//       (selectedSubsubcategories.length === 0 || selectedSubsubcategories.includes(product.subsubcategory))
//     )
//     .sort((a, b) => {
//       if (sortOption === 'low') return a.price - b.price;
//       if (sortOption === 'high') return b.price - a.price;
//       return 0;
//     });

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-300 via-pink-300 to-yellow-300 text-white font-sans p-4 md:p-8">
//       <div className="flex flex-col md:flex-row md:space-x-8">
//         {/* Sidebar */}
//         <aside className="md:w-1/4 bg-gray-800 p-4 rounded-xl shadow-lg">
//           <h2 className="text-2xl font-bold mb-4 border-b border-gray-600 pb-2">Filters</h2>
//           <div className="space-y-4">
//             {/* Brands */}
//             <div>
//               <h3 className="text-lg font-semibold">Shop by Brands</h3>
//               <ul className="mt-2 space-y-1">
//                 {shopByBrands.map((brandObj, index) => (
//                   <li key={index}>
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center">
//                         <input
//                           type="checkbox"
//                           id={`brand-${brandObj.name}`}
//                           className="mr-2 accent-purple-500"
//                           onChange={() => handleBrandChange(brandObj.name)}
//                         />
//                         <label htmlFor={`brand-${brandObj.name}`} className="text-sm">{brandObj.name}</label>
//                       </div>
//                       {brandObj.subcategories.length > 0 && (
//                         <button onClick={() => toggleBrand(brandObj.name)} className="text-purple-400">
//                           {expandedBrands[brandObj.name] ? '−' : '+'}
//                         </button>
//                       )}
//                     </div>
//                     {expandedBrands[brandObj.name] && (
//                       <ul className="ml-6 mt-1 text-sm text-gray-300 space-y-1">
//                         {brandObj.subcategories.map((sub, i) => (
//                           <li key={i}>
//                             <div className="flex items-center justify-between">
//                               <div className="flex items-center">
//                                 <input
//                                   type="checkbox"
//                                   id={`subcategory-${sub.name}`}
//                                   className="mr-2 accent-purple-500"
//                                   onChange={() => handleSubcategoryChange(sub.name)}
//                                 />
//                                 <label htmlFor={`subcategory-${sub.name}`} className="text-sm">{sub.name}</label>
//                               </div>
//                               {sub.subsubcategories.length > 0 && (
//                                 <button onClick={() => toggleBrand(sub.name)} className="text-purple-400">
//                                   {expandedBrands[sub.name] ? '−' : '+'}
//                                 </button>
//                               )}
//                             </div>
//                             {sub.subsubcategories.length > 0 && expandedBrands[sub.name] && (
//                               <ul className="ml-6 mt-1 text-sm text-gray-300 space-y-1">
//                                 {sub.subsubcategories.map((subsub, j) => (
//                                   <li key={j}>
//                                     <div className="flex items-center">
//                                       <input
//                                         type="checkbox"
//                                         id={`subsubcategory-${subsub}`}
//                                         className="mr-2 accent-purple-500"
//                                         onChange={() => handleSubsubcategoryChange(subsub)}
//                                       />
//                                       <label htmlFor={`subsubcategory-${subsub}`} className="text-sm">{subsub}</label>
//                                     </div>
//                                   </li>
//                                 ))}
//                               </ul>
//                             )}
//                           </li>
//                         ))}
//                       </ul>
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </aside>

//         {/* Main Content */}
//         <main className="md:w-3/4 mt-6 md:mt-0">
//           {/* Sort */}
//           <div className="flex justify-end mb-6">
//             <select
//               value={sortOption}
//               onChange={(e) => setSortOption(e.target.value)}
//               className="w-48 p-2 rounded bg-gray-700 text-white"
//             >
//               <option value="">Sort By</option>
//               <option value="low">Price: Low to High</option>
//               <option value="high">Price: High to Low</option>
//             </select>
//           </div>

//           {/* Products Grid */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             {filteredProducts.length > 0 ? (
//               filteredProducts.map((product) => (
//                 <ProductCard
//                   key={product._id}
//                   product={product}
//                   toggleWishlist={toggleWishlist}
//                   isWishlist={wishlist.includes(product._id)}
//                 />
//               ))
//             ) : (
//               <p className="col-span-full text-center text-xl text-gray-400">No products found.</p>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default CorporateGift;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/PrductCard.js'; // Ensure this path is correct

const shopByBrands = [
  {
    name: "VIP",
    subcategories: [
      { name: "Carlton", subsubcategories: [] },
      { name: "Accessories", subsubcategories: [] },
      { name: "Skybags", subsubcategories: [] }
    ]
  },
  {
    name: "American Tourister",
    subcategories: [
      { name: "AT", subsubcategories: [] },
      { name: "Kamalian", subsubcategories: [] },
      { name: "Accessories", subsubcategories: [] }
    ]
  },
  {
    name: "Safari",
    subcategories: [
      { name: "Safari", subsubcategories: [] },
      { name: "Jungle", subsubcategories: [] },
      { name: "Accessories", subsubcategories: [] }
    ]
  },
  {
    name: "Prestige",
    subcategories: [
      {
        name: "Kitchen Utensils and Cookware",
        subsubcategories: ["Cooking Appliances", "Food Preparation Appliances", "Kitchen Gadgets"]
      },
      {
        name: "Kitchen Appliances",
        subsubcategories: ["Cooking Appliances", "Food Preparation Appliances", "Kitchen Gadgets"]
      }
    ]
  },
  {
    name: "GSI Enterprises",
    subcategories: [
      { name: "Corporate Gift Items", subsubcategories: [] },
      { name: "Leather Products", subsubcategories: [] },
      { name: "Promotional Items", subsubcategories: [] }
    ]
  }
];

const CorporateGift = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [sortOption, setSortOption] = useState('');
  const [expandedBrands, setExpandedBrands] = useState({});
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [selectedSubsubcategories, setSelectedSubsubcategories] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleBrand = (brand) => {
    setExpandedBrands((prev) => ({
      ...prev,
      [brand]: !prev[brand],
    }));
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleSubcategoryChange = (subcategory) => {
    setSelectedSubcategories((prev) =>
      prev.includes(subcategory)
        ? prev.filter((s) => s !== subcategory)
        : [...prev, subcategory]
    );
  };

  const handleSubsubcategoryChange = (subsubcategory) => {
    setSelectedSubsubcategories((prev) =>
      prev.includes(subsubcategory)
        ? prev.filter((s) => s !== subsubcategory)
        : [...prev, subsubcategory]
    );
  };

  useEffect(() => {
    const fetchCorporateGiftingProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/api/products', {
          params: { mainCategory: 'Corporate Gifting' },
        });
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products.');
        setLoading(false);
      }
    };

    fetchCorporateGiftingProducts();
  }, []);

  useEffect(() => {
    const result = products
      .filter(
        (product) =>
          (selectedBrands.length === 0 || selectedBrands.includes(product.brand)) &&
          (selectedSubcategories.length === 0 || selectedSubcategories.includes(product.subcategory)) &&
          (selectedSubsubcategories.length === 0 || selectedSubsubcategories.includes(product.subsubcategory))
      )
      .sort((a, b) => {
        if (sortOption === 'low') return a.price - b.price;
        if (sortOption === 'high') return b.price - a.price;
        return 0;
      });
    setFilteredProducts(result);
  }, [products, selectedBrands, selectedSubcategories, selectedSubsubcategories, sortOption]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 via-pink-300 to-yellow-300 text-white font-sans p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:space-x-8">
        {/* Sidebar filters */}
        <aside className="md:w-1/4 bg-gray-800 p-4 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-600 pb-2">Filters</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Shop by Brands</h3>
              <ul className="mt-2 space-y-1">
                {shopByBrands.map((brandObj, index) => (
                  <li key={index}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id={`brand-${brandObj.name}`}
                          className="mr-2 accent-purple-500"
                          checked={selectedBrands.includes(brandObj.name)}
                          onChange={() => handleBrandChange(brandObj.name)}
                        />
                        <label htmlFor={`brand-${brandObj.name}`} className="text-sm">{brandObj.name}</label>
                      </div>
                      {brandObj.subcategories.length > 0 && (
                        <button onClick={() => toggleBrand(brandObj.name)} className="text-purple-400">
                          {expandedBrands[brandObj.name] ? '−' : '+'}
                        </button>
                      )}
                    </div>
                    {expandedBrands[brandObj.name] && (
                      <ul className="ml-6 mt-1 text-sm text-gray-300 space-y-1">
                        {brandObj.subcategories.map((sub, i) => (
                          <li key={i}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  id={`subcategory-${sub.name}`}
                                  className="mr-2 accent-purple-500"
                                  checked={selectedSubcategories.includes(sub.name)}
                                  onChange={() => handleSubcategoryChange(sub.name)}
                                />
                                <label htmlFor={`subcategory-${sub.name}`} className="text-sm">{sub.name}</label>
                              </div>
                              {sub.subsubcategories.length > 0 && (
                                <button onClick={() => toggleBrand(sub.name)} className="text-purple-400">
                                  {expandedBrands[sub.name] ? '−' : '+'}
                                </button>
                              )}
                            </div>
                            {sub.subsubcategories.length > 0 && expandedBrands[sub.name] && (
                              <ul className="ml-6 mt-1 text-sm text-gray-300 space-y-1">
                                {sub.subsubcategories.map((subsub, j) => (
                                  <li key={j}>
                                    <div className="flex items-center">
                                      <input
                                        type="checkbox"
                                        id={`subsubcategory-${subsub}`}
                                        className="mr-2 accent-purple-500"
                                        checked={selectedSubsubcategories.includes(subsub)}
                                        onChange={() => handleSubsubcategoryChange(subsub)}
                                      />
                                      <label htmlFor={`subsubcategory-${subsub}`} className="text-sm">{subsub}</label>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="md:w-3/4 mt-6 md:mt-0">
          {/* Sort */}
          <div className="flex justify-end mb-6">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-48 p-2 rounded bg-gray-700 text-white"
            >
              <option value="">Sort By</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="text-center text-white text-xl">Loading products...</div>
          ) : error ? (
            <div className="text-center text-red-500 text-lg">{error}</div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  toggleWishlist={toggleWishlist}
                  isWishlist={wishlist.includes(product._id)}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-lg text-gray-300">No products found.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default CorporateGift;
