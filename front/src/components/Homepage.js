import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaChartLine, FaNewspaper, FaGraduationCap, FaSearch, FaBell, FaExternalLinkAlt, FaStar } from 'react-icons/fa';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Link, useNavigate } from 'react-router-dom';
import AIInvestmentSimulator from './AISearch';
// Assume these are imported from your data file
import homedata from '../data/homedata.json';
import logo from '../assets/Screenshot 2024-09-05 at 11.00.11 PM.png'
import axios from 'axios';
import ChartsSection from './ChartsSection';



const NewsWidget = ({ news, loading, error }) => {
  if (loading) {
    return <div className="bg-gray-800 rounded-lg p-4">Loading news...</div>;
  }

  if (error) {
    return <div className="bg-gray-800 rounded-lg p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gray-900 rounded-lg p-4 m-20">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <FaNewspaper className="mr-2" />
        Latest News
      </h2>
      <ul className="space-y-4">
        {news.map((item, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="border-b border-gray-700 pb-4"
          >
            <h3 className="font-bold text-lg mb-2 text-white">{item.title}</h3>
            <p className="text-white0 mb-2">{item.teaser}</p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>{item.author}</span>
              <span>{new Date(item.created).toLocaleString()}</span>
            </div>
            <motion.a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 mt-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Read More <FaExternalLinkAlt className="ml-1" />
            </motion.a>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};
const HomePage = () => {
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [activeSection, setActiveSection] = useState('dashboard');
  const [hoveredCompany, setHoveredCompany] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://api.benzinga.com/api/v2/news', {
          params: {
            token: '8ca505e300894b0d87d3c91033dc0b6d',
            pageSize: 5,
            displayOutput: 'full',
            sortBy: 'date',
            dateFrom: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          }
        });
  
        setNews(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to fetch news. Please try again later.");
        setLoading(false);
      }
    };
  
    fetchNews();
  }, []);
  useEffect(() => {
    const loadFavorites = () => {
      try {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
        return Array.isArray(storedFavorites) ? storedFavorites : [];
      } catch (error) {
        console.error('Error loading favorites:', error);
        return [];
      }
    };

    setFavorites(loadFavorites());
  }, []);

  const handleAiQuery = (e) => {
    e.preventDefault();
    // Simulated AI response
    setAiResponse(`AI analysis for "${aiQuery}": This is a simulated response. In a real application, this would be the result of processing the query through an AI model.`);
  };

  const toggleFavorite = (symbol) => {
    setFavorites(prevFavorites => {
      const newFavorites = prevFavorites.includes(symbol)
        ? prevFavorites.filter(fav => fav !== symbol)
        : [...prevFavorites, symbol];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-black opacity-50"></div>
        <div className="absolute inset-0 bg-[url('/circuit-pattern.svg')] opacity-10"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <motion.img 
                  className="h-10 w-auto"
                  src={logo} 
                  alt="IntelliStock"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="ml-10 flex items-baseline space-x-4">
                  {['dashboard', 'predictions'].map((item) => (
                    <motion.button
                      key={item}
                      onClick={() => setActiveSection(item)}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${activeSection === item ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </motion.button>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <motion.button
                  className="p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaBell className="h-6 w-6" />
                </motion.button>
                <div className="ml-3 relative">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
<Link to="/login"><button className='text-white'>Login</button>   </Link>                 </button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Dashboard */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* AI Assistant */}
          <motion.div
            className="mb-8 bg-blue-900 bg-opacity-50 rounded-lg p-6 backdrop-filter backdrop-blur-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <FaRobot className="mr-2" /> AI Market Assistant
            </h2>
            <form onSubmit={handleAiQuery} className="flex items-center">
              <input
                type="text"
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                placeholder="Ask about market trends, stock analysis, or trading strategies..."
                className="flex-grow p-3 rounded-l-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <motion.button
                type="submit"
                className="bg-blue-600 text-white p-3 rounded-r-md hover:bg-blue-700 transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaSearch className="h-6 w-6" />
              </motion.button>
            </form>
            <AnimatePresence>
              {aiResponse && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-4 bg-gray-800 rounded-md"
                >
                  <p className="text-blue-300">{aiResponse}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {activeSection === 'dashboard' ? (
  <>
    {/* Market Pulse */}
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <FaChartLine className="mr-2" /> Market Pulse
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {homedata.featuredCompanies.map((company, index) => (
        <motion.div
          key={company.symbol}
          className="bg-gray-800 bg-opacity-50 rounded-lg overflow-hidden backdrop-filter backdrop-blur-lg cursor-pointer"
          whileHover={{ scale: 1.05, zIndex: 1 }}
          onHoverStart={() => setHoveredCompany(company)}
          onHoverEnd={() => setHoveredCompany(null)}
          onClick={() => navigate(`/company/${company.symbol}`)}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold">{company.name} ({company.symbol})</h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(company.symbol);
                }}
                className={`p-1 rounded-full ${favorites.includes(company.symbol) ? 'text-yellow-400' : 'text-gray-400'}`}
              >
                <FaStar className="h-6 w-6" />
              </motion.button>
            </div>
            {/* ... rest of the company card content ... */}
          </div>
        </motion.div>
      ))}
    </div>
          </motion.div>
          </>
) : (
  <ChartsSection />
)}
          {/* Hovering Company Details */}
          <AnimatePresence>
            {hoveredCompany && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="fixed bottom-4 right-4 w-80 bg-gray-900 p-4 rounded-lg shadow-lg"
              >
                <h3 className="text-xl font-bold mb-2">{hoveredCompany.name} Details</h3>
                <p><strong>Market Cap:</strong> ₹{hoveredCompany.marketCap}</p>
                <p><strong>Volume:</strong> {hoveredCompany.volume}</p>
                <p><strong>52 Week High:</strong> ₹{hoveredCompany.high52}</p>
                <p><strong>52 Week Low:</strong> ₹{hoveredCompany.low52}</p>
              </motion.div>
            )}
          </AnimatePresence>

     

          {/* Trading Simulator */}
         {/* Replace the existing Trading Simulator section with this */}
<motion.div
  className="mb-8 bg-indigo-900 bg-opacity-50 rounded-lg p-6 backdrop-filter backdrop-blur-lg"
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.6 }}
>
  <h2 className="text-2xl font-bold mb-4 flex items-center">
    <FaGraduationCap className="mr-2" /> AI-Powered Investment Simulator
  </h2>
  <p className="mb-4">Get personalized investment advice based on your preferences and favorite companies.</p>
  <AIInvestmentSimulator favorites={favorites} homedata={homedata} />
</motion.div>
        </main>
      </div>
      <NewsWidget news={news} loading={loading} error={error} />
    </div>
  );
};

export default HomePage;