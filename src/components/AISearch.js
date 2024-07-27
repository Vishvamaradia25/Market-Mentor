import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI('AIzaSyAkIxz2zqMBwz4o791F_tbHpUUuMG6e8oc');

const AdvancedSearch = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (isExpanded) {
      searchInputRef.current.focus();
    }
  }, [isExpanded]);

  const handleSearchClick = () => {
    setIsExpanded(true);
  };

  const handleCloseClick = () => {
    setIsExpanded(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(searchQuery);
      const response = await result.response;
      const text = response.text();
      
      // Parse the response and create an array of results
      const parsedResults = text.split('\n').filter(item => item.trim() !== '').map((item, index) => ({
        id: index,
        content: item
      }));
      
      setSearchResults(parsedResults);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([{ id: 'error', content: 'An error occurred while fetching results.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isExpanded && (
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleSearchClick}
          className="cursor-pointer"
        >
          <FaSearch className="text-gray-400 hover:text-white text-xl" />
        </motion.div>
      )}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gray-800 p-6 rounded-lg w-full max-w-3xl"
            >
              <div className="flex items-center mb-4">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Search..."
                  className="flex-grow bg-gray-700 text-white placeholder-gray-400 px-4 py-2 rounded-l-lg focus:outline-none"
                />
                <button
                  onClick={handleSearch}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg transition duration-300"
                >
                  <FaSearch />
                </button>
                <button
                  onClick={handleCloseClick}
                  className="ml-2 text-gray-400 hover:text-white transition duration-300"
                >
                  <FaTimes />
                </button>
              </div>
              {isLoading ? (
                <div className="flex justify-center items-center h-40">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-10 h-10 border-t-2 border-blue-500 border-solid rounded-full"
                  />
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-4 max-h-96 overflow-y-auto"
                >
                  {searchResults.map((result) => (
                    <motion.div
                      key={result.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="bg-gray-700 p-4 rounded-lg mb-2"
                    >
                      <p className="text-white">{result.content}</p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdvancedSearch;