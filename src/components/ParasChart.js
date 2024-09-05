import React from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    "Summary": "Promoter",
    "JUNN2024": 58.9,
    "MARR2024": 58.9,
    "DECC2023": 58.9,
    "SEPP2023": 58.9
  },
  {
    "Summary": "FII",
    "JUNN2024": 3,
    "MARR2024": 0.1,
    "DECC2023": 0.5,
    "SEPP2023": 0.6
  },
  {
    "Summary": "DII",
    "JUNN2024": 0.1,
    "MARR2024": 2.8,
    "DECC2023": 2.7,
    "SEPP2023": 2.7
  },
  {
    "Summary": "Public",
    "JUNN2024": 38,
    "MARR2024": 38.2,
    "DECC2023": 37.8,
    "SEPP2023": 37.8
  },
  {
    "Summary": "Others",
    "JUNN2024": 0,
    "MARR2024": 0,
    "DECC2023": 0,
    "SEPP2023": 0
  }
];

const COLORS = ['#FFC300', '#DAA520', '#FFD700', '#F0E68C', '#FFFACD'];

const ParasChart = () => {
  const latestData = data.map(item => ({
    name: item.Summary,
    value: item.JUNN2024
  }));

  return (
    <div className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-yellow-400">Paras Defence Shareholding Pattern Dashboard</h1>
      
      {/* Bar Chart */}
      <div className="mb-12 bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-yellow-300">Shareholding Pattern Over Time</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#555" />
            <XAxis dataKey="Summary" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
            <Legend />
            <Bar dataKey="JUNN2024" fill={COLORS[0]} name="June 2024" />
            <Bar dataKey="MARR2024" fill={COLORS[1]} name="March 2024" />
            <Bar dataKey="DECC2023" fill={COLORS[2]} name="December 2023" />
            <Bar dataKey="SEPP2023" fill={COLORS[3]} name="September 2023" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart */}
      <div className="mb-12 bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-yellow-300">Shareholding Trend</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#555" />
            <XAxis dataKey="Summary" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
            <Legend />
            <Line type="monotone" dataKey="JUNN2024" stroke={COLORS[0]} name="June 2024" strokeWidth={2} />
            <Line type="monotone" dataKey="MARR2024" stroke={COLORS[1]} name="March 2024" strokeWidth={2} />
            <Line type="monotone" dataKey="DECC2023" stroke={COLORS[2]} name="December 2023" strokeWidth={2} />
            <Line type="monotone" dataKey="SEPP2023" stroke={COLORS[3]} name="September 2023" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie and Doughnut Charts */}
      <div className="flex flex-wrap -mx-4">
        <div className="w-full md:w-1/2 px-4 mb-8">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 h-full">
            <h2 className="text-2xl font-semibold mb-6 text-yellow-300">Latest Shareholding Distribution (Pie)</h2>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={latestData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {latestData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="w-full md:w-1/2 px-4 mb-8">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 h-full">
            <h2 className="text-2xl font-semibold mb-6 text-yellow-300">Latest Shareholding Distribution (Doughnut)</h2>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={latestData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  outerRadius={150}
                  innerRadius={70}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {latestData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParasChart;