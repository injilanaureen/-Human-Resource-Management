import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mock authentication
    if (email === 'admin' && password === 'admin') {
      setUser({ isAuthenticated: true, role: 'admin' });
      navigate('/');
    } else if (email === 'employee' && password === 'employee') {
      setUser({ isAuthenticated: true, role: 'employee' });
      navigate('/');
    } else if (email === 'hr' && password === 'hr') {
      setUser({ isAuthenticated: true, role: 'hr' });
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
