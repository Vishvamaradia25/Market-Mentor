import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBell, FaUser} from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { app } from '../firebase';
import AdvancedSearch from './AISearch';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AIMarketDashboard from './NewsAnalysisChart'; // Import the new component
// Import the JSON data
import data from '../data/homedata.json';
const auth = getAuth(app);

const Navbar = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
  
      return () => unsubscribe();
    }, []);
  
    useEffect(() => {
      if (location.state?.message) {
        toast.success(location.state.message);
      }
    }, [location.state]);
  
  
  
    const handleLogout = async () => {
      try {
        await signOut(auth);
        toast.success('Successfully logged out!');
        navigate('/login');
      } catch (error) {
        console.error("Logout error:", error);
        toast.error('Failed to log out. Please try again.');
      }
    };
  
    const toggleDropdown = () => {
      setDropdownOpen(!dropdownOpen);
    };
return (
    <>
         {/* Header */}
         <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-4 flex justify-between items-center"
      >
                 <Link to="/"     >           
                  <h1 className="text-2xl font-bold text-white">StockMaster</h1></Link>
        <div className="flex items-center space-x-4">
          <AdvancedSearch />
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <FaBell className="text-gray-400 hover:text-white cursor-pointer" />
          </motion.div>
          <div className="relative">
            {user ? (
              <motion.div
                onClick={toggleDropdown}
                className="cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full" />
                ) : (
                  <FaUser className="text-gray-400 hover:text-white text-2xl" />
                )}
              </motion.div>
            ) : (
              <motion.button
                onClick={() => navigate('/login')}
                className="text-gray-400 hover:text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Login
              </motion.button>
            )}
            {dropdownOpen && user && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg py-1 z-10"
              >
                <a href="#profile" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600">Profile</a>
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-600">
                  Logout
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </motion.header></>
)
}

export default Navbar;