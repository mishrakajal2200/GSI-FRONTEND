import React, { useState } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';

const SearchResults = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const res = await axios.get(`gsi-backend-production-244c.up.railway.app/api/products/search?query=${query}`);
      setResults(res.data);
      console.log(res.data); // You can display results in a dropdown or on a new page
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border border-gray-600 rounded-md py-1 px-3 bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
      />
      <button
        onClick={handleSearch}
        className="absolute right-3 top-2 text-gray-400 hover:text-white"
      >
        <FaSearch />
      </button>

      {/* Display results */}
      {results.length > 0 && (
        <div className="absolute top-10 bg-white text-black w-full shadow-lg max-h-60 overflow-y-auto z-10">
          {results.map((item) => (
            <div key={item._id} className="p-2 hover:bg-gray-200">
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
