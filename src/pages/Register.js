
// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

// const Register = () => {
//   const [form, setForm] = useState({ name: '', email: '', password: '' });
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/api/auth/signup', form);
//       localStorage.setItem('token', res.data.token);
//       localStorage.setItem('userName', res.data.name);
//       localStorage.setItem('userId', res.data._id);
//       localStorage.setItem('userRole', res.data.role);
//       toast.success('User registered successfully!');
//       navigate('/');
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Registration failed');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-200 flex items-center justify-center">
//       <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg">
//         <ToastContainer />
//         <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Create an Account</h2>

//         <form onSubmit={handleSubmit}>
//           <div className="space-y-4">
//             {/* Name Input */}
//             <input
//               type="text"
//               placeholder="Full Name"
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//               className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md"
//               required
//             />

//             {/* Email Input */}
//             <input
//               type="email"
//               placeholder="Email Address"
//               value={form.email}
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//               className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md"
//               required
//             />

//             {/* Password Input */}
//             <input
//               type="password"
//               placeholder="Password"
//               value={form.password}
//               onChange={(e) => setForm({ ...form, password: e.target.value })}
//               className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md"
//               required
//             />

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md transition"
//             >
//               Register
//             </button>
//           </div>
//         </form>

//         <div className="flex items-center justify-center my-6">
//           <span className="text-gray-600">or sign up with</span>
//         </div>


//         <p className="mt-6 text-center text-sm text-gray-600">
//           Already have an account?{' '}
//           <Link to="/login" className="text-indigo-600 hover:underline">
//             Login here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;


// src/components/Signup.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Register = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setMessage('');

//     if (!name || !email || !password) {
//       setError('All fields are required!');
//       return;
//     }

//     try {
//       const response = await axios.post('/api/auth/signup', { name, email, password });
//       setMessage(response.data.message);
//       setTimeout(() => navigate('/login'), 2000); // Redirect to login page after successful signup
//     } catch (error) {
//       setError(error.response?.data?.message || 'Something went wrong!');
//     }
//   };

//   return (
//     <div>
//       <h2>Sign Up</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name:</label>
//           <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         </div>
//         <button type="submit">Sign Up</button>
//       </form>
//       {error && <div style={{ color: 'red' }}>{error}</div>}
//       {message && <div style={{ color: 'green' }}>{message}</div>}
//     </div>
//   );
// };

// export default Register;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error('All fields are required!');
      return;
    }

    try {
      const response = await axios.post('https://gsi-backend-1.onrender.com/api/auth/signup', { name, email, password });
      toast.success(response.data.message || 'Signup successful!');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded mt-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
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
          <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
