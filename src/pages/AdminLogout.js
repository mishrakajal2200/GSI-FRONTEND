// src/pages/AdminLogout.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  }, [navigate]);

  return <p className="text-center mt-10">Logging out...</p>;
};

export default AdminLogout;
