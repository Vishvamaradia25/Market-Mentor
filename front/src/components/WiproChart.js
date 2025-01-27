import React from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
      "Summary": "Promoter",
      "JUNN24": 72.8,
      "MARR2024": 72.9,
      "DECC2023": 72.9,
      "SEPP2023": 72.9
    },
    {
      "Summary": "FII",
      "JUNN24": 7.1,
      "MARR2024": 7,
      "DECC2023": 6.7,
      "SEPP2023": 6.5
    },
    {
      "Summary": "DII",
      "JUNN24": 10.6,
      "MARR2024": 10.7,
      "DECC2023": 10.5,
      "SEPP2023": 10.5
    },
    {
      "Summary": "Public",
      "JUNN24": 9.4,
      "MARR2024": 9.4,
      "DECC2023": 9.8,
      "SEPP2023": 10
    },
    {
      "Summary": "Others",
      "JUNN24": 0.1,
      "MARR2024": 0.1,
      "DECC2023": 0.1,
      "SEPP2023": 0.1
    }
  ];

const COLORS = ['#0072C6', '#00B294', '#68217A', '#00188F', '#00BCF2'];

const WiproChart = () => {
  const latestData = data.map(item => ({
    name: item.Summary,
    value: item.JUNN24
  }));

  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 to-green-50 text-gray-800 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-700">Wipro Shareholding Pattern Dashboard</h1>
      
      {/* Bar Chart */}
      <div className="mb-12 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-blue-700">Shareholding Pattern Over Time</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="Summary" stroke="#4a5568" />
            <YAxis stroke="#4a5568" />
            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0' }} />
            <Legend />
            <Bar dataKey="JUNN24" fill={COLORS[0]} name="June 2024" />
            <Bar dataKey="MARR2024" fill={COLORS[1]} name="March 2024" />
            <Bar dataKey="DECC2023" fill={COLORS[2]} name="December 2023" />
            <Bar dataKey="SEPP2023" fill={COLORS[3]} name="September 2023" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart */}
      <div className="mb-12 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-blue-700">Shareholding Trend</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="Summary" stroke="#4a5568" />
            <YAxis stroke="#4a5568" />
            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0' }} />
            <Legend />
            <Line type="monotone" dataKey="JUNN24" stroke={COLORS[0]} name="June 2024" strokeWidth={2} />
            <Line type="monotone" dataKey="MARR2024" stroke={COLORS[1]} name="March 2024" strokeWidth={2} />
            <Line type="monotone" dataKey="DECC2023" stroke={COLORS[2]} name="December 2023" strokeWidth={2} />
            <Line type="monotone" dataKey="SEPP2023" stroke={COLORS[3]} name="September 2023" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie and Doughnut Charts */}
      <div className="flex flex-wrap -mx-4">
        <div className="w-full md:w-1/2 px-4 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 h-full">
            <h2 className="text-2xl font-semibold mb-6 text-blue-700">Latest Shareholding Distribution (Pie)</h2>
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
            <h2 className="text-2xl font-semibold mb-6 text-blue-700">Latest Shareholding Distribution (Doughnut)</h2>
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

export default WiproChart;