// App.js
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import HomePage from './components/Homepage';

function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-purple-700 to-blue-500 text-white"
    >
      <Navbar />
      <HomePage />
    </motion.div>
  );
}

export default App;


