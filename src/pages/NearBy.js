import React, { useEffect, useState } from "react";

const NearBy = () => {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const res = await fetch("gsi-backend-production-244c.up.railway.app/api/nearby/shops");
        const data = await res.json();
        setShops(data);
      } catch (err) {
        console.error("Failed to fetch shops", err);
      }
    };

    fetchShops();
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12 underline decoration-blue-500">
          Discover Nearby Shops
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {shops.map((shop) => (
  <div
    key={shop._id}
    className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
  >
    <img
      src={shop.image}
      alt={shop.name}
      className="w-full h-48 object-cover"
    />
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        {shop.name}
      </h2>
      <p className="text-gray-600 text-sm mb-1">{shop.address}</p>
      <p className="text-gray-600 text-sm mb-4">
        📞 {shop.telephone}
      </p>
      <a
        href={shop.mapsLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors text-sm font-medium shadow"
      >
        📍 View on Map
      </a>
    </div>
  </div>
))}

        </div>
      </div>
    </section>
  );
};

export default NearBy;
