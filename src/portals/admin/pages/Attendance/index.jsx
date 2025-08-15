"use client"

import { useState } from "react"
import { Upload, Clock, Users, Calendar, Download, Eye } from "lucide-react"
import VideoUpload from "../../components/Attendance/VideoUpload"
import PhotoGallery from "../../components/Attendance/PhotoGallery"
import AttendanceList from "../../components/Attendance/AttendanceList"
import ExportModal from "../../components/Attendance/ExportModal"

export default function Attendance() {
  const [activeTab, setActiveTab] = useState("upload")
  const [uploadedVideo, setUploadedVideo] = useState(null)
  const [uploadedPhotos, setUploadedPhotos] = useState([])
  const [detectionResults, setDetectionResults] = useState([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [minimumPresenceTime, setMinimumPresenceTime] = useState(1) // Changed from 30 to 1

  const handleVideoUpload = (videoFile) => {
    setUploadedVideo(videoFile)
    // Clear previous results when new video is uploaded
    setDetectionResults([])
  }

  const handlePhotosUpload = (photos) => {
    setUploadedPhotos(photos)
  }

  const handleDetectionResults = (results) => {
    setDetectionResults(results)
    console.log("Detection results received in main component:", results)
  }

  const handleMinimumPresenceTimeChange = (time) => {
    setMinimumPresenceTime(time)
  }

  const tabs = [
    { id: "upload", label: "Video Upload", icon: Upload },
    { id: "photos", label: "Detection Results", icon: Users },
    { id: "attendance", label: "Attendance List", icon: Calendar },
  ]

  // Calculate stats from detection results
  const getStats = () => {
    const totalDetections = detectionResults.length
    const detectedEmployees = detectionResults.filter((r) => r.status === "Detected").length
    const uniqueEmployees = [...new Set(detectionResults.filter((r) => r.status === "Detected").map((r) => r.name))]
      .length
    const unknownFaces = detectionResults.filter((r) => r.status === "Unknown").length

    return {
      totalDetections,
      detectedEmployees,
      uniqueEmployees,
      unknownFaces,
    }
  }

  const stats = getStats()

  const getAttendanceData = () => {
    if (!detectionResults || detectionResults.length === 0) return []

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
            clockIn: new Date().toLocaleTimeString(),
            clockOut: "N/A",
            status: "Present",
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

    return Array.from(employeeMap.values())
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold dark:text-white text-gray-800">Attendance Management</h1>
          <p className="text-sm dark:text-gray-400 text-gray-500 mt-1">
            Upload videos and employee photos to track attendance with face detection.
          </p>
        </div>
        <div className="flex space-x-2">
          <select className="px-3 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 bg-white border border-gray-200 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
            <option>Today</option>
            <option>Yesterday</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
          <button
            onClick={() => setShowExportModal(true)}
            disabled={detectionResults.length === 0}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 dark:bg-gray-800 dark:border-gray-700 bg-white rounded-lg shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium dark:text-gray-400 text-gray-500">Total Detections</p>
              <p className="text-2xl font-semibold dark:text-white text-gray-800 mt-1">{stats.totalDetections}</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
              <Eye className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="p-6 dark:bg-gray-800 dark:border-gray-700 bg-white rounded-lg shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium dark:text-gray-400 text-gray-500">Detected Employees</p>
              <p className="text-2xl font-semibold dark:text-white text-gray-800 mt-1">{stats.detectedEmployees}</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="p-6 dark:bg-gray-800 dark:border-gray-700 bg-white rounded-lg shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium dark:text-gray-400 text-gray-500">Unique People</p>
              <p className="text-2xl font-semibold dark:text-white text-gray-800 mt-1">{stats.uniqueEmployees}</p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        <div className="p-6 dark:bg-gray-800 dark:border-gray-700 bg-white rounded-lg shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium dark:text-gray-400 text-gray-500">Employee Photos</p>
              <p className="text-2xl font-semibold dark:text-white text-gray-800 mt-1">{uploadedPhotos.length}</p>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
              <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="dark:bg-gray-800 bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-purple-500 text-purple-600 dark:text-purple-400"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                  {tab.id === "photos" && detectionResults.length > 0 && (
                    <span className="ml-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs px-2 py-0.5 rounded-full">
                      {detectionResults.length}
                    </span>
                  )}
                  {tab.id === "attendance" && stats.uniqueEmployees > 0 && (
                    <span className="ml-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs px-2 py-0.5 rounded-full">
                      {stats.uniqueEmployees}
                    </span>
                  )}
                </button>
              )
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "upload" && (
            <VideoUpload
              onVideoUpload={handleVideoUpload}
              onPhotosUpload={handlePhotosUpload}
              onDetectionResults={handleDetectionResults}
              onMinimumPresenceTimeChange={handleMinimumPresenceTimeChange}
              isProcessing={isProcessing}
              uploadedVideo={uploadedVideo}
              uploadedPhotos={uploadedPhotos}
            />
          )}

          {activeTab === "photos" && <PhotoGallery photos={detectionResults} isProcessing={isProcessing} />}

          {activeTab === "attendance" && (
            <AttendanceList
              detectionResults={detectionResults}
              attendanceData={getAttendanceData()}
              minimumPresenceTime={minimumPresenceTime}
            />
          )}
        </div>
      </div>

      {/* Export Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        detectionResults={detectionResults}
        attendanceData={getAttendanceData()}
      />
    </div>
  )
}
