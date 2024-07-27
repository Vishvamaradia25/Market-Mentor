import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaChartLine, FaExchangeAlt, FaDollarSign, FaArrowUp, FaArrowDown, FaProjectDiagram, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
import profileData from '../data/profile.json';
import Navbar from './Navbar';

const CompanyProfile = () => {
  const { symbol } = useParams();
  const company = profileData[symbol];

  if (!company) {
    return <div>Company not found</div>;
  }

  return (
    <>
            <Navbar />
    <div className="bg-gray-900 min-h-screen text-white p-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex items-center mb-8">
          <img src={company.logo} alt={company.name} className="w-16 h-16 mr-4" />
          <h1 className="text-4xl font-bold">{company.name}</h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl mb-8"
        >
          {company.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800 rounded-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <FaChartLine className="mr-2" /> Stock Information
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400">Symbol</p>
              <p className="text-2xl font-bold">{company.stockInfo.symbol}</p>
            </div>
            <div>
              <p className="text-gray-400">Exchange</p>
              <p className="text-2xl">{company.stockInfo.exchange}</p>
            </div>
            <div>
              <p className="text-gray-400">Current Price</p>
              <p className="text-2xl font-bold">₹{company.stockInfo.currentPrice.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-gray-400">Change</p>
              <p className={`text-2xl font-bold flex items-center ${company.stockInfo.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {company.stockInfo.change > 0 ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
                ₹{Math.abs(company.stockInfo.change).toFixed(2)} ({company.stockInfo.changePercent.toFixed(2)}%)
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-800 rounded-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <FaInfoCircle className="mr-2" /> Key Statistics
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {Object.entries(company.keyStats).map(([key, value]) => (
              <div key={key}>
                <p className="text-gray-400">{key}</p>
                <p className="text-xl font-bold">{value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gray-800 rounded-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <FaProjectDiagram className="mr-2" /> Key Projects
          </h2>
          <ul className="list-disc list-inside">
            {company.projects.map((project, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="mb-2"
              >
                {project}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-gray-800 rounded-lg p-6"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <FaCheckCircle className="mr-2" /> Reasons to Invest
          </h2>
          <ul className="space-y-2">
            {company.reasons.map((reason, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-start"
              >
                <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span>{reason}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </div>
    </>

  );
};

export default CompanyProfile;