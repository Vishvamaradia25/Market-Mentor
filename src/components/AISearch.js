import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaChartLine, FaQuestionCircle, FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI('AIzaSyAkIxz2zqMBwz4o791F_tbHpUUuMG6e8oc');

const AISearch = ({ favorites, homedata }) => {
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [userResponses, setUserResponses] = useState({});
  const [aiAdvice, setAiAdvice] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const questions = [
    { id: 'risk', question: 'How would you describe your risk tolerance?', options: ['Low', 'Medium', 'High'] },
    { id: 'timeline', question: 'What\'s your investment timeline?', options: ['Short-term (< 1 year)', 'Medium-term (1-5 years)', 'Long-term (5+ years)'] },
    { id: 'goal', question: 'What\'s your primary investment goal?', options: ['Capital preservation', 'Balanced growth', 'Aggressive growth'] },
  ];

  const handleResponseSelect = (questionId, response) => {
    setUserResponses(prev => ({ ...prev, [questionId]: response }));
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = () => {
    if (Object.keys(userResponses).length === questions.length) {
      generateAIAdvice();
    } else {
      setError('Please answer all questions before submitting.');
    }
  };

  const generateAIAdvice = async () => {
    setIsLoading(true);
    setError(null);
    const favoriteCompanies = favorites.map(symbol => homedata.featuredCompanies.find(company => company.symbol === symbol));
    
    const prompt = `
      As an AI investment advisor, provide structured advice based on the following user profile and favorite companies:

      User Profile:
      - Risk Tolerance: ${userResponses.risk}
      - Investment Timeline: ${userResponses.timeline}
      - Investment Goal: ${userResponses.goal}

      Favorite Companies:
      ${favoriteCompanies.map(company => `- ${company.name} (${company.symbol})`).join('\n')}

      Please provide your advice in the following format:

      1. Investment Recommendation:
      [Clearly state whether it's advisable to invest in these companies]

      2. Reasons for Recommendation:
      [List 3-4 key reasons supporting your recommendation]

      3. Potential Risks:
      [List 2-3 potential risks associated with this investment strategy]

      4. Potential Opportunities:
      [List 2-3 potential opportunities or benefits]

      5. Suggested Investment Timeline:
      [Provide a clear timeline recommendation]

      6. Diversification Advice:
      [Offer suggestions for portfolio diversification]

      7. Next Steps:
      [Provide 2-3 actionable steps for the investor to take]

      Please ensure your response is concise, clear, and tailored to the user's profile and favorite companies.
    `;

    try {
      console.log('Generating AI advice...');
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      console.log('AI advice generated successfully');
      setAiAdvice(text);
    } catch (error) {
      console.error('Error generating AI advice:', error);
      setError('An error occurred while generating investment advice. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsSimulatorOpen(true)}
        className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition duration-300 flex items-center"
      >
        <FaRobot className="mr-2" /> Launch AI Investment Simulator
      </motion.button>

      <AnimatePresence>
        {isSimulatorOpen && (
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
              className="bg-gray-800 p-8 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-2xl font-bold mb-6 text-white flex items-center">
                <FaRobot className="mr-2" /> AI Investment Simulator
              </h2>

              {currentStep < questions.length && (
                <div>
                  <h3 className="text-xl mb-4 text-white">{questions[currentStep].question}</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {questions[currentStep].options.map((option, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleResponseSelect(questions[currentStep].id, option)}
                        className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
                      >
                        {option}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

{currentStep === questions.length && (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={handleSubmit}
    className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition duration-300 mt-4"
  >
    Generate AI Advice
  </motion.button>
)}

              {isLoading && (
                <div className="flex flex-col items-center justify-center h-64">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 text-blue-500"
                  >
                    <FaSpinner className="w-full h-full" />
                  </motion.div>
                  <p className="mt-4 text-white text-lg">Generating AI Investment Advice...</p>
                </div>
              )}

              {error && (
                <div className="bg-red-600 text-white p-4 rounded-lg mb-4">
                  <p>{error}</p>
                </div>
              )}

              {aiAdvice && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-700 p-6 rounded-lg mt-4"
                >
                  <h3 className="text-xl font-bold mb-4 text-white">AI Investment Advice</h3>
                  <div className="text-white whitespace-pre-wrap">{aiAdvice}</div>
                </motion.div>
              )}

              <div className="mt-6 flex justify-end gap-10">
 <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={handleSubmit}
    className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition duration-300 mt-4"
  >
    Generate AI Advice
  </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setIsSimulatorOpen(false);
                    setCurrentStep(0);
                    setUserResponses({});
                    setAiAdvice(null);
                    setError(null);
                  }}
                  className="bg-red-500 text-white px-4 rounded-md hover:bg-red-600 transition duration-300"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AISearch;