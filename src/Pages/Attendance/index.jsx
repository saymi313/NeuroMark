"use client"

import { useState, useRef } from "react"
import { Upload, Clock, Users, Calendar, Play, Pause, Square, Download, Eye, Filter } from "lucide-react"
import VideoUpload from "../../Components/Attendance/VideoUpload"
import PhotoGallery from "../../Components/Attendance/PhotoGallery"
import AttendanceList from "../../Components/Attendance/AttendanceList"

export default function Attendance() {
  const [activeTab, setActiveTab] = useState("upload")
  const [uploadedVideo, setUploadedVideo] = useState(null)
  const [uploadedPhotos, setUploadedPhotos] = useState([])
  const [processedPhotos, setProcessedPhotos] = useState([])
  const [attendanceData, setAttendanceData] = useState([])
  const [isProcessing, setIsProcessing] = useState(false)

  const handleVideoUpload = (videoFile) => {
    setUploadedVideo(videoFile)
    setIsProcessing(true)
    
    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false)
      // Mock processed photos based on uploaded photos
      if (uploadedPhotos.length > 0) {
        const mockProcessedPhotos = uploadedPhotos.map((photo, index) => ({
          id: index + 1,
          name: photo.name,
          photo: photo.photo,
          time: `09:${15 + index * 5} AM`,
          confidence: 85 + Math.random() * 15
        }))
        setProcessedPhotos(mockProcessedPhotos)
      } else {
        // Fallback mock data if no photos uploaded
        setProcessedPhotos([
          { id: 1, name: "John Doe", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face", time: "09:15 AM", confidence: 95 },
          { id: 2, name: "Jane Smith", photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face", time: "09:20 AM", confidence: 87 },
          { id: 3, name: "Mike Johnson", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face", time: "09:25 AM", confidence: 92 },
          { id: 4, name: "Sarah Wilson", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face", time: "09:30 AM", confidence: 89 },
          { id: 5, name: "David Brown", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face", time: "09:35 AM", confidence: 91 },
        ])
      }
      
      // Mock attendance data
      setAttendanceData([
        { id: 1, name: "John Doe", employeeId: "EMP001", clockIn: "09:15 AM", clockOut: "05:30 PM", status: "Present", avatar: "JD" },
        { id: 2, name: "Jane Smith", employeeId: "EMP002", clockIn: "09:20 AM", clockOut: "05:25 PM", status: "Present", avatar: "JS" },
        { id: 3, name: "Mike Johnson", employeeId: "EMP003", clockIn: "09:25 AM", clockOut: "05:35 PM", status: "Present", avatar: "MJ" },
        { id: 4, name: "Sarah Wilson", employeeId: "EMP004", clockIn: "09:30 AM", clockOut: "05:20 PM", status: "Present", avatar: "SW" },
        { id: 5, name: "David Brown", employeeId: "EMP005", clockIn: "09:35 AM", clockOut: "05:40 PM", status: "Present", avatar: "DB" },
        { id: 6, name: "Emily Davis", employeeId: "EMP006", clockIn: "10:00 AM", clockOut: "05:15 PM", status: "Late", avatar: "ED" },
        { id: 7, name: "Robert Wilson", employeeId: "EMP007", clockIn: "08:45 AM", clockOut: "05:45 PM", status: "Present", avatar: "RW" },
      ])
    }, 3000)
  }

  const handlePhotosUpload = (photos) => {
    setUploadedPhotos(photos)
  }

  const tabs = [
    { id: "upload", label: "Video Upload", icon: Upload },
    { id: "photos", label: "Present Persons", icon: Users },
    { id: "attendance", label: "Attendance List", icon: Calendar },
  ]

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
          <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center gap-2">
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
              <p className="text-sm font-medium dark:text-gray-400 text-gray-500">Total Present</p>
              <p className="text-2xl font-semibold dark:text-white text-gray-800 mt-1">
                {attendanceData.filter(item => item.status === "Present").length}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
              <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="p-6 dark:bg-gray-800 dark:border-gray-700 bg-white rounded-lg shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium dark:text-gray-400 text-gray-500">Late Arrivals</p>
              <p className="text-2xl font-semibold dark:text-white text-gray-800 mt-1">
                {attendanceData.filter(item => item.status === "Late").length}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
              <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="p-6 dark:bg-gray-800 dark:border-gray-700 bg-white rounded-lg shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium dark:text-gray-400 text-gray-500">Employee Photos</p>
              <p className="text-2xl font-semibold dark:text-white text-gray-800 mt-1">
                {uploadedPhotos.length}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="p-6 dark:bg-gray-800 dark:border-gray-700 bg-white rounded-lg shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium dark:text-gray-400 text-gray-500">Attendance Rate</p>
              <p className="text-2xl font-semibold dark:text-white text-gray-800 mt-1">87%</p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
              <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
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
              isProcessing={isProcessing}
              uploadedVideo={uploadedVideo}
              uploadedPhotos={uploadedPhotos}
            />
          )}
          
          {activeTab === "photos" && (
            <PhotoGallery 
              photos={processedPhotos}
              uploadedPhotos={uploadedPhotos}
              isProcessing={isProcessing}
            />
          )}
          
          {activeTab === "attendance" && (
            <AttendanceList 
              attendanceData={attendanceData}
            />
          )}
        </div>
      </div>
    </div>
  )
} 