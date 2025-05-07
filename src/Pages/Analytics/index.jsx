"use client"

import { useState, useEffect } from "react"
import {
  ArrowUp,
  ArrowDown,
  BarChart2,
  TrendingUp,
  Calendar,
  Clock,
  Users,
  Filter,
  Download,
  ChevronDown,
  RefreshCw,
  Zap,
  Info,
} from "lucide-react"

export default function Analytics() {
  const [stats, setStats] = useState({
    totalSessions: 0,
    activeUsers: 0,
    avgEngagement: 0,
    conversionRate: 0,
  })

  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("week")

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        totalSessions: 3429,
        activeUsers: 842,
        avgEngagement: 68,
        conversionRate: 24.7,
      })
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  // Sample data for charts
  const sessionsByDay = [
    { day: "Mon", count: 120 },
    { day: "Tue", count: 180 },
    { day: "Wed", count: 150 },
    { day: "Thu", count: 210 },
    { day: "Fri", count: 190 },
    { day: "Sat", count: 95 },
    { day: "Sun", count: 85 },
  ]

  const userDemographics = [
    { age: "18-24", percentage: 22 },
    { age: "25-34", percentage: 38 },
    { age: "35-44", percentage: 25 },
    { age: "45-54", percentage: 10 },
    { age: "55+", percentage: 5 },
  ]

  const topPerformingPages = [
    { page: "Assessment #1", views: 1245, conversion: 68 },
    { page: "Cognitive Test", views: 982, conversion: 54 },
    { page: "Memory Exercise", views: 876, conversion: 62 },
    { page: "Attention Training", views: 754, conversion: 48 },
    { page: "Results Dashboard", views: 698, conversion: 72 },
  ]

  const deviceUsage = [
    { device: "Desktop", percentage: 58 },
    { device: "Mobile", percentage: 32 },
    { device: "Tablet", percentage: 10 },
  ]

  const handleTimeRangeChange = (range) => {
    setLoading(true)
    setTimeRange(range)

    // Simulate data loading
    setTimeout(() => {
      setLoading(false)
    }, 600)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold dark:text-white text-gray-800">Analytics Dashboard</h1>
          <p className="text-sm dark:text-gray-400 text-gray-500 mt-1">
            Detailed insights and performance metrics for your platform.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleTimeRangeChange("week")}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                timeRange === "week"
                  ? "bg-purple-600 text-white"
                  : "dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 bg-white border border-gray-200 text-gray-700"
              }`}
            >
              Week
            </button>
            <button
              onClick={() => handleTimeRangeChange("month")}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                timeRange === "month"
                  ? "bg-purple-600 text-white"
                  : "dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 bg-white border border-gray-200 text-gray-700"
              }`}
            >
              Month
            </button>
            <button
              onClick={() => handleTimeRangeChange("quarter")}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                timeRange === "quarter"
                  ? "bg-purple-600 text-white"
                  : "dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 bg-white border border-gray-200 text-gray-700"
              }`}
            >
              Quarter
            </button>
            <button
              onClick={() => handleTimeRangeChange("year")}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                timeRange === "year"
                  ? "bg-purple-600 text-white"
                  : "dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 bg-white border border-gray-200 text-gray-700"
              }`}
            >
              Year
            </button>
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1.5 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 bg-white border border-gray-200 rounded-md text-sm text-gray-700 flex items-center">
              <Filter size={14} className="mr-1.5" />
              Filter
            </button>
            <button className="px-3 py-1.5 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center">
              <Download size={14} className="mr-1.5" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 dark:bg-gray-800 dark:border-gray-700 bg-white rounded-lg shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium dark:text-gray-400 text-gray-500">Total Sessions</p>
              <p className="text-2xl font-semibold dark:text-white text-gray-800 mt-1">
                {loading ? (
                  <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                ) : (
                  stats.totalSessions.toLocaleString()
                )}
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
              <BarChart2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <div className="flex items-center text-green-500 dark:text-green-400">
              <ArrowUp className="w-4 h-4 mr-1" />
              <span>15%</span>
            </div>
            <span className="ml-2 dark:text-gray-400 text-gray-500">from last {timeRange}</span>
          </div>
        </div>

        <div className="p-6 dark:bg-gray-800 dark:border-gray-700 bg-white rounded-lg shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium dark:text-gray-400 text-gray-500">Active Users</p>
              <p className="text-2xl font-semibold dark:text-white text-gray-800 mt-1">
                {loading ? (
                  <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                ) : (
                  stats.activeUsers.toLocaleString()
                )}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <div className="flex items-center text-green-500 dark:text-green-400">
              <ArrowUp className="w-4 h-4 mr-1" />
              <span>8%</span>
            </div>
            <span className="ml-2 dark:text-gray-400 text-gray-500">from last {timeRange}</span>
          </div>
        </div>

        <div className="p-6 dark:bg-gray-800 dark:border-gray-700 bg-white rounded-lg shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium dark:text-gray-400 text-gray-500">Avg. Engagement</p>
              <p className="text-2xl font-semibold dark:text-white text-gray-800 mt-1">
                {loading ? (
                  <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                ) : (
                  `${stats.avgEngagement}%`
                )}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
              <Clock className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <div className="flex items-center text-green-500 dark:text-green-400">
              <ArrowUp className="w-4 h-4 mr-1" />
              <span>5%</span>
            </div>
            <span className="ml-2 dark:text-gray-400 text-gray-500">from last {timeRange}</span>
          </div>
        </div>

        <div className="p-6 dark:bg-gray-800 dark:border-gray-700 bg-white rounded-lg shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium dark:text-gray-400 text-gray-500">Conversion Rate</p>
              <p className="text-2xl font-semibold dark:text-white text-gray-800 mt-1">
                {loading ? (
                  <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                ) : (
                  `${stats.conversionRate}%`
                )}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
              <TrendingUp className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <div className="flex items-center text-red-500 dark:text-red-400">
              <ArrowDown className="w-4 h-4 mr-1" />
              <span>2%</span>
            </div>
            <span className="ml-2 dark:text-gray-400 text-gray-500">from last {timeRange}</span>
          </div>
        </div>
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Sessions by Day Chart */}
        <div className="p-6 dark:bg-gray-800 dark:border-gray-700 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-medium dark:text-white text-gray-800">Sessions by Day</h3>
              <p className="text-sm dark:text-gray-400 text-gray-500 mt-1">Daily user session distribution</p>
            </div>
            <button className="p-1.5 rounded-md dark:hover:bg-gray-700 hover:bg-gray-100 text-gray-500">
              <RefreshCw size={16} className="dark:text-gray-400" />
            </button>
          </div>

          {/* Bar chart visualization */}
          <div className="h-64 relative">
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between h-48 px-2">
              {sessionsByDay.map((day, index) => {
                // Calculate height percentage based on the maximum value
                const maxCount = Math.max(...sessionsByDay.map((d) => d.count))
                const heightPercentage = (day.count / maxCount) * 100

                return (
                  <div key={index} className="w-1/8 px-2 flex flex-col items-center">
                    <div
                      className="w-full bg-purple-500 dark:bg-purple-600 rounded-t-sm opacity-80 hover:opacity-100 transition-all cursor-pointer relative group"
                      style={{ height: `${heightPercentage}%` }}
                    >
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {day.count} sessions
                      </div>
                    </div>
                    <div className="text-xs mt-2 dark:text-gray-400 text-gray-500">{day.day}</div>
                  </div>
                )
              })}
            </div>

            {/* Y-axis labels */}
            <div className="absolute top-0 left-0 bottom-0 flex flex-col justify-between text-xs dark:text-gray-400 text-gray-500 py-2">
              <div>250</div>
              <div>200</div>
              <div>150</div>
              <div>100</div>
              <div>50</div>
              <div>0</div>
            </div>
          </div>
        </div>

        {/* User Demographics Chart */}
        <div className="p-6 dark:bg-gray-800 dark:border-gray-700 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-medium dark:text-white text-gray-800">User Demographics</h3>
              <p className="text-sm dark:text-gray-400 text-gray-500 mt-1">Age distribution of users</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-sm dark:text-purple-400 dark:hover:text-purple-300 text-purple-600 hover:text-purple-800 font-medium">
                Age
              </button>
              <button className="text-sm dark:text-gray-400 dark:hover:text-gray-300 text-gray-500 hover:text-gray-700">
                Gender
              </button>
              <button className="text-sm dark:text-gray-400 dark:hover:text-gray-300 text-gray-500 hover:text-gray-700">
                Location
              </button>
            </div>
          </div>

          {/* Horizontal bar chart for demographics */}
          <div className="space-y-4">
            {userDemographics.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm dark:text-gray-300 text-gray-700">{item.age}</span>
                  <span className="text-sm dark:text-gray-400 text-gray-500">{item.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2.5 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t dark:border-gray-700 border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium dark:text-gray-300 text-gray-700">Primary Age Group:</span>
              <span className="text-sm font-medium dark:text-purple-400 text-purple-600">25-34 years (38%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Device Usage and Top Pages */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Device Usage */}
        <div className="p-6 dark:bg-gray-800 dark:border-gray-700 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-medium dark:text-white text-gray-800">Device Usage</h3>
              <p className="text-sm dark:text-gray-400 text-gray-500 mt-1">Platform access by device type</p>
            </div>
            <button className="p-1.5 rounded-md dark:hover:bg-gray-700 hover:bg-gray-100">
              <Info size={16} className="dark:text-gray-400 text-gray-500" />
            </button>
          </div>

          {/* Donut chart visualization */}
          <div className="flex justify-center mb-6">
            <div className="relative w-48 h-48">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Create the donut chart segments */}
                {(() => {
                  let cumulativePercentage = 0
                  return deviceUsage.map((item, index) => {
                    // Calculate the segment angles
                    const startAngle = cumulativePercentage * 3.6 // 3.6 = 360/100
                    cumulativePercentage += item.percentage
                    const endAngle = cumulativePercentage * 3.6

                    // Convert angles to radians and calculate coordinates
                    const startRad = ((startAngle - 90) * Math.PI) / 180
                    const endRad = ((endAngle - 90) * Math.PI) / 180

                    const x1 = 50 + 40 * Math.cos(startRad)
                    const y1 = 50 + 40 * Math.sin(startRad)
                    const x2 = 50 + 40 * Math.cos(endRad)
                    const y2 = 50 + 40 * Math.sin(endRad)

                    // Determine if the arc should be drawn as a large arc
                    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0

                    // Create the SVG path for the segment
                    const path = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`

                    // Assign colors based on index
                    const colors = ["#8b5cf6", "#6366f1", "#a855f7"]
                    const darkColors = ["#7c3aed", "#4f46e5", "#9333ea"]

                    return (
                      <path
                        key={index}
                        d={path}
                        fill={colors[index % colors.length]}
                        className={`dark:fill-${darkColors[index % darkColors.length]}`}
                      />
                    )
                  })
                })()}
                {/* Inner circle to create the donut hole */}
                <circle cx="50" cy="50" r="25" fill="white" className="dark:fill-gray-800" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-3xl font-bold dark:text-white text-gray-800">{deviceUsage[0].percentage}%</span>
                <span className="text-xs dark:text-gray-400 text-gray-500">Desktop</span>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-2">
            {deviceUsage.map((item, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`w-3 h-3 rounded-full mr-2 ${
                    index === 0
                      ? "bg-purple-600 dark:bg-purple-500"
                      : index === 1
                        ? "bg-indigo-600 dark:bg-indigo-500"
                        : "bg-violet-600 dark:bg-violet-500"
                  }`}
                ></div>
                <span className="text-sm dark:text-gray-300 text-gray-700 flex-1">{item.device}</span>
                <span className="text-sm dark:text-gray-400 text-gray-500">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Pages */}
        <div className="p-6 dark:bg-gray-800 dark:border-gray-700 bg-white rounded-lg shadow-sm border border-gray-100 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-medium dark:text-white text-gray-800">Top Performing Pages</h3>
              <p className="text-sm dark:text-gray-400 text-gray-500 mt-1">Pages with highest engagement</p>
            </div>
            <button className="flex items-center text-sm dark:text-purple-400 dark:hover:text-purple-300 text-purple-600 hover:text-purple-800">
              <span>View All</span>
              <ChevronDown size={16} className="ml-1" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b dark:border-gray-700 border-gray-200">
                  <th className="text-left py-3 px-2 text-sm font-medium dark:text-gray-400 text-gray-500">Page</th>
                  <th className="text-left py-3 px-2 text-sm font-medium dark:text-gray-400 text-gray-500">Views</th>
                  <th className="text-left py-3 px-2 text-sm font-medium dark:text-gray-400 text-gray-500">
                    Conversion
                  </th>
                  <th className="text-left py-3 px-2 text-sm font-medium dark:text-gray-400 text-gray-500">Trend</th>
                </tr>
              </thead>
              <tbody>
                {topPerformingPages.map((page, index) => (
                  <tr
                    key={index}
                    className="border-b dark:border-gray-700 border-gray-200 dark:hover:bg-gray-700/50 hover:bg-gray-50"
                  >
                    <td className="py-3 px-2">
                      <div className="text-sm font-medium dark:text-white text-gray-800">{page.page}</div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="text-sm dark:text-gray-300 text-gray-700">{page.views.toLocaleString()}</div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mr-2 max-w-[100px]">
                          <div
                            className="bg-purple-600 dark:bg-purple-500 h-1.5 rounded-full"
                            style={{ width: `${page.conversion}%` }}
                          ></div>
                        </div>
                        <span className="text-sm dark:text-gray-300 text-gray-700">{page.conversion}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      {/* Mini sparkline chart - simplified representation */}
                      <svg className="w-16 h-8" viewBox="0 0 100 30">
                        <path
                          d={`M0,${30 - Math.random() * 15} ${[...Array(10)]
                            .map((_, i) => `L${i * 10},${30 - Math.random() * 20}`)
                            .join(" ")} L100,${30 - Math.random() * 15}`}
                          fill="none"
                          stroke={index % 2 === 0 ? "#8b5cf6" : "#6366f1"}
                          strokeWidth="2"
                          className="dark:stroke-purple-500"
                        />
                      </svg>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* User Behavior Analysis */}
      <div className="p-6 dark:bg-gray-800 dark:border-gray-700 bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-medium dark:text-white text-gray-800">User Behavior Analysis</h3>
            <p className="text-sm dark:text-gray-400 text-gray-500 mt-1">Insights into user interaction patterns</p>
          </div>
          <button className="px-4 py-2 text-sm font-medium dark:text-white text-gray-800 dark:bg-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center">
            <Zap size={16} className="mr-2 dark:text-purple-400 text-purple-600" />
            Generate Report
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Engagement Metrics */}
          <div className="space-y-4">
            <h4 className="text-md font-medium dark:text-white text-gray-800 flex items-center">
              <Clock size={16} className="mr-2 dark:text-purple-400 text-purple-600" />
              Engagement Metrics
            </h4>

            <div className="space-y-3">
              {[
                { label: "Avg. Session Duration", value: "24 min" },
                { label: "Pages per Session", value: "4.2" },
                { label: "Bounce Rate", value: "32%" },
                { label: "Return Rate", value: "68%" },
              ].map((metric, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm dark:text-gray-300 text-gray-700">{metric.label}</span>
                  <span className="text-sm font-medium dark:text-white text-gray-800">{metric.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Conversion Funnel */}
          <div className="space-y-4">
            <h4 className="text-md font-medium dark:text-white text-gray-800 flex items-center">
              <Filter size={16} className="mr-2 dark:text-purple-400 text-purple-600" />
              Conversion Funnel
            </h4>

            <div className="space-y-2">
              {[
                { stage: "Visitors", count: 3240, percentage: 100 },
                { stage: "Sign-ups", count: 1845, percentage: 57 },
                { stage: "Assessment Started", count: 1248, percentage: 38 },
                { stage: "Assessment Completed", count: 842, percentage: 26 },
                { stage: "Returned Users", count: 576, percentage: 18 },
              ].map((stage, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm dark:text-gray-300 text-gray-700">{stage.stage}</span>
                    <span className="text-sm dark:text-gray-400 text-gray-500">{stage.count.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2 rounded-full"
                      style={{ width: `${stage.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs dark:text-gray-400 text-gray-500 text-right">{stage.percentage}%</div>
                </div>
              ))}
            </div>
          </div>

          {/* User Flow */}
          <div className="space-y-4">
            <h4 className="text-md font-medium dark:text-white text-gray-800 flex items-center">
              <TrendingUp size={16} className="mr-2 dark:text-purple-400 text-purple-600" />
              Top User Paths
            </h4>

            <div className="space-y-3">
              {[
                { path: "Home → Assessment → Results", percentage: 42 },
                { path: "Home → Profile → Assessment", percentage: 28 },
                { path: "Login → Dashboard → Assessment", percentage: 18 },
                { path: "Home → About → Sign Up", percentage: 12 },
              ].map((path, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm dark:text-gray-300 text-gray-700">{path.path}</span>
                    <span className="text-sm dark:text-gray-400 text-gray-500">{path.percentage}%</span>
                  </div>
                  <div className="flex items-center">
                    <div
                      className="h-1 bg-purple-600 dark:bg-purple-500 rounded-full"
                      style={{ width: `${path.percentage}%` }}
                    ></div>
                    <div
                      className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full"
                      style={{ width: `${100 - path.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="p-6 dark:bg-gray-800 dark:border-gray-700 bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-medium dark:text-white text-gray-800">Recommendations</h3>
            <p className="text-sm dark:text-gray-400 text-gray-500 mt-1">AI-powered insights to improve performance</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Optimize Mobile Experience",
              description:
                "Mobile bounce rate is 15% higher than desktop. Consider improving mobile UI for better retention.",
              icon: "smartphone",
              color: "purple",
            },
            {
              title: "Increase Session Duration",
              description:
                "Users spend 30% less time on the Assessment page compared to last month. Review content engagement.",
              icon: "clock",
              color: "blue",
            },
            {
              title: "Improve Conversion Funnel",
              description:
                "There's a 42% drop-off between sign-up and assessment completion. Simplify the assessment process.",
              icon: "filter",
              color: "green",
            },
            {
              title: "Target Returning Users",
              description:
                "Return rate has increased by 8%. Create targeted content for returning users to boost engagement.",
              icon: "repeat",
              color: "yellow",
            },
          ].map((recommendation, index) => (
            <div
              key={index}
              className="p-4 rounded-lg dark:bg-gray-700/50 bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-start">
                <div
                  className={`p-2 rounded-md mr-3 bg-${recommendation.color}-100 dark:bg-${recommendation.color}-900/30 text-${recommendation.color}-600 dark:text-${recommendation.color}-400`}
                >
                  {recommendation.icon === "smartphone" && <Calendar size={18} />}
                  {recommendation.icon === "clock" && <Clock size={18} />}
                  {recommendation.icon === "filter" && <Filter size={18} />}
                  {recommendation.icon === "repeat" && <RefreshCw size={18} />}
                </div>
                <div>
                  <h4 className="text-sm font-medium dark:text-white text-gray-800">{recommendation.title}</h4>
                  <p className="text-xs dark:text-gray-400 text-gray-500 mt-1">{recommendation.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
