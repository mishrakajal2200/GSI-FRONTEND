import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
    revenue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        // Redirect to login if no token is found
        window.location.href = '/admin/login';
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/api/admin/stats', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStats(response.data);
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="container mx-auto my-8 p-6 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 border rounded bg-blue-100">
          <h3 className="font-bold">Users</h3>
          <p>{stats.users}</p>
        </div>
        <div className="p-4 border rounded bg-green-100">
          <h3 className="font-bold">Products</h3>
          <p>{stats.products}</p>
        </div>
        <div className="p-4 border rounded bg-yellow-100">
          <h3 className="font-bold">Orders</h3>
          <p>{stats.orders}</p>
        </div>
        <div className="p-4 border rounded bg-red-100">
          <h3 className="font-bold">Revenue</h3>
          <p>${stats.revenue}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
