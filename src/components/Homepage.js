import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChartLine, FaPlus, FaMinus, FaArrowUp, FaArrowDown, FaChartBar, FaFileInvoiceDollar, FaGlobeAmericas, FaCoins, FaOilCan, FaStar, FaCaretUp, FaCaretDown, FaNewspaper, FaTimes, FaChevronLeft, FaChevronRight, FaGoogle, FaFacebook, FaSearch, FaBell, FaUser, FaListUl, FaCog, FaSignOutAlt, FaExternalLinkAlt } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AIMarketDashboard from './NewsAnalysisChart'; // Import the new component
// Import the JSON data
import data from '../data/homedata.json';
import Navbar from './Navbar';
import { getAuth } from 'firebase/auth';
import { app } from '../firebase';
import firebase from 'firebase/compat/app';
import { getFirestore, doc, setDoc, deleteDoc, collection, query, where, getDocs } from 'firebase/firestore';


const db = getFirestore(app);
const auth = getAuth(app);


const HomePage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const location = useLocation();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);



  useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://api.benzinga.com/api/v2/news', {
          params: {
            token: '9538017169c049b9bce20a77f88d8166',
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

  return (
    <div className="min-h-screen bg-gray-900 text-white">

     <Navbar />

      {/* Stock Ticker */}
      <StockTicker stocks={data.stocks} />

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <motion.nav
          initial={{ x: -250 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-20 bg-gray-800 p-4"
        >
          <WatchList watchedStocks={data.watchedStocks} />
        </motion.nav>

        {/* Main Panel */}
        <main className="flex-grow p-4">
          {/* Tabs */}
          <div className="flex mb-4 border-b border-gray-700">
            {['overview', 'movers', 'news'].map((tab) => (
              <motion.button
                key={tab}
                className={`mr-4 py-2 ${activeTab === tab ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'}`}
                onClick={() => setActiveTab(tab)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </motion.button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
{activeTab === 'overview' && (
  <>
  <CompanyCards companies={data.companies} />
  <MarketOverview markets={data.markets} sectorPerformance={data.sectorPerformance} />
</>
)}            {activeTab === 'movers' && <TopMovers topMovers={data.topMovers} />}
            {activeTab === 'news' && <NewsWidget news={news} loading={loading} error={error} />}
          </motion.div>
  {/* News Analysis Chart */}
  {activeTab === 'news' && !loading && !error && (
      <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-12"
    >
            <AIMarketDashboard news={news} />
            </motion.div>
          )}
       
        </main>
      </div>

  
    </div>
  );
};



const StockTicker = ({ stocks }) => {
  return (
    <div className="bg-gray-800 p-2 overflow-hidden">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
        className="flex space-x-8 whitespace-nowrap"
      >
        {stocks.concat(stocks).map((stock, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span className="font-bold text-sm">{stock.symbol}</span>
            <span className="text-sm">${stock.price.toFixed(2)}</span>
            <span className={`flex items-center text-xs ${stock.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {stock.change > 0 ? <FaCaretUp /> : <FaCaretDown />}
              {Math.abs(stock.change).toFixed(2)}%
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
// In CompanyCards component
const CompanyCards = ({ companies }) => {
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
    setFavorites(storedFavorites);
  }, []);

  const toggleFavorite = (company) => {
    const updatedFavorites = { ...favorites };
    if (updatedFavorites[company.symbol]) {
      delete updatedFavorites[company.symbol];
    } else {
      updatedFavorites[company.symbol] = company;
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    
    // Dispatch a custom event to notify WatchList
    window.dispatchEvent(new Event('favoritesUpdated'));
  };

  return (
    <>
      <h1 className='font-bold text-2xl my-5'>Company List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {companies.map((company) => (
          <motion.div
            key={company.symbol}
            className="bg-gray-800 rounded-lg p-4 shadow-lg relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
<Link to={`/company/${company.symbol}`}>
              <div className="flex items-center mb-2">
                <img src={company.logo} alt={company.name} className="w-8 h-8 mr-2" />
                <h3 className="text-lg font-bold">{company.name}</h3>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">${company.price.toFixed(2)}</span>
                <span className={`flex items-center ${company.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {company.change > 0 ? <FaCaretUp /> : <FaCaretDown />}
                  {Math.abs(company.change).toFixed(2)}%
                </span>
              </div>
              <div className="text-sm text-gray-400 mt-2">
                Market Cap: {company.marketCap}
              </div>
            </Link>            <div className="mt-4 flex justify-between items-center">
              <motion.button
                className={`${
                  favorites[company.symbol] 
                    ? "bg-red-500 hover:bg-red-600" 
                    : "bg-green-500 hover:bg-green-600"
                } text-white font-bold py-2 px-4 rounded flex items-center`}
                onClick={() => toggleFavorite(company)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {favorites[company.symbol] ? (
                  <>
                    <FaMinus className="mr-2" /> Remove from Favorites
                  </>
                ) : (
                  <>
                    <FaPlus className="mr-2" /> Add to Favorites
                  </>
                )}
              </motion.button>
              <FaStar className={`text-2xl ${favorites[company.symbol] ? 'text-yellow-400' : 'text-gray-400'}`} />
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

// In WatchList component

const WatchList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    const loadFavorites = () => {
      const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
      setFavorites(Object.values(storedFavorites));
    };

    loadFavorites();
    window.addEventListener('favoritesUpdated', loadFavorites);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('favoritesUpdated', loadFavorites);
    };
  }, []);

  // useEffect(() => {
  //   setIsOpen(windowWidth >= 1024);
  // }, [windowWidth]);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const sidebarVariants = {
    open: { width: windowWidth >= 1024 ? '300px' : '80%', x: 0 },
    closed: { width: '60px', x: 0 },
  };

  const contentVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: -10 },
  };

  return (
    <motion.div
      className="fixed top-0 left-0 h-full bg-gray-800 text-white shadow-lg z-50 flex mt-16"
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={sidebarVariants}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <motion.div className="flex flex-col w-full overflow-hidden">
        <motion.div 
          className="p-4 flex items-center justify-between"
          variants={contentVariants}
        >
          <h2 className="text-2xl font-bold flex items-center">
            <FaStar className="text-yellow-400 mr-2" />
            Watchlist
          </h2>
          {windowWidth < 1024 && (
            <button onClick={toggleSidebar}>
              <FaTimes />
            </button>
          )}
        </motion.div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="flex-grow overflow-y-auto"
              variants={contentVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {favorites.length === 0 ? (
                <p className="text-gray-400 p-4">No favorites added yet.</p>
              ) : (
                <ul className="space-y-2 p-2">
                  {favorites.map((stock) => (
                    <motion.li
                      key={stock.symbol}
                      className="bg-gray-700 rounded-lg p-3 shadow-md"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold">{stock.symbol}</span>
                        <span className="text-sm">${stock.price.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-gray-400">{stock.name}</span>
                        <span className={`text-xs ${stock.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {stock.change > 0 ? <FaCaretUp /> : <FaCaretDown />}
                          {Math.abs(stock.change).toFixed(2)}%
                        </span>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.button
        className="absolute top-1/2 -right-3 bg-blue-500 text-white p-2 rounded-full shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleSidebar}
      >
        {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
      </motion.button>
    </motion.div>
  );
};



const MarketOverview = ({ markets, sectorPerformance }) => {
  const iconMap = {
    FaChartLine,
    FaGlobeAmericas,
    FaCoins,
    FaOilCan,
    FaChartBar,
    FaFileInvoiceDollar
  };

  return (
    <div className="space-y-8">
                            <h1 className='font-bold text-2xl'>Market Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {markets.map((market, index) => {
          const Icon = iconMap[market.icon];
          return (
            <motion.div
              key={index}
              className="bg-gray-800 rounded-lg p-4 flex flex-col"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center mb-2">
                <Icon className="text-3xl mr-4 text-blue-400" />
                <h3 className="font-bold text-lg">{market.name}</h3>
              </div>
              <p className="text-2xl font-semibold mb-2">{typeof market.value === 'number' ? market.value.toLocaleString() : market.value}</p>
              <div className="flex justify-between items-center text-sm">
                <span className={`${market.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {market.change > 0 ? '+' : ''}{market.change}%
                </span>
                <span className="text-gray-400">Vol: {market.volume}</span>
                <span className="text-gray-400">YTD: {market.yearToDate}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="bg-gray-800 rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Sector Performance</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {sectorPerformance.map((sector, index) => (
            <motion.div
              key={index}
              className="bg-gray-700 rounded-lg p-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h4 className="font-semibold mb-2">{sector.name}</h4>
              <p className={`text-lg ${sector.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {sector.change > 0 ? '+' : ''}{sector.change}%
              </p>
              <p className="text-sm text-gray-400">YTD: {sector.ytdChange}%</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TopMovers = ({ topMovers }) => {
  const [filter, setFilter] = useState('all');

  const filteredMovers = topMovers.filter(stock => {
    if (filter === 'gainers') return stock.change > 0;
    if (filter === 'losers') return stock.change < 0;
    return true;
  });

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Top Movers</h2>
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-blue-500' : 'bg-gray-700'}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`px-3 py-1 rounded ${filter === 'gainers' ? 'bg-green-500' : 'bg-gray-700'}`}
            onClick={() => setFilter('gainers')}
          >
            Gainers
          </button>
          <button
            className={`px-3 py-1 rounded ${filter === 'losers' ? 'bg-red-500' : 'bg-gray-700'}`}
            onClick={() => setFilter('losers')}
          >
            Losers
          </button>
        </div>
      </div>
      <ul className="space-y-4">
        {filteredMovers.map((stock, index) => (
          <motion.li
            key={index}
            className="bg-gray-700 rounded-lg p-4"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex justify-between items-center mb-2">
              <div>
                <span className="font-bold text-lg">{stock.symbol}</span>
                <span className="ml-2 text-sm text-gray-400">{stock.name}</span>
              </div>
              <span className={`text-lg font-semibold ${stock.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {stock.change > 0 ? <FaArrowUp className="inline mr-1" /> : <FaArrowDown className="inline mr-1" />}
                {Math.abs(stock.change).toFixed(2)}%
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>Price: ${stock.price.toFixed(2)}</div>
              <div>Volume: {stock.volume.toLocaleString()}</div>
              <div>Sector: {stock.sector}</div>
              <div>Day Range: {stock.dayRange}</div>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};


const NewsWidget = ({ news, loading, error }) => {
  if (loading) {
    return <div className="bg-gray-800 rounded-lg p-4">Loading news...</div>;
  }

  if (error) {
    return <div className="bg-gray-800 rounded-lg p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4">
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
            <h3 className="font-bold text-lg mb-2">{item.title}</h3>
            <p className="text-gray-400 mb-2">{item.teaser}</p>
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

export default HomePage;