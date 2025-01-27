import React from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
      "Summary": "Promoter",
      "JUNN2024": 65.4,
      "MARCHH2024": 66.8,
      "DECC2023": 66.8,
      "SEPP2023": 66.8
    },
    {
      "Summary": "FII",
      "JUNN2024": 10.1,
      "MARCHH2024": 9.4,
      "DECC2023": 8.8,
      "SEPP2023": 9
    },
    {
      "Summary": "DII",
      "JUNN2024": 1.8,
      "MARCHH2024": 2.2,
      "DECC2023": 2.6,
      "SEPP2023": 2.8
    },
    {
      "Summary": "Public",
      "JUNN2024": 22.6,
      "MARCHH2024": 21.6,
      "DECC2023": 21.8,
      "SEPP2023": 21.5
    },
    {
      "Summary": "Others",
      "JUNN2024": 0.1,
      "MARCHH2024": 0.1,
      "DECC2023": 0.1,
      "SEPP2023": 0
    }
  ]

const COLORS = ['#0284c7', '#0369a1', '#0ea5e9', '#7dd3fc', '#e0f2fe'];

const HALChart = () => {
  const latestData = data.map(item => ({
    name: item.Summary,
    value: item.JUNN2024 // Corrected from JUNN024 to JUNN2024
  }));

  return (
    <div className="p-8 bg-gradient-to-br from-sky-100 to-gray-100 text-gray-800 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-sky-700">HAL Shareholding Pattern Dashboard</h1>
      
      {/* Bar Chart */}
      <div className="mb-12 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-sky-700">Shareholding Pattern Over Time</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="Summary" stroke="#4a5568" />
            <YAxis stroke="#4a5568" />
            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0' }} />
            <Legend />
            <Bar dataKey="JUNN2024" fill={COLORS[0]} name="June 2024" />
            <Bar dataKey="MARCHH2024" fill={COLORS[1]} name="March 2024" />
            <Bar dataKey="DECC2023" fill={COLORS[2]} name="December 2023" />
            <Bar dataKey="SEPP2023" fill={COLORS[3]} name="September 2023" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart */}
      <div className="mb-12 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-sky-700">Shareholding Trend</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="Summary" stroke="#4a5568" />
            <YAxis stroke="#4a5568" />
            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0' }} />
            <Legend />
            <Line type="monotone" dataKey="JUNN2024" stroke={COLORS[0]} name="June 2024" strokeWidth={2} />
            <Line type="monotone" dataKey="MARCHH2024" stroke={COLORS[1]} name="March 2024" strokeWidth={2} />
            <Line type="monotone" dataKey="DECC2023" stroke={COLORS[2]} name="December 2023" strokeWidth={2} />
            <Line type="monotone" dataKey="SEPP2023" stroke={COLORS[3]} name="September 2023" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie and Doughnut Charts */}
      <div className="flex flex-wrap -mx-4">
        <div className="w-full md:w-1/2 px-4 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 h-full">
            <h2 className="text-2xl font-semibold mb-6 text-sky-700">Latest Shareholding Distribution (Pie)</h2>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={latestData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {latestData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="w-full md:w-1/2 px-4 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 h-full">
            <h2 className="text-2xl font-semibold mb-6 text-sky-700">Latest Shareholding Distribution (Doughnut)</h2>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={latestData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={150}
                  innerRadius={70}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {latestData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HALChart;