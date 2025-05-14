import React, { useState } from 'react';
import { Pencil, Trash2, PlusCircle } from 'lucide-react';

const dummyAddresses = [
  {
    id: 1,
    name: 'Kajal Mishra',
    phone: '+91 9876543210',
    addressLine: '123, GSI Nagar, Sector 22',
    city: 'Mumbai',
    state: 'Maharashtra',
    zip: '400001',
    isDefault: true,
  },
  {
    id: 2,
    name: 'Kajal Office',
    phone: '+91 9123456789',
    addressLine: '456, Tech Park, Tower B',
    city: 'Pune',
    state: 'Maharashtra',
    zip: '411001',
    isDefault: false,
  },
];

const SavedAddressesPage = () => {
  const [addresses, setAddresses] = useState(dummyAddresses);

  const handleDelete = (id) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  const handleSetDefault = (id) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-indigo-100 to-purple-200 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
          Your Saved Addresses
        </h1>

        <button className="flex items-center bg-blue-600 text-white rounded-full px-6 py-2 mb-6 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
          <PlusCircle className="w-6 h-6 mr-2" />
          Add New Address
        </button>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 ease-in-out"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{address.name}</h2>
                  <p className="text-sm text-gray-600">{address.phone}</p>
                  <p className="text-sm text-gray-600">{address.addressLine}</p>
                  <p className="text-sm text-gray-600">
                    {address.city}, {address.state} – {address.zip}
                  </p>
                  {address.isDefault && (
                    <span className="inline-block mt-2 px-4 py-1 text-xs text-white bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-full">
                      Default Address
                    </span>
                  )}
                </div>
                <div className="flex gap-4 items-center">
                  <button className="text-blue-600 hover:text-blue-800 transition-colors">
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(address.id)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              {!address.isDefault && (
                <button
                  onClick={() => handleSetDefault(address.id)}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700 transition-all duration-300"
                >
                  Set as Default
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedAddressesPage;
