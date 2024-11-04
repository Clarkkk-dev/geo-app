import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/userSlice';
import userApi from '../api/userApi';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); 
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await userApi.login(email, password);
      if (response.token) {
        dispatch(login({ token: response.token }));
        localStorage.setItem('token', response.token);
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed: ' + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-5">
      <h2 className="text-6xl font-bold mb-10">Login</h2>
      <form onSubmit={handleLogin} className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="mb-4">
          <label className="text-2xl block mb-2" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 rounded-md border border-gray-300 w-full focus:outline-none focus:border-blue-500 transition duration-200"
          />
        </div>
        <div className="mb-4">
          <label className="text-2xl block mb-2" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-3 rounded-md border border-gray-300 w-full focus:outline-none focus:border-blue-500 transition duration-200"
          />
        </div>
        <button 
          type="submit" 
          className="p-3 rounded-md bg-blue-600 text-white w-full mt-5 hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
