"use client"

import { useState, useEffect } from "react"
import {
  ArrowUp,
  ArrowDown,
  Brain,
  Users,
  Activity,
  Clock,
  TrendingUp,
  Calendar,
  ChevronRight,
  MoreHorizontal,
  Zap,
} from "lucide-react"

export default function Home() {
  const [stats, setStats] = useState({
    users: 0,
    sessions: 0,
    avgTime: 0,
    completion: 0,
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        users: 1248,
        sessions: 3429,
        avgTime: 24,
        completion: 87,
      })
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  // Sample data for charts
  const recentActivity = [
    {
      id: 1,
      user: "Alex Johnson",
      action: "completed assessment #1005",
      time: "2 hours ago",
      avatar: "AJ",
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: 2,
      user: "Maria Garcia",
      action: "started new session #2431",
      time: "3 hours ago",
      avatar: "MG",
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 3,
      user: "Robert Chen",
      action: "completed assessment #1006",
      time: "5 hours ago",
      avatar: "RC",
      color: "bg-green-100 text-green-600",
    },
    {
      id: 4,
      user: "Sarah Williams",
      action: "updated profile settings",
      time: "6 hours ago",
      avatar: "SW",
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      id: 5,
      user: "James Miller",
      action: "completed assessment #1007",
      time: "8 hours ago",
      avatar: "JM",
      color: "bg-red-100 text-red-600",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold dark:text-white text-gray-800">Dashboard Overview</h1>
          <p className="text-sm dark:text-gray-400 text-gray-500 mt-1">
            Welcome back, here's what's happening with your platform today.
          </p>
        </div>
        <div className="flex space-x-2">
          <select className="px-3 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 bg-white border border-gray-200 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
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
        <div className="p-6 dark:bg-gray-800 dark:border-gray-700 bg-white rounded-lg shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium dark:text-gray-400 text-gray-500">Total Users</p>
              <p className="text-2xl font-semibold dark:text-white text-gray-800 mt-1">
                {loading ? (
                  <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                ) : (
                  stats.users.toLocaleString()
                )}
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <div className="flex items-center text-green-500 dark:text-green-400">
              <ArrowUp className="w-4 h-4 mr-1" />
              <span>12%</span>
            </div>
            <span className="ml-2 dark:text-gray-400 text-gray-500">from last month</span>
          </div>
        </div>

        <div className="p-6 dark:bg-gray-800 dark:border-gray-700 bg-white rounded-lg shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium dark:text-gray-400 text-gray-500">Total Sessions</p>
              <p className="text-2xl font-semibold dark:text-white text-gray-800 mt-1">
                {loading ? (
                  <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                ) : (
                  stats.sessions.toLocaleString()
                )}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <div className="flex items-center text-green-500 dark:text-green-400">
              <ArrowUp className="w-4 h-4 mr-1" />
              <span>18%</span>
            </div>
            <span className="ml-2 dark:text-gray-400 text-gray-500">from last month</span>
          </div>
        </div>

        <div className="p-6 dark:bg-gray-800 dark:border-gray-700 bg-white rounded-lg shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium dark:text-gray-400 text-gray-500">Avg. Session Time</p>
              <p className="text-2xl font-semibold dark:text-white text-gray-800 mt-1">
                {loading ? (
                  <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                ) : (
                  `${stats.avgTime} min`
                )}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
              <Clock className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <div className="flex items-center text-red-500 dark:text-red-400">
              <ArrowDown className="w-4 h-4 mr-1" />
              <span>3%</span>
            </div>
            <span className="ml-2 dark:text-gray-400 text-gray-500">from last month</span>
          </div>
        </div>

        <div className="p-6 dark:bg-gray-800 dark:border-gray-700 bg-white rounded-lg shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium dark:text-gray-400 text-gray-500">Completion Rate</p>
              <p className="text-2xl font-semibold dark:text-white text-gray-800 mt-1">
                {loading ? (
                  <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                ) : (
                  `${stats.completion}%`
                )}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
              <Activity className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <div className="flex items-center text-green-500 dark:text-green-400">
              <ArrowUp className="w-4 h-4 mr-1" />
              <span>7%</span>
            </div>
            <span className="ml-2 dark:text-gray-400 text-gray-500">from last month</span>
          </div>
        </div>
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="p-6 dark:bg-gray-800 dark:border-gray-700 bg-white rounded-lg shadow-sm border border-gray-100 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-medium dark:text-white text-gray-800">User Activity</h3>
              <p className="text-sm dark:text-gray-400 text-gray-500 mt-1">Weekly user engagement metrics</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-sm dark:text-purple-400 dark:hover:text-purple-300 text-purple-600 hover:text-purple-800 font-medium">
                Weekly
              </button>
              <button className="text-sm dark:text-gray-400 dark:hover:text-gray-300 text-gray-500 hover:text-gray-700">
                Monthly
              </button>
              <button className="text-sm dark:text-gray-400 dark:hover:text-gray-300 text-gray-500 hover:text-gray-700">
                Yearly
              </button>
            </div>
          </div>

          {/* Placeholder for chart */}
          <div className="h-64 relative">
            {/* Chart bars - this is a placeholder visualization */}
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between h-48 px-2">
              {[35, 55, 45, 65, 75, 45, 65].map((height, index) => (
                <div key={index} className="w-1/8 px-2 flex flex-col items-center">
                  <div
                    className="w-full bg-purple-500 dark:bg-purple-600 rounded-t-sm opacity-80 hover:opacity-100 transition-all cursor-pointer"
                    style={{ height: `${height}%` }}
                  ></div>
                  <div className="text-xs mt-2 dark:text-gray-400 text-gray-500">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                  </div>
                </div>
              ))}
            </div>

            {/* Y-axis labels */}
            <div className="absolute top-0 left-0 bottom-0 flex flex-col justify-between text-xs dark:text-gray-400 text-gray-500 py-2">
              <div>100</div>
              <div>75</div>
              <div>50</div>
              <div>25</div>
              <div>0</div>
            </div>
          </div>
        </div>

        <div className="p-6 dark:bg-gray-800 dark:border-gray-700 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium dark:text-white text-gray-800">Upcoming Sessions</h3>
            <button className="text-sm dark:text-purple-400 dark:hover:text-purple-300 text-purple-600 hover:text-purple-800">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {[
              { time: "10:00 AM", title: "Team Meeting", date: "Today" },
              { time: "2:30 PM", title: "Client Presentation", date: "Today" },
              { time: "9:00 AM", title: "Product Review", date: "Tomorrow" },
            ].map((session, index) => (
              <div
                key={index}
                className="flex items-start p-3 rounded-lg dark:bg-gray-700/50 bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="p-2 rounded-md dark:bg-gray-600 bg-white mr-3">
                  <Calendar size={16} className="dark:text-purple-400 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium dark:text-white text-gray-800">{session.title}</p>
                  <div className="flex items-center mt-1">
                    <p className="text-xs dark:text-gray-400 text-gray-500">{session.time}</p>
                    <span className="mx-1 text-gray-400">•</span>
                    <p className="text-xs dark:text-gray-400 text-gray-500">{session.date}</p>
                  </div>
                </div>
                <button className="p-1 rounded-full dark:hover:bg-gray-600 hover:bg-gray-200">
                  <MoreHorizontal size={16} className="dark:text-gray-400 text-gray-500" />
                </button>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 py-2 text-sm font-medium dark:text-purple-400 dark:hover:text-purple-300 text-purple-600 hover:text-purple-800 flex items-center justify-center">
            <span>Schedule New Session</span>
            <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
      </div>

      {/* Recent activity */}
      <div className="dark:bg-gray-800 dark:border-gray-700 bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b dark:border-gray-700 border-gray-200 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium dark:text-white text-gray-800">Recent Activity</h3>
            <p className="text-sm dark:text-gray-400 text-gray-500 mt-1">Latest user interactions with the platform</p>
          </div>
          <button className="p-1.5 rounded-md dark:hover:bg-gray-700 hover:bg-gray-100">
            <MoreHorizontal size={18} className="dark:text-gray-400 text-gray-500" />
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-5">
            {recentActivity.map((item) => (
              <div key={item.id} className="flex items-start group">
                <div
                  className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center font-semibold mr-4`}
                >
                  {item.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium dark:text-white text-gray-800">{item.user}</p>
                    <p className="text-xs dark:text-gray-500 text-gray-400">{item.time}</p>
                  </div>
                  <p className="text-sm dark:text-gray-400 text-gray-500 mt-1">{item.action}</p>
                </div>
                <button className="p-1 rounded-full dark:hover:bg-gray-700 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal size={16} className="dark:text-gray-400 text-gray-500" />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <button className="px-4 py-2 text-sm font-medium dark:text-white text-gray-800 dark:bg-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center mx-auto">
              <Zap size={16} className="mr-2 dark:text-purple-400 text-purple-600" />
              View All Activity
            </button>
          </div>
        </div>
      </div>

      {/* Performance metrics section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="p-6 dark:bg-gray-800 dark:border-gray-700 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-medium dark:text-white text-gray-800">Performance Metrics</h3>
              <p className="text-sm dark:text-gray-400 text-gray-500 mt-1">System performance over time</p>
            </div>
            <button className="text-sm dark:text-purple-400 dark:hover:text-purple-300 text-purple-600 hover:text-purple-800">
              View Details
            </button>
          </div>

          {/* Placeholder for performance chart */}
          <div className="h-64 relative">
            {/* Line chart - this is a placeholder visualization */}
            <svg className="w-full h-full" viewBox="0 0 400 200">
              <path
                d="M0,150 C50,120 100,180 150,120 C200,60 250,100 300,70 C350,40 400,90 400,90"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="3"
                className="dark:stroke-purple-500 stroke-purple-600"
              />
              <path
                d="M0,150 C50,120 100,180 150,120 C200,60 250,100 300,70 C350,40 400,90 400,200 L400,200 L0,200 Z"
                fill="url(#gradient)"
                className="dark:fill-purple-500/20 fill-purple-600/10"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" className="dark:stop-color-purple-600 stop-color-purple-700" />
                  <stop offset="100%" className="dark:stop-color-indigo-500 stop-color-indigo-600" />
                </linearGradient>
              </defs>
            </svg>

            {/* X-axis labels */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs dark:text-gray-400 text-gray-500 px-2">
              <div>Jan</div>
              <div>Feb</div>
              <div>Mar</div>
              <div>Apr</div>
              <div>May</div>
              <div>Jun</div>
            </div>
          </div>
        </div>

        <div className="p-6 dark:bg-gray-800 dark:border-gray-700 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-medium dark:text-white text-gray-800">Growth Trends</h3>
              <p className="text-sm dark:text-gray-400 text-gray-500 mt-1">User acquisition metrics</p>
            </div>
            <button className="text-sm dark:text-purple-400 dark:hover:text-purple-300 text-purple-600 hover:text-purple-800">
              View Details
            </button>
          </div>

          <div className="space-y-4">
            {[
              { label: "New Users", value: 248, change: "+12%", trend: "up" },
              { label: "Active Sessions', value: 1,523, change: " + (18 % ", trend: 'up") },
              { label: "Conversion Rate", value: "24%", change: "-3%", trend: "down" },
              { label: "Retention Rate", value: "68%", change: "+5%", trend: "up" },
            ].map((metric, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg dark:bg-gray-700/50 bg-gray-50"
              >
                <div>
                  <p className="text-sm dark:text-gray-300 text-gray-600">{metric.label}</p>
                  <p className="text-lg font-semibold dark:text-white text-gray-800 mt-1">{metric.value}</p>
                </div>
                <div
                  className={`flex items-center ${metric.trend === "up" ? "dark:text-green-400 text-green-500" : "dark:text-red-400 text-red-500"}`}
                >
                  {metric.trend === "up" ? (
                    <TrendingUp size={18} className="mr-1" />
                  ) : (
                    <ArrowDown size={18} className="mr-1" />
                  )}
                  <span>{metric.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
