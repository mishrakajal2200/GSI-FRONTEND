import React, { useState } from 'react';
import axios from 'axios';

const SubscribeSection = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = async () => {
    try {
      const res = await axios.post('https://gsi-backend-production.up.railway.app/api/subs/subscribe', { email });
      setMessage(res.data.message);
      setEmail('');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <section className="py-12 text-center">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Stay in the Loop</h2>
      <p className="text-gray-600 mb-4">Subscribe for updates and exclusive offers!</p>
      <div className="flex justify-center flex-col sm:flex-row gap-3 px-4 max-w-xl mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded w-full text-gray-700"
        />
        <button onClick={handleSubscribe} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Subscribe
        </button>
      </div>
      {message && <p className="mt-4 text-green-600 font-medium">{message}</p>}
    </section>
  );
};

export default SubscribeSection;
