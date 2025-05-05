import { useState } from 'react';
import { BarChart3, PieChart, LineChart, ArrowUpRight, Download, Filter } from 'lucide-react';

export default function Analytics() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 font-azonix">Statistics</h1>
        <div className="flex space-x-2">
          <button className="flex items-center px-3 py-2 bg-white border rounded-md text-sm text-gray-700 hover:bg-gray-50">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button className="flex items-center px-3 py-2 bg-white border rounded-md text-sm text-gray-700 hover:bg-gray-50">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <nav className="flex -mb-px space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('performance')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'performance'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Performance
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'users'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Users
          </button>
        </nav>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-800 font-azonix">User Growth</h3>
            <span className="flex items-center text-sm font-medium text-green-600">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              12.5%
            </span>
          </div>
          <div className="h-48 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <LineChart size={48} className="text-gray-300 mb-4" />
              <p className="text-gray-500 text-sm">Growth chart will appear here</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-800 font-azonix">Session Distribution</h3>
            <button className="text-sm text-purple-600 hover:text-purple-800">Details</button>
          </div>
          <div className="h-48 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <PieChart size={48} className="text-gray-300 mb-4" />
              <p className="text-gray-500 text-sm">Distribution chart will appear here</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-800 font-azonix">Completion Rates</h3>
            <button className="text-sm text-purple-600 hover:text-purple-800">Details</button>
          </div>
          <div className="h-48 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <BarChart3 size={48} className="text-gray-300 mb-4" />
              <p className="text-gray-500 text-sm">Completion chart will appear here</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed stats */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-medium text-gray-800 font-azonix">Detailed Statistics</h3>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Metric
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Previous
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Change
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { name: 'Total Users', current: '1,248', previous: '1,156', change: '+8.0%', positive: true },
                  { name: 'Active Users', current: '876', previous: '792', change: '+10.6%', positive: true },
                  {
                    name: 'Avg. Session Duration',
                    current: '24 min',
                    previous: '26 min',
                    change: '-7.7%',
                    positive: false,
                  },
                  { name: 'Completion Rate', current: '87%', previous: '82%', change: '+6.1%', positive: true },
                  { name: 'Bounce Rate', current: '24%', previous: '28%', change: '-14.3%', positive: true },
                ].map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.current}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.previous}</td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm ${
                        item.positive ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {item.change}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}