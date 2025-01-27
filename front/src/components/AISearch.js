import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaSpinner, FaTimesCircle } from 'react-icons/fa';
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from 'react-markdown';

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

      Please provide your advice in the following Markdown format:

      ## 1. Investment Recommendation

      ## 2. Reasons for Recommendation

      ## 3. Potential Risks

      ## 4. Potential Opportunities

      ## 5. Suggested Investment Timeline

      ## 6. Diversification Advice

      ## 7. Next Steps

      Please ensure your response is concise, clear, and tailored to the user's profile and favorite companies.
    `;

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      setAiAdvice(text);
    } catch (error) {
      console.error('Error generating AI advice:', error);
      setError('An error occurred while generating investment advice. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const closeSimulator = () => {
    setIsSimulatorOpen(false);
    setCurrentStep(0);
    setUserResponses({});
    setAiAdvice(null);
    setError(null);
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
              className="bg-gray-800 p-8 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
            >
              <button
                onClick={closeSimulator}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition duration-300"
              >
                <FaTimesCircle size={24} />
              </button>

              <h2 className="text-2xl font-bold mb-6 text-white flex items-center justify-center">
                <FaRobot className="mr-2" /> AI Investment Simulator
              </h2>

              {currentStep < questions.length ? (
                <div className="text-center">
                  <h3 className="text-xl mb-4 text-white">{questions[currentStep].question}</h3>
                  <div className="grid grid-cols-1 gap-4">
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
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                  className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition duration-300 mt-4 w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Generating...' : 'Generate AI Advice'}
                </motion.button>
              )}
 <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                  className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition duration-300 mt-4 mb-10 w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Generating...' : 'Generate AI Advice'}
                </motion.button>
              {isLoading && (
                <div className="flex items-center justify-center mt-4">
                  <FaSpinner className="animate-spin text-white mr-2" />
                  <p className="text-white">Generating AI Investment Advice...</p>
                </div>
              )}

              {error && (
                <div className="bg-red-600 text-white p-4 rounded-lg mt-4">
                  <p>{error}</p>
                </div>
              )}

              {aiAdvice && (
                <div className="bg-gray-700 p-6 rounded-lg mt-6 mb-6">
                  <h3 className="text-xl font-bold mb-4 text-white">AI Investment Advice</h3>
                  <div className="text-white prose prose-invert">
                    <ReactMarkdown>{aiAdvice}</ReactMarkdown>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AISearch;