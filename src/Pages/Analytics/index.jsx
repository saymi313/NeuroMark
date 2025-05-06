"use client"

import { useState } from "react"
import { ArrowUpRight, Download, Filter, ArrowDown, Calendar, Users, Clock, Target, ArrowRight } from "lucide-react"

export default function Analytics() {
  const [activeTab, setActiveTab] = useState("overview")
  const [timeRange, setTimeRange] = useState("30days")

  // Sample data for charts
  const userGrowthData = [15, 25, 20, 30, 35, 40, 50, 60, 55, 70, 65, 80]
  const sessionDistributionData = [
    { label: "Mobile", value: 45, color: "#8b5cf6" },
    { label: "Desktop", value: 35, color: "#3b82f6" },
    { label: "Tablet", value: 20, color: "#10b981" },
  ]
  const completionRatesData = [65, 75, 85, 70, 90, 80, 95]

  // Calculate total for pie chart
  const sessionTotal = sessionDistributionData.reduce((acc, item) => acc + item.value, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold dark:text-white text-gray-800">Analytics Dashboard</h1>
          <p className="text-sm dark:text-gray-400 text-gray-500 mt-1">Detailed metrics and performance insights</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="flex items-center px-3 py-2 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 bg-white border border-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button className="flex items-center px-3 py-2 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 bg-white border border-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      {/* Time range selector */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:items-center sm:justify-between">
        <div className="flex items-center space-x-2 dark:bg-gray-800 dark:border-gray-700 bg-white border border-gray-200 rounded-lg p-1">
          {["7days", "30days", "90days", "year"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                timeRange === range
                  ? "bg-purple-600 text-white"
                  : "dark:text-gray-300 dark:hover:bg-gray-700 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {range === "7days" ? "7 Days" : range === "30days" ? "30 Days" : range === "90days" ? "90 Days" : "Year"}
            </button>
          ))}
        </div>
        <div className="flex items-center mt-2 sm:mt-0">
          <span className="text-sm dark:text-gray-400 text-gray-500 mr-2">Last updated:</span>
          <span className="text-sm font-medium dark:text-white text-gray-800">Today, 2:30 PM</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b dark:border-gray-700 border-gray-200 overflow-x-auto">
        <nav className="flex -mb-px space-x-4 sm:space-x-8">
          <button
            onClick={() => setActiveTab("overview")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "overview"
                ? "border-purple-500 dark:text-purple-400 text-purple-600"
                : "border-transparent dark:text-gray-400 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("performance")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "performance"
                ? "border-purple-500 dark:text-purple-400 text-purple-600"
                : "border-transparent dark:text-gray-400 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300"
            }`}
          >
            Performance
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "users"
                ? "border-purple-500 dark:text-purple-400 text-purple-600"
                : "border-transparent dark:text-gray-400 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300"
            }`}
          >
            Users
          </button>
        </nav>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 dark:bg-gray-800 dark:border-gray-700 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium dark:text-gray-400 text-gray-500">Total Users</p>
              <p className="text-2xl font-semibold dark:text-white text-gray-800 mt-1">1,248</p>
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <div className="flex items-center text-green-500 dark:text-green-400">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              <span>12.5%</span>
            </div>
            <span className="ml-2 dark:text-gray-400 text-gray-500">vs last period</span>
          </div>
        </div>

        <div className="p-6 dark:bg-gray-800 dark:border-gray-700 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium dark:text-gray-400 text-gray-500">Active Sessions</p>
              <p className="text-2xl font-semibold dark:text-white text-gray-800 mt-1">876</p>
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <div className="flex items-center text-green-500 dark:text-green-400">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              <span>10.6%</span>
            </div>
            <span className="ml-2 dark:text-gray-400 text-gray-500">vs last period</span>
          </div>
        </div>

        <div className="p-6 dark:bg-gray-800 dark:border-gray-700 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
              <Clock className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium dark:text-gray-400 text-gray-500">Avg. Session</p>
              <p className="text-2xl font-semibold dark:text-white text-gray-800 mt-1">24 min</p>
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <div className="flex items-center text-red-500 dark:text-red-400">
              <ArrowDown className="w-4 h-4 mr-1" />
              <span>7.7%</span>
            </div>
            <span className="ml-2 dark:text-gray-400 text-gray-500">vs last period</span>
          </div>
        </div>

        <div className="p-6 dark:bg-gray-800 dark:border-gray-700 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
              <Target className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium dark:text-gray-400 text-gray-500">Completion Rate</p>
              <p className="text-2xl font-semibold dark:text-white text-gray-800 mt-1">87%</p>
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <div className="flex items-center text-green-500 dark:text-green-400">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              <span>6.1%</span>
            </div>
            <span className="ml-2 dark:text-gray-400 text-gray-500">vs last period</span>
          </div>
        </div>
      </div>

      {/* Stats cards with charts */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 dark:bg-gray-800 dark:border-gray-700 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-medium dark:text-white text-gray-800">User Growth</h3>
              <p className="text-sm dark:text-gray-400 text-gray-500 mt-1">Monthly active users</p>
            </div>
            <span className="flex items-center text-sm font-medium text-green-600 dark:text-green-400">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              12.5%
            </span>
          </div>
          <div className="h-48 relative">
            {/* Line chart */}
            <svg className="w-full h-full" viewBox="0 0 300 150" preserveAspectRatio="none">
              {/* Grid lines */}
              <line x1="0" y1="0" x2="300" y2="0" stroke="#e5e7eb" strokeWidth="1" className="dark:stroke-gray-700" />
              <line
                x1="0"
                y1="37.5"
                x2="300"
                y2="37.5"
                stroke="#e5e7eb"
                strokeWidth="1"
                className="dark:stroke-gray-700"
              />
              <line x1="0" y1="75" x2="300" y2="75" stroke="#e5e7eb" strokeWidth="1" className="dark:stroke-gray-700" />
              <line
                x1="0"
                y1="112.5"
                x2="300"
                y2="112.5"
                stroke="#e5e7eb"
                strokeWidth="1"
                className="dark:stroke-gray-700"
              />
              <line
                x1="0"
                y1="150"
                x2="300"
                y2="150"
                stroke="#e5e7eb"
                strokeWidth="1"
                className="dark:stroke-gray-700"
              />

              {/* Line chart */}
              <polyline
                points={userGrowthData
                  .map((value, index) => {
                    const x = (index / (userGrowthData.length - 1)) * 300
                    const y = 150 - (value / 100) * 150
                    return `${x},${y}`
                  })
                  .join(" ")}
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="2"
                className="dark:stroke-purple-500"
              />

              {/* Area under the line */}
              <path
                d={`
                  M0,${150 - (userGrowthData[0] / 100) * 150}
                  ${userGrowthData
                    .map((value, index) => {
                      const x = (index / (userGrowthData.length - 1)) * 300
                      const y = 150 - (value / 100) * 150
                      return `L${x},${y}`
                    })
                    .join(" ")}
                  L300,150 L0,150 Z
                `}
                fill="url(#userGrowthGradient)"
                opacity="0.2"
              />

              {/* Data points */}
              {userGrowthData.map((value, index) => {
                const x = (index / (userGrowthData.length - 1)) * 300
                const y = 150 - (value / 100) * 150
                return <circle key={index} cx={x} cy={y} r="3" fill="#8b5cf6" className="dark:fill-purple-500" />
              })}

              <defs>
                <linearGradient id="userGrowthGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" className="dark:stop-color-purple-500" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" className="dark:stop-color-purple-500" />
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
              <h3 className="text-lg font-medium dark:text-white text-gray-800">Session Distribution</h3>
              <p className="text-sm dark:text-gray-400 text-gray-500 mt-1">By device type</p>
            </div>
            <button className="text-sm dark:text-purple-400 dark:hover:text-purple-300 text-purple-600 hover:text-purple-800">
              Details
            </button>
          </div>
          <div className="h-48 flex flex-col sm:flex-row items-center justify-center">
            {/* Pie chart */}
            <div className="relative w-32 h-32 mb-4 sm:mb-0">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {sessionDistributionData.map((item, index) => {
                  // Calculate the start and end angles for each slice
                  let startAngle = 0
                  for (let i = 0; i < index; i++) {
                    startAngle += (sessionDistributionData[i].value / sessionTotal) * 360
                  }
                  const endAngle = startAngle + (item.value / sessionTotal) * 360

                  // Convert angles to radians
                  const startRad = ((startAngle - 90) * Math.PI) / 180
                  const endRad = ((endAngle - 90) * Math.PI) / 180

                  // Calculate the SVG arc path
                  const x1 = 50 + 40 * Math.cos(startRad)
                  const y1 = 50 + 40 * Math.sin(startRad)
                  const x2 = 50 + 40 * Math.cos(endRad)
                  const y2 = 50 + 40 * Math.sin(endRad)

                  // Determine if the arc should be drawn as a large arc
                  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0

                  return (
                    <path
                      key={index}
                      d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                      fill={item.color}
                      className="hover:opacity-80 transition-opacity cursor-pointer"
                    />
                  )
                })}
                <circle cx="50" cy="50" r="25" fill="white" className="dark:fill-gray-800" />
              </svg>
            </div>

            {/* Legend */}
            <div className="ml-0 sm:ml-6 space-y-2">
              {sessionDistributionData.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm dark:text-gray-300 text-gray-700">{item.label}</span>
                  <span className="text-sm font-medium ml-2 dark:text-white text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 dark:bg-gray-800 dark:border-gray-700 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-medium dark:text-white text-gray-800">Completion Rates</h3>
              <p className="text-sm dark:text-gray-400 text-gray-500 mt-1">Weekly assessment completion</p>
            </div>
            <button className="text-sm dark:text-purple-400 dark:hover:text-purple-300 text-purple-600 hover:text-purple-800">
              Details
            </button>
          </div>
          <div className="h-48 relative">
            {/* Bar chart */}
            <div className="absolute inset-0 flex items-end justify-between px-0 sm:px-2">
              {completionRatesData.map((value, index) => (
                <div key={index} className="flex flex-col items-center w-8 sm:w-1/8">
                  <div
                    className="w-6 sm:w-8 bg-gradient-to-t from-purple-600 to-indigo-500 dark:from-purple-500 dark:to-indigo-400 rounded-t-sm hover:opacity-90 transition-all cursor-pointer"
                    style={{ height: `${value}%` }}
                  ></div>
                  <div className="text-xs mt-2 dark:text-gray-400 text-gray-500">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                  </div>
                </div>
              ))}
            </div>

            {/* Y-axis grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              <div className="border-t border-gray-200 dark:border-gray-700 h-0 relative">
                <span className="absolute -top-2 -left-2 text-xs dark:text-gray-400 text-gray-500">100%</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 h-0 relative">
                <span className="absolute -top-2 -left-2 text-xs dark:text-gray-400 text-gray-500">75%</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 h-0 relative">
                <span className="absolute -top-2 -left-2 text-xs dark:text-gray-400 text-gray-500">50%</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 h-0 relative">
                <span className="absolute -top-2 -left-2 text-xs dark:text-gray-400 text-gray-500">25%</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 h-0 relative">
                <span className="absolute -top-2 -left-2 text-xs dark:text-gray-400 text-gray-500">0%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed stats */}
      <div className="dark:bg-gray-800 dark:border-gray-700 bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b dark:border-gray-700 border-gray-200 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium dark:text-white text-gray-800">Detailed Statistics</h3>
            <p className="text-sm dark:text-gray-400 text-gray-500 mt-1">Comparative metrics over time</p>
          </div>
          <button className="flex items-center text-sm dark:text-purple-400 dark:hover:text-purple-300 text-purple-600 hover:text-purple-800">
            <span>View Full Report</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y dark:divide-gray-700 divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-500 uppercase tracking-wider">
                    Metric
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-500 uppercase tracking-wider">
                    Current
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-500 uppercase tracking-wider">
                    Previous
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-500 uppercase tracking-wider">
                    Change
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-500 uppercase tracking-wider">
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody className="dark:divide-gray-700 divide-y divide-gray-200">
                {[
                  { name: "Total Users", current: "1,248", previous: "1,156", change: "+8.0%", positive: true },
                  { name: "Active Users", current: "876", previous: "792", change: "+10.6%", positive: true },
                  {
                    name: "Avg. Session Duration",
                    current: "24 min",
                    previous: "26 min",
                    change: "-7.7%",
                    positive: false,
                  },
                  { name: "Completion Rate", current: "87%", previous: "82%", change: "+6.1%", positive: true },
                  { name: "Bounce Rate", current: "24%", previous: "28%", change: "-14.3%", positive: true },
                ].map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium dark:text-white text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-gray-300 text-gray-500">
                      {item.current}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-gray-300 text-gray-500">
                      {item.previous}
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                        item.positive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {item.change}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {/* Mini sparkline chart */}
                      <svg className="w-16 h-8" viewBox="0 0 64 32">
                        {item.positive ? (
                          <path
                            d="M0,24 L10,20 L20,22 L30,16 L40,18 L50,12 L60,8"
                            fill="none"
                            stroke={item.positive ? "#10b981" : "#ef4444"}
                            strokeWidth="2"
                            className={item.positive ? "dark:stroke-green-400" : "dark:stroke-red-400"}
                          />
                        ) : (
                          <path
                            d="M0,8 L10,12 L20,10 L30,16 L40,14 L50,20 L60,24"
                            fill="none"
                            stroke={item.positive ? "#10b981" : "#ef4444"}
                            strokeWidth="2"
                            className={item.positive ? "dark:stroke-green-400" : "dark:stroke-red-400"}
                          />
                        )}
                      </svg>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
