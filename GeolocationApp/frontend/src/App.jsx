// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/Homepage';
import './App.css';

function App() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <>
      <Routes>
        <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
