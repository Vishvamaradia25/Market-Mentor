import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaExchangeAlt, FaDollarSign, FaArrowUp, FaArrowDown, FaUserPlus, FaChartPie, FaGlobeAmericas, FaCoins, FaOilCan, FaStar, FaCaretUp, FaCaretDown, FaNewspaper, FaApple, FaMicrosoft, FaAmazon, FaGoogle, FaFacebook, FaSearch, FaBell, FaUser, FaListUl, FaCog } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';





const HomePage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">StockMaster</h1>
        <div className="flex items-center space-x-4">
          <FaSearch className="text-gray-400 hover:text-white cursor-pointer" />
          <FaBell className="text-gray-400 hover:text-white cursor-pointer" />
          <FaUser className="text-gray-400 hover:text-white cursor-pointer" />
        </div>
      </header>

      {/* Stock Ticker */}
      <StockTicker />

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-gray-800 p-4">
          <WatchList />
        </nav>

        {/* Main Panel */}
        <main className="flex-grow p-4">
          {/* Tabs */}
          <div className="flex mb-4 border-b border-gray-700">
            <button
              className={`mr-4 py-2 ${activeTab === 'overview' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'}`}
              onClick={() => setActiveTab('overview')}
            >
              Market Overview
            </button>
            <button
              className={`mr-4 py-2 ${activeTab === 'movers' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'}`}
              onClick={() => setActiveTab('movers')}
            >
              Top Movers
            </button>
            <button
              className={`mr-4 py-2 ${activeTab === 'news' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'}`}
              onClick={() => setActiveTab('news')}
            >
              News
            </button>
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && <MarketOverview />}
            {activeTab === 'movers' && <TopMovers />}
            {activeTab === 'news' && <NewsWidget />}
          </motion.div>

          {/* TradingView Chart */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Market Chart</h2>
            <TradingViewWidget />
          </div>
        </main>
      </div>

      {/* Footer Navigation */}
      <footer className="bg-gray-800 p-4 fixed bottom-0 w-full">
        <div className="flex justify-around">
          <FaChartLine className="text-gray-400 hover:text-white cursor-pointer" />
          <FaNewspaper className="text-gray-400 hover:text-white cursor-pointer" />
          <FaListUl className="text-gray-400 hover:text-white cursor-pointer" />
          <FaCog className="text-gray-400 hover:text-white cursor-pointer" />
        </div>
      </footer>
    </div>
  );
};


const StockTicker = () => {
  const stocks = [
    { symbol: 'AAPL', price: 150.25, change: +1.5 },
    { symbol: 'GOOGL', price: 2750.80, change: -0.5 },
    { symbol: 'MSFT', price: 305.75, change: +0.8 },
    { symbol: 'AMZN', price: 3380.20, change: -0.2 },
    { symbol: 'FB', price: 330.15, change: +2.1 },
  ];

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



const WatchList = () => {
  const watchedStocks = [
    { symbol: 'AAPL', price: 150.25, change: +1.5 },
    { symbol: 'TSLA', price: 750.80, change: -0.5 },
    { symbol: 'NVDA', price: 205.75, change: +0.8 },
    { symbol: 'AMD', price: 90.20, change: -0.2 },
    { symbol: 'MSFT', price: 305.15, change: +2.1 },
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <FaStar className="text-yellow-400 mr-2" />
        Watchlist
      </h2>
      <ul className="space-y-4">
        {watchedStocks.map((stock, index) => (
          <li key={index} className="flex justify-between items-center">
            <div>
              <span className="font-bold">{stock.symbol}</span>
              <span className="ml-2 text-sm text-gray-400">${stock.price.toFixed(2)}</span>
            </div>
            <span className={`flex items-center ${stock.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {stock.change > 0 ? <FaCaretUp /> : <FaCaretDown />}
              {Math.abs(stock.change).toFixed(2)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};


const MarketOverview = () => {
  const markets = [
    { name: 'S&P 500', value: 4185.47, change: +0.75, icon: FaChartLine },
    { name: 'Dow Jones', value: 33800.60, change: -0.16, icon: FaGlobeAmericas },
    { name: 'NASDAQ', value: 14041.91, change: +0.51, icon: FaCoins },
    { name: 'Crude Oil', value: 63.13, change: +0.21, icon: FaOilCan },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {markets.map((market, index) => (
        <div key={index} className="bg-gray-800 rounded-lg p-4 flex items-center">
          <market.icon className="text-3xl mr-4 text-blue-400" />
          <div>
            <h3 className="font-bold">{market.name}</h3>
            <p className="text-lg">{market.value.toLocaleString()}</p>
            <span className={`text-sm ${market.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {market.change > 0 ? '+' : ''}{market.change}%
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};


const TopMovers = () => {
  const topMovers = [
    { symbol: 'GME', name: 'GameStop Corp.', price: 158.36, change: +18.76 },
    { symbol: 'TSLA', name: 'Tesla, Inc.', price: 677.02, change: -3.39 },
    { symbol: 'PLTR', name: 'Palantir Technologies', price: 23.29, change: +6.21 },
    { symbol: 'NIO', name: 'NIO Inc.', price: 38.12, change: -4.56 },
    { symbol: 'AAPL', name: 'Apple Inc.', price: 133.11, change: +2.02 },
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Top Movers</h2>
      <ul className="space-y-4">
        {topMovers.map((stock, index) => (
          <li key={index} className="flex justify-between items-center">
            <div>
              <span className="font-bold">{stock.symbol}</span>
              <span className="ml-2 text-sm text-gray-400">{stock.name}</span>
            </div>
            <div className="text-right">
              <p>${stock.price.toFixed(2)}</p>
              <span className={`flex items-center justify-end ${stock.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {stock.change > 0 ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
                {Math.abs(stock.change).toFixed(2)}%
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};



const NewsWidget = () => {
  const news = [
    { title: 'Fed Keeps Interest Rates Near Zero', source: 'Wall Street Journal', time: '2 hours ago' },
    { title: 'Amazon Workers Vote Against Unionizing in Alabama', source: 'New York Times', time: '4 hours ago' },
    { title: 'Coinbase is Public Listing Is a Cryptocurrency Coming-Out Party', source: 'Bloomberg', time: '6 hours ago' },
    { title: 'Chip Shortage Forces More Production Cuts', source: 'Reuters', time: '8 hours ago' },
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <FaNewspaper className="mr-2" />
        Latest News
      </h2>
      <ul className="space-y-4">
        {news.map((item, index) => (
          <li key={index} className="border-b border-gray-700 pb-2">
            <h3 className="font-bold">{item.title}</h3>
            <div className="flex justify-between text-sm text-gray-400">
              <span>{item.source}</span>
              <span>{item.time}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};


const TradingViewWidget = () => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 h-96">
      <h2 className="text-xl font-bold mb-4">Market Chart</h2>
      <div className="bg-gray-700 h-80 flex items-center justify-center">
        <p className="text-gray-400">TradingView Chart Placeholder</p>
        {/* In a real implementation, you would embed the TradingView widget here */}
      </div>
    </div>
  );
};

const HeroSection = () => {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 overflow-hidden"
    >
      <motion.div 
        className="absolute inset-0 opacity-20"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        {/* Add a background pattern of stock-related icons */}
        <div className="grid grid-cols-10 gap-4">
          {[...Array(100)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
              className="text-white text-4xl"
            >
              {i % 3 === 0 ? <FaChartLine /> : i % 3 === 1 ? <FaExchangeAlt /> : <FaDollarSign />}
            </motion.div>
          ))}
        </div>
      </motion.div>
      <div className="z-10 text-center">
        <motion.h1 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-6xl font-bold mb-4 text-white"
        >
          Master the Market
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-xl mb-8 text-gray-300"
        >
          Your journey to financial freedom starts here
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-green-500 hover:to-blue-600 transition duration-300"
        >
          Start Trading Now
        </motion.button>
      </div>
    </motion.section>
  );
};


const TrendsSection = () => {
  const trends = [
    { icon: FaArrowUp, color: 'text-green-400', title: 'Tesla Stock Surges', description: '15% growth in the last week' },
    { icon: FaUserPlus, color: 'text-blue-400', title: 'Investors Flock to Amazon', description: 'Record number of new investors' },
    { icon: FaArrowDown, color: 'text-red-400', title: 'Oil Prices Plummet', description: '10% drop due to oversupply' },
    { icon: FaChartPie, color: 'text-purple-400', title: 'Tech Sector Dominates', description: 'Makes up 30% of S&P 500' },
  ];

  return (
    <section className="py-16 px-8 bg-gray-900">
      <h2 className="text-4xl font-bold mb-12 text-center text-white">Market Trends</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {trends.map((trend, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <trend.icon className={`text-4xl mb-4 ${trend.color}`} />
            <h3 className="text-xl font-semibold mb-2 text-white">{trend.title}</h3>
            <p className="text-gray-400">{trend.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};


const NewsSection = () => {
  const news = [
    "Apple plans to invest $1B in AI startups",
    "Netflix subscriber growth slows in Q2",
    "Exxon Mobil faces pressure to adopt green energy",
    "Amazon opens new fulfillment centers, creating 5000 jobs",
    "Google's quantum computing breakthrough",
  ];

  return (
    <div className="bg-gray-800 py-4 overflow-hidden">
      <div className="flex items-center">
        <FaNewspaper className="text-2xl text-yellow-400 ml-4 mr-2" />
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
          className="whitespace-nowrap"
        >
          {news.map((item, index) => (
            <span key={index} className="mx-4 text-white">{item}</span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};


const ChartSection = () => {
  const data = [
    { name: 'Jan', Apple: 4000, Microsoft: 2400, Amazon: 2400 },
    { name: 'Feb', Apple: 3000, Microsoft: 1398, Amazon: 2210 },
    { name: 'Mar', Apple: 2000, Microsoft: 9800, Amazon: 2290 },
    { name: 'Apr', Apple: 2780, Microsoft: 3908, Amazon: 2000 },
    { name: 'May', Apple: 1890, Microsoft: 4800, Amazon: 2181 },
    { name: 'Jun', Apple: 2390, Microsoft: 3800, Amazon: 2500 },
    { name: 'Jul', Apple: 3490, Microsoft: 4300, Amazon: 2100 },
  ];

  return (
    <section className="py-16 px-8 bg-gray-900">
      <h2 className="text-4xl font-bold mb-12 text-center text-white">Company Comparison</h2>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full h-96"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Apple" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="Microsoft" stroke="#82ca9d" />
            <Line type="monotone" dataKey="Amazon" stroke="#ffc658" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </section>
  );
};


const CompanyListSection = () => {
  const companies = [
    { name: 'Apple', icon: FaApple, color: 'text-gray-400' },
    { name: 'Microsoft', icon: FaMicrosoft, color: 'text-blue-500' },
    { name: 'Amazon', icon: FaAmazon, color: 'text-yellow-500' },
    { name: 'Google', icon: FaGoogle, color: 'text-red-500' },
    { name: 'Facebook', icon: FaFacebook, color: 'text-blue-600' },
  ];

  return (
    <section className="py-16 px-8 bg-gray-800">
      <h2 className="text-4xl font-bold mb-12 text-center text-white">Top Companies</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {companies.map((company, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.1 }}
            className="bg-gray-700 p-6 rounded-lg shadow-lg text-center"
          >
            <company.icon className={`text-6xl mb-4 mx-auto ${company.color}`} />
            <h3 className="text-xl font-semibold text-white">{company.name}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HomePage;