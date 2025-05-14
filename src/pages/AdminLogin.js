import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
  
    try {
      const response = await axios.post('http://localhost:5000/api/admin/loginroutes', formData);
      localStorage.setItem('adminToken', response.data.token);
      setSuccess(response.data.message);
      window.location.href = '/admin/dashboard';
    } catch (err) {
      // Log the error for debugging purposes
      console.error('Login error:', err);
  
      // Check if response and data exist
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Something went wrong');
      }
    }
  };
  

  return (
    <div className="container mx-auto my-8 p-6 border rounded-lg shadow-lg w-full max-w-sm">
      <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
      
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Log In
        </button>
        <p>Already Have An Account?<Link to="/admin/signup">Sign Up</Link></p>
      </form>
    </div>
  );
};

export default AdminLogin;
