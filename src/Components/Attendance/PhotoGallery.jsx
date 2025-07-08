"use client"

import { useState } from "react"
import { Users, Clock, Search, Download, Eye } from "lucide-react"

const PhotoGallery = ({ photos, isProcessing }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  const filteredPhotos = photos.filter(
    (photo) =>
      photo.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedFilter === "all" ||
        (selectedFilter === "detected" && photo.status === "Detected") ||
        (selectedFilter === "unknown" && photo.status === "Unknown")),
  )

  const getStatusColor = (status) => {
    switch (status) {
      case "Detected":
        return "text-green-600 dark:text-green-400"
      case "Unknown":
        return "text-yellow-600 dark:text-yellow-400"
      default:
        return "text-gray-600 dark:text-gray-400"
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "Detected":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "Unknown":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  if (isProcessing) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <h3 className="text-lg font-medium dark:text-white text-gray-900 mb-2">Processing Video</h3>
        <p className="text-sm dark:text-gray-400 text-gray-500">Detecting faces and extracting attendance data...</p>
      </div>
    )
  }

  if (photos.length === 0) {
    return (
      <div className="text-center py-12">
        <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium dark:text-white text-gray-900 mb-2">No Detection Results</h3>
        <p className="text-sm dark:text-gray-400 text-gray-500">
          Upload a video and start detection to see detected faces here.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with stats */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-medium dark:text-white text-gray-900">Detected Faces ({photos.length})</h3>
          <p className="text-sm dark:text-gray-400 text-gray-500">Faces detected from the uploaded video</p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-2 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center gap-2">
            <Download size={16} />
            Export Results
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="all">All Detections</option>
          <option value="detected">Detected Employees</option>
          <option value="unknown">Unknown Faces</option>
        </select>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative">
              {photo.photo ? (
                <img src={photo.photo || "/placeholder.svg"} alt={photo.name} className="w-full h-48 object-cover" />
              ) : photo.image ? (
                <img
                  src={`data:image/jpeg;base64,${photo.image}`}
                  alt={photo.name}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <Users className="w-12 h-12 text-gray-400" />
                </div>
              )}
              <div className="absolute top-2 right-2">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full bg-white/90 dark:bg-gray-800/90 ${getStatusColor(photo.status)}`}
                >
                  {photo.status}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-medium dark:text-white text-gray-900 mb-1">{photo.name}</h4>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                <Clock size={14} className="mr-1" />
                {photo.timestamp ? `${photo.timestamp}s` : photo.time}
              </div>
              {photo.confidence && (
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">Confidence: {photo.confidence}%</div>
              )}
              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(photo.status)}`}>{photo.status}</span>
                <button className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 flex items-center gap-1">
                  <Eye size={14} />
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
        <h4 className="font-medium dark:text-white text-gray-900 mb-3">Detection Summary</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {photos.filter((p) => p.status === "Detected").length}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Detected</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {photos.filter((p) => p.status === "Unknown").length}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Unknown</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {[...new Set(photos.filter((p) => p.status === "Detected").map((p) => p.name))].length}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Unique People</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{photos.length}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Total</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhotoGallery
