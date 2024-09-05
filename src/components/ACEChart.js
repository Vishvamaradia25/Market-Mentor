import React from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
      "Summary": "Promoter",
      "junn24": 71.6,
      "marr24": 72,
      "decc2023": 71.6,
      "sepp2023": 71.6
    },
    {
      "Summary": "FII",
      "junn24": 11.7,
      "marr24": 12.4,
      "decc2023": 12.9,
      "sepp2023": 12.6
    },
    {
      "Summary": "DII",
      "junn24": 8.8,
      "marr24": 9.6,
      "decc2023": 9.1,
      "sepp2023": 9.7
    },
    {
      "Summary": "Public",
      "junn24": 7.9,
      "marr24": 6.4,
      "decc2023": 6.3,
      "sepp2023": 6
    },
    {
      "Summary": "Others",
      "junn24": 0,
      "marr24": 0,
      "decc2023": 0,
      "sepp2023": 0
    }
  ];

const COLORS = ['#FBC02D', '#FFA000', '#FFB300', '#FFD54F', '#FFE082'];

const ACEChart = () => {
  const latestData = data.map(item => ({
    name: item.Summary,
    value: item.junn24
  }));

  return (
    <div className="p-8 bg-gradient-to-br from-yellow-50 to-gray-100 text-gray-800 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-yellow-700">ACE Shareholding Pattern Dashboard</h1>
      
      {/* Bar Chart */}
      <div className="mb-12 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-yellow-700">Shareholding Pattern Over Time</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="Summary" stroke="#4a5568" />
            <YAxis stroke="#4a5568" />
            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0' }} />
            <Legend />
            <Bar dataKey="junn24" fill={COLORS[0]} name="June 2024" />
            <Bar dataKey="marr24" fill={COLORS[1]} name="March 2024" />
            <Bar dataKey="decc2023" fill={COLORS[2]} name="December 2023" />
            <Bar dataKey="sepp2023" fill={COLORS[3]} name="September 2023" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart */}
      <div className="mb-12 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-yellow-700">Shareholding Trend</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="Summary" stroke="#4a5568" />
            <YAxis stroke="#4a5568" />
            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0' }} />
            <Legend />
            <Line type="monotone" dataKey="junn24" stroke={COLORS[0]} name="June 2024" strokeWidth={2} />
            <Line type="monotone" dataKey="marr24" stroke={COLORS[1]} name="March 2024" strokeWidth={2} />
            <Line type="monotone" dataKey="decc2023" stroke={COLORS[2]} name="December 2023" strokeWidth={2} />
            <Line type="monotone" dataKey="sepp2023" stroke={COLORS[3]} name="September 2023" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie and Doughnut Charts */}
      <div className="flex flex-wrap -mx-4">
        <div className="w-full md:w-1/2 px-4 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 h-full">
            <h2 className="text-2xl font-semibold mb-6 text-yellow-700">Latest Shareholding Distribution (Pie)</h2>
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
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="w-full md:w-1/2 px-4 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 h-full">
            <h2 className="text-2xl font-semibold mb-6 text-yellow-700">Latest Shareholding Distribution (Doughnut)</h2>
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
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ACEChart;