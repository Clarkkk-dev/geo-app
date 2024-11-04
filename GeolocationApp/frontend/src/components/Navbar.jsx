import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';

const Navbar = () => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <nav className="bg-blue-600 p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-2xl font-bold hover:text-blue-300 transition duration-200">Home</Link>
                <div>
                    {isAuthenticated ? (
                        <button 
                            onClick={handleLogout} 
                            className="text-white text-lg hover:text-blue-300 transition duration-200"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link 
                            to="/login" 
                            className="text-white text-lg hover:text-blue-300 transition duration-200"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
