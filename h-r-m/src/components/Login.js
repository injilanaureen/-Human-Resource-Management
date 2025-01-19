import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Correct import

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Correct usage of useNavigate hook

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check the email and password (you can replace this with real authentication logic)
    if (email === '1' && password === '1') {
      // On successful login, redirect to the layout page
      navigate('/layout');  // This should work in v6
    } else {
      alert('Invalid credentials!');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-gray-700 mb-4">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-600">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
