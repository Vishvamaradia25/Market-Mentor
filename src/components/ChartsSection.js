import React from 'react';
import { motion } from 'framer-motion';
import { FaChartLine } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const companyData = [
  { name: 'HAL', symbol: 'HAL', port: 8060 },
  { name: 'Paras', symbol: 'PARAS', port: 8050 },
  { name: 'Action', symbol: 'ACTION', port: 8070 },
  { name: 'Waaree', symbol: 'WAAREE', port: 8090 },
  { name: 'Wipro', symbol: 'WIPRO', port: 8080 },
];

const ChartsSection = () => {
  const navigate = useNavigate();

  const handleCompanyClick = (port) => {
    window.open(`http://localhost:${port}`, '_blank');
  };

  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <FaChartLine className="mr-2" /> Stock Predictions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companyData.map((company) => (
          <motion.div
            key={company.symbol}
            className="bg-gray-800 bg-opacity-50 rounded-lg overflow-hidden backdrop-filter backdrop-blur-lg cursor-pointer"
            whileHover={{ scale: 1.05, zIndex: 1 }}
            onClick={() => handleCompanyClick(company.port)}
          >
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{company.name} ({company.symbol})</h3>
              <p className="text-sm text-gray-300">Click to view dynamic charts and predictions</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ChartsSection;