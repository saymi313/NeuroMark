"use client"

import { useState, useEffect } from "react"
import { Search, Calendar, Clock, Users, TrendingUp, Loader2, FileDown } from "lucide-react"
import Papa from "papaparse"
import { saveAs } from "file-saver"

const AttendanceList = ({ detectionResults = [], attendanceData = [], minimumPresenceTime = 30 }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [internalAttendanceData, setAttendanceData] = useState([])
  const [loading, setLoading] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  // Transform detection results into attendance data with presence time calculation
  useEffect(() => {
    if (attendanceData && attendanceData.length > 0) {
      // Use provided attendance data but recalculate status based on minimum presence time
      const updatedData = attendanceData.map((record) => {
        const presenceTime = record.lastDetection - record.firstDetection
        // Handle the case where minimumPresenceTime is 0 (no minimum)
        const status = minimumPresenceTime === 0 || presenceTime >= minimumPresenceTime ? "Present" : "Absent"

        return {
          ...record,
          presenceTime,
          status,
          clockOut: formatTimestamp(record.lastDetection),
          clockIn: formatTimestamp(record.firstDetection),
        }
      })
      setAttendanceData(updatedData)
      setLoading(false)
    } else if (detectionResults && detectionResults.length > 0) {
      setLoading(true)

      // Group detections by employee name
      const employeeMap = new Map()

      detectionResults.forEach((detection, index) => {
        if (detection.status === "Detected" && detection.name !== "Unknown") {
          const employeeName = detection.name

          if (!employeeMap.has(employeeName)) {
            employeeMap.set(employeeName, {
              id: index + 1,
              name: employeeName,
              employeeId: `EMP${String(index + 1).padStart(3, "0")}`,
              avatar: employeeName.charAt(0).toUpperCase(),
              confidence: detection.confidence,
              detections: [detection],
              firstDetection: detection.timestamp,
              lastDetection: detection.timestamp,
            })
          } else {
            const existing = employeeMap.get(employeeName)
            existing.detections.push(detection)
            existing.firstDetection = Math.min(existing.firstDetection, detection.timestamp)
            existing.lastDetection = Math.max(existing.lastDetection, detection.timestamp)
            existing.confidence = Math.max(existing.confidence, detection.confidence)
          }
        }
      })

      const transformedData = Array.from(employeeMap.values()).map((record) => {
        const presenceTime = record.lastDetection - record.firstDetection
        // Handle the case where minimumPresenceTime is 0 (no minimum)
        const status = minimumPresenceTime === 0 || presenceTime >= minimumPresenceTime ? "Present" : "Absent"

        return {
          ...record,
          presenceTime,
          status,
          clockIn: formatTimestamp(record.firstDetection),
          clockOut: formatTimestamp(record.lastDetection),
        }
      })

      setAttendanceData(transformedData)
      setLoading(false)
    } else {
      setAttendanceData([])
      setLoading(false)
    }
  }, [detectionResults, attendanceData, minimumPresenceTime])

  const formatTimestamp = (timestamp) => {
    // Convert seconds to time format (assuming video starts at current time)
    const now = new Date()
    const videoStart = new Date(now.getTime() - timestamp * 1000)
    return videoStart.toLocaleTimeString()
  }

  const formatDuration = (seconds) => {
    if (seconds < 60) return `${Math.round(seconds)}s`
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.round(seconds % 60)
    return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`
  }

  const filteredData = internalAttendanceData
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.employeeId.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((item) => statusFilter === "all" || item.status.toLowerCase() === statusFilter)
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "clockIn":
          return a.firstDetection - b.firstDetection
        case "clockOut":
          return a.lastDetection - b.lastDetection
        case "confidence":
          return b.confidence - a.confidence
        case "detections":
          return b.detections.length - a.detections.length
        case "presenceTime":
          return b.presenceTime - a.presenceTime
        default:
          return 0
      }
    })

  const exportToCSV = async () => {
    if (filteredData.length === 0) {
      alert("No data to export")
      return
    }

    setIsExporting(true)

    try {
      // Get current date and time for export
      const now = new Date()
      const exportDate = now.toLocaleDateString()
      const exportTime = now.toLocaleString()

      // Prepare data for CSV export
      const csvData = filteredData.map((record) => ({
        "Employee Name": record.name,
        "Employee ID": record.employeeId,
        "Clock In": record.clockIn,
        "Clock Out": record.clockOut,
        "Presence Time": formatDuration(record.presenceTime),
        "Total Detections": record.detections.length,
        Confidence: `${record.confidence}%`,
        Status: record.status,
        "First Seen (Video Time)": `${record.firstDetection.toFixed(1)}s`,
        "Last Seen (Video Time)": `${record.lastDetection.toFixed(1)}s`,
        Date: exportDate,
        "Export Time": exportTime,
        "Minimum Presence Required": formatDuration(minimumPresenceTime),
        "Meets Minimum": record.presenceTime >= minimumPresenceTime ? "Yes" : "No",
      }))

      // Convert to CSV
      const csv = Papa.unparse(csvData, {
        header: true,
        delimiter: ",",
        newline: "\n",
      })

      // Create and download file
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
      const fileName = `attendance_report_${now.toISOString().split("T")[0]}_${now.getHours()}${now.getMinutes().toString().padStart(2, "0")}.csv`
      saveAs(blob, fileName)

      console.log(`Exported ${filteredData.length} attendance records to ${fileName}`)
    } catch (error) {
      console.error("Export failed:", error)
      alert("Export failed. Please try again.")
    } finally {
      setIsExporting(false)
    }
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      Present: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      Absent: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
      Late: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    }
    return statusConfig[status] || "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
  }

  const getAttendanceStats = () => {
    const total = internalAttendanceData.length
    const present = internalAttendanceData.filter((item) => item.status === "Present").length
    const absent = internalAttendanceData.filter((item) => item.status === "Absent").length
    const late = internalAttendanceData.filter((item) => item.status === "Late").length
    const attendanceRate = total > 0 ? (((present + late) / total) * 100).toFixed(1) : 0

    return { total, present, absent, late, attendanceRate }
  }

  const stats = getAttendanceStats()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600 dark:text-purple-400 mx-auto mb-2" />
          <p className="text-gray-600 dark:text-gray-400">Processing attendance data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
            </div>
            <Users className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Present</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.present}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Absent</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.absent}</p>
            </div>
            <Clock className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Attendance Rate</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.attendanceRate}%</p>
            </div>
            <Calendar className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search by name or employee ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Status</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="late">Late</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="name">Sort by Name</option>
            <option value="clockIn">Sort by Clock In</option>
            <option value="clockOut">Sort by Clock Out</option>
            <option value="presenceTime">Sort by Presence Time</option>
            <option value="confidence">Sort by Confidence</option>
            <option value="detections">Sort by Detections</option>
          </select>

          <button
            onClick={exportToCSV}
            disabled={isExporting || filteredData.length === 0}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isExporting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <FileDown size={16} />
                Export CSV
              </>
            )}
          </button>
        </div>
      </div>

      {/* Minimum Presence Time Info */}
      {minimumPresenceTime > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-blue-800 dark:text-blue-200 text-sm">
            <strong>Minimum Presence Time:</strong> {formatDuration(minimumPresenceTime)} - Employees present for less
            than this duration are marked as "Absent"
          </p>
        </div>
      )}

      {/* Attendance Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Clock In
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Clock Out
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Presence Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Detections
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Confidence
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                              {item.avatar}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{item.employeeId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      <div>{item.clockIn}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{item.firstDetection.toFixed(1)}s</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      <div>{item.clockOut}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{item.lastDetection.toFixed(1)}s</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      <div className="font-medium">{formatDuration(item.presenceTime)}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {item.presenceTime >= minimumPresenceTime ? "✓ Sufficient" : "⚠ Too short"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {item.detections.length} times
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {item.confidence}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(item.status)}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-purple-600 dark:text-purple-400 hover:text-purple-900 dark:hover:text-purple-300">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                    {detectionResults.length === 0
                      ? "No detection results available. Start face detection to see attendance records."
                      : "No attendance records found matching your search criteria."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AttendanceList
