// Navbar.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChartLine, FaBookOpen, FaRobot, FaUserCircle, FaBell, FaSearch, FaTimes } from 'react-icons/fa';

function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120 }}
        className="flex justify-between items-center px-6 py-4 bg-white shadow-md relative z-10"
      >
        <div className="flex items-center flex-grow">
          <motion.div 
            className="text-2xl font-bold mr-8 text-purple-600"
            whileHover={{ scale: 1.05 }}
          >
            MarketMentor
          </motion.div>
          <ul className="hidden lg:flex space-x-1 flex-grow justify-center">
            {[
              { icon: FaChartLine, text: "Predictions" },
              { icon: FaBookOpen, text: "Learn" },
              { icon: FaRobot, text: "AI Assistant" },
            ].map((item, index) => (
              <motion.li 
                key={index} 
                whileHover={{ scale: 1.05 }} 
                className="flex items-center cursor-pointer text-gray-700 hover:text-purple-600 transition-colors duration-200 px-4 py-2 rounded-full hover:bg-purple-50"
              >
                <item.icon className="mr-2" />
                <span>{item.text}</span>
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="flex items-center space-x-4">
          <motion.button 
            whileHover={{ scale: 1.1 }} 
            onClick={() => setIsSearchOpen(true)}
            className="p-2 rounded-full text-gray-600 hover:bg-gray-100"
          >
            <FaSearch />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            className="p-2 rounded-full text-gray-600 hover:bg-gray-100"
          >
            <FaBell />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            className="p-2 rounded-full text-gray-600 hover:bg-gray-100"
          >
            <FaUserCircle className="text-2xl" />
          </motion.button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search stocks..." 
                  className="w-full bg-gray-100 text-gray-800 rounded-full py-3 pl-5 pr-12 focus:outline-none focus:ring-2 focus:ring-purple-300 text-lg"
                  autoFocus
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;