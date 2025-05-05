import { useState, useEffect } from 'react';
import { BarChart3, ArrowUp, ArrowDown, Brain, Users, Activity, Clock } from 'lucide-react';

export default function Home() {
  const [stats, setStats] = useState({
    users: 0,
    sessions: 0,
    avgTime: 0,
    completion: 0,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        users: 1248,
        sessions: 3429,
        avgTime: 24,
        completion: 87,
      });
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 font-azonix">Dashboard Overview</h1>
        <div className="flex space-x-2">
          <select className="px-3 py-2 bg-white border rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>Last year</option>
          </select>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
            Export
          </button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <p className="text-2xl font-semibold text-gray-800">{stats.users.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <div className="flex items-center text-green-500">
              <ArrowUp className="w-4 h-4 mr-1" />
              <span>12%</span>
            </div>
            <span className="ml-2 text-gray-500">from last month</span>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Sessions</p>
              <p className="text-2xl font-semibold text-gray-800">{stats.sessions.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <div className="flex items-center text-green-500">
              <ArrowUp className="w-4 h-4 mr-1" />
              <span>18%</span>
            </div>
            <span className="ml-2 text-gray-500">from last month</span>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Avg. Session Time</p>
              <p className="text-2xl font-semibold text-gray-800">{stats.avgTime} min</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <div className="flex items-center text-red-500">
              <ArrowDown className="w-4 h-4 mr-1" />
              <span>3%</span>
            </div>
            <span className="ml-2 text-gray-500">from last month</span>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Completion Rate</p>
              <p className="text-2xl font-semibold text-gray-800">{stats.completion}%</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <Activity className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <div className="flex items-center text-green-500">
              <ArrowUp className="w-4 h-4 mr-1" />
              <span>7%</span>
            </div>
            <span className="ml-2 text-gray-500">from last month</span>
          </div>
        </div>
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-800 font-azonix">User Activity</h3>
            <button className="text-sm text-purple-600 hover:text-purple-800">View Details</button>
          </div>
          <div className="h-64 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <BarChart3 size={64} className="text-gray-300 mb-4" />
              <p className="text-gray-500 text-sm">Activity chart will appear here</p>
              <p className="text-xs text-gray-400 mt-1">Connect to your data source</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-800 font-azonix">Performance Metrics</h3>
            <button className="text-sm text-purple-600 hover:text-purple-800">View Details</button>
          </div>
          <div className="h-64 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <BarChart3 size={64} className="text-gray-300 mb-4" />
              <p className="text-gray-500 text-sm">Performance chart will appear here</p>
              <p className="text-xs text-gray-400 mt-1">Connect to your data source</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-medium text-gray-800 font-azonix">Recent Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold mr-4">
                  U{item}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">User completed assessment #{1000 + item}</p>
                  <p className="text-xs text-gray-500 mt-1">{new Date(Date.now() - item * 3600000).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <button className="text-sm text-purple-600 hover:text-purple-800">View All Activity</button>
          </div>
        </div>
      </div>
    </div>
  );
}