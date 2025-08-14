"use client"

import { useState, useEffect } from "react"
import { Clock, Calendar, TrendingUp, User, CheckCircle, AlertCircle } from "lucide-react"

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [attendanceStatus, setAttendanceStatus] = useState("Present")
  const [lastCheckIn, setLastCheckIn] = useState("09:00 AM")
  const [totalHours, setTotalHours] = useState(8.5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, John Doe!</h1>
            <p className="text-purple-100">
              {formatDate(currentTime)} • {formatTime(currentTime)}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{formatTime(currentTime)}</div>
            <div className="text-purple-100 text-sm">Current Time</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Today's Status</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                {attendanceStatus}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Check-in</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                {lastCheckIn}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Hours Today</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                {totalHours}h
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
              <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">This Month</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                22/23
              </p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
              <Calendar className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-3" />
                <span className="text-green-800 dark:text-green-200 font-medium">Check In</span>
              </div>
              <span className="text-green-600 dark:text-green-400 text-sm">9:00 AM</span>
            </button>
            
            <button className="w-full flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-3" />
                <span className="text-red-800 dark:text-red-200 font-medium">Check Out</span>
              </div>
              <span className="text-red-600 dark:text-red-400 text-sm">6:00 PM</span>
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Checked in</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Today at 9:00 AM</p>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Lunch break</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Yesterday at 12:30 PM</p>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Checked out</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Yesterday at 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
        <div className="flex items-start">
          <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full mr-4">
            <User className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">
              Welcome to Your Employee Portal! 👋
            </h3>
            <p className="text-purple-800 dark:text-purple-200 mb-4">
              This is your personal dashboard where you can manage your attendance, view your schedule, 
              and access important information. Use the navigation menu to explore different sections.
            </p>
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm">
                View My Attendance
              </button>
              <button className="px-4 py-2 bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 border border-purple-600 dark:border-purple-400 rounded-md hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors text-sm">
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
