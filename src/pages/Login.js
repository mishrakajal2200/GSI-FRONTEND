// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [form, setForm] = useState({ email: '', password: '' });
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/api/auth/login', form);
//       localStorage.setItem('token', res.data.token);
//       toast.success('User logged in successfully');
//       navigate('/');
//     } catch (error) {
//       toast.error('Login failed. Please try again.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-200 flex items-center justify-center">
//       <form onSubmit={handleSubmit} className="max-w-md w-full bg-white p-8  rounded-lg shadow-lg space-y-4">
//         <ToastContainer />
//         <h2 className="text-3xl font-semibold text-center text-gray-800">Login</h2>
        
//         <div className="flex flex-col space-y-4">
//           <input
//             type="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={(e) => setForm({ ...form, email: e.target.value })}
//             className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={(e) => setForm({ ...form, password: e.target.value })}
//             className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full py-3 bg-indigo-600 text-white text-lg rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         >
//           Login
//         </button>

//         <p className="text-center text-sm text-gray-600">
//           Don't have an account? <Link to="/signup" className="text-indigo-600 hover:underline">Sign Up</Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;



// src/components/Login.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setMessage('');

//     if (!email || !password) {
//       setError('Both email and password are required!');
//       return;
//     }

//     try {
//       const response = await axios.post('/api/auth/login', { email, password });
//       localStorage.setItem('token', response.data.token); // Save the token in localStorage
//       setMessage('Login successful!');
//       setTimeout(() => navigate('/'), 2000); // Redirect to home page after successful login
//     } catch (error) {
//       setError(error.response?.data?.message || 'Invalid credentials!');
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Email:</label>
//           <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//       {error && <div style={{ color: 'red' }}>{error}</div>}
//       {message && <div style={{ color: 'green' }}>{message}</div>}
//     </div>
//   );
// };

// export default Login;




import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Both email and password are required!');
      return;
    }

    try {
      const response = await axios.post('gsi-backend-production-244c.up.railway.app/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      toast.success('Login successful!');
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid credentials!');
    }
  };


  
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Login
          </button>
        </form>
        <p>Don't Have An Account? <Link to='/signup'>Sign Up</Link></p>
      </div>
    </div>
  );
};

export default Login;
