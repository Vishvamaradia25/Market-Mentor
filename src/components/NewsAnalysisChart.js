import React, { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import { FaChartLine, FaChartBar, FaChartPie, FaDollarSign, FaBrain } from 'react-icons/fa';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI('AIzaSyAkIxz2zqMBwz4o791F_tbHpUUuMG6e8oc');

const AIMarketDashboard = ({ news }) => {
  const [aiPredictions, setAiPredictions] = useState(null);

  const stockMentions = useMemo(() => {
    const mentions = {};
    news.forEach(item => {
      item.stocks.forEach(stock => {
        mentions[stock.name] = (mentions[stock.name] || 0) + 1;
      });
    });
    return Object.entries(mentions).map(([name, count]) => ({ name, count }));
  }, [news]);

  const topicTrends = useMemo(() => {
    const trends = {};
    news.forEach(item => {
      const date = new Date(item.created).toLocaleDateString();
      item.tags.forEach(tag => {
        if (!trends[tag.name]) trends[tag.name] = {};
        trends[tag.name][date] = (trends[tag.name][date] || 0) + 1;
      });
    });
    return Object.entries(trends).map(([topic, dates]) => ({
      topic,
      ...Object.entries(dates).reduce((acc, [date, count]) => ({ ...acc, [date]: count }), {})
    }));
  }, [news]);

  const sentimentOverTime = useMemo(() => {
    return news.map(item => ({
      date: new Date(item.created).toLocaleDateString(),
      sentiment: item.title.toLowerCase().includes('growth') || item.title.toLowerCase().includes('positive') ? 1 :
                 item.title.toLowerCase().includes('decline') || item.title.toLowerCase().includes('negative') ? -1 : 0
    }));
  }, [news]);

  useEffect(() => {
    const getPredictions = async () => {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});

        const prompt = `Analyze this news data and provide predictions for AI market trends. 
        Return the response in JSON format with the following structure:
        {
          "trend": "The next big trend in AI",
          "leaders": ["Company1", "Company2", "Company3"],
          "marketSize": "Estimated market size in billions of dollars"
        }

        News data: ${JSON.stringify(news)}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // Parse the JSON response
        const predictions = JSON.parse(text);
        setAiPredictions(predictions);
      } catch (error) {
        console.error('Error fetching AI predictions:', error);
      }
    };

    getPredictions();
  }, [news]);

  const COLORS = ['#4CAF50', '#2196F3', '#FFC107', '#E91E63', '#9C27B0', '#00BCD4', '#FF5722', '#795548'];

  return (
    <div className="p-4 space-y-8 bg-gray-900 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">AI Market Insights Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 flex items-center text-green-400">
            <FaChartBar className="mr-2" /> AI Company Mentions
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stockMentions}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
              <Legend />
              <Bar dataKey="count" fill="#4CAF50" name="Mentions" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 flex items-center text-yellow-400">
            <FaChartLine className="mr-2" /> Topic Trends
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={topicTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="topic" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
              <Legend />
              {Object.keys(topicTrends[0] || {}).filter(key => key !== 'topic').map((key, index) => (
                <Line key={key} type="monotone" dataKey={key} stroke={COLORS[index % COLORS.length]} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 flex items-center text-purple-400">
            <FaChartLine className="mr-2" /> Sentiment Over Time
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sentimentOverTime}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="date" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
              <Legend />
              <Line type="monotone" dataKey="sentiment" stroke="#E91E63" name="Sentiment" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 flex items-center text-blue-400">
            <FaBrain className="mr-2" /> AI-Generated Predictions
          </h2>
          {aiPredictions ? (
            <div className="text-white">
              <p><strong>Next Big Trend:</strong> {aiPredictions.trend}</p>
              <p><strong>Potential Market Leaders:</strong> {aiPredictions.leaders.join(', ')}</p>
              <p><strong>Estimated Market Size:</strong> ${aiPredictions.marketSize} billion</p>
            </div>
          ) : (
            <p className="text-white">Loading AI predictions...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIMarketDashboard;