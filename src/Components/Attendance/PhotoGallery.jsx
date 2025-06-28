import { useState } from "react"
import { Users, Clock, Search, Filter, Download, Eye } from "lucide-react"

const PhotoGallery = ({ photos, isProcessing }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  const filteredPhotos = photos.filter(photo =>
    photo.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (time) => {
    const hour = parseInt(time.split(":")[0])
    const minute = parseInt(time.split(":")[1])
    const totalMinutes = hour * 60 + minute
    
    if (totalMinutes <= 9 * 60 + 30) return "text-green-600 dark:text-green-400" // Before 9:30
    if (totalMinutes <= 10 * 60) return "text-yellow-600 dark:text-yellow-400" // Before 10:00
    return "text-red-600 dark:text-red-400" // After 10:00
  }

  const getStatusText = (time) => {
    const hour = parseInt(time.split(":")[0])
    const minute = parseInt(time.split(":")[1])
    const totalMinutes = hour * 60 + minute
    
    if (totalMinutes <= 9 * 60 + 30) return "On Time"
    if (totalMinutes <= 10 * 60) return "Slightly Late"
    return "Late"
  }

  if (isProcessing) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <h3 className="text-lg font-medium dark:text-white text-gray-900 mb-2">
          Processing Video
        </h3>
        <p className="text-sm dark:text-gray-400 text-gray-500">
          Detecting faces and extracting attendance data...
        </p>
      </div>
    )
  }

  if (photos.length === 0) {
    return (
      <div className="text-center py-12">
        <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium dark:text-white text-gray-900 mb-2">
          No Photos Available
        </h3>
        <p className="text-sm dark:text-gray-400 text-gray-500">
          Upload a video first to see detected faces and attendance data.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with stats */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-medium dark:text-white text-gray-900">
            Present Persons ({photos.length})
          </h3>
          <p className="text-sm dark:text-gray-400 text-gray-500">
            Faces detected from the uploaded video
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-2 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center gap-2">
            <Download size={16} />
            Export Photos
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
          <option value="all">All Times</option>
          <option value="onTime">On Time</option>
          <option value="late">Late</option>
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
              <img
                src={photo.photo}
                alt={photo.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full bg-white/90 dark:bg-gray-800/90 ${getStatusColor(photo.time)}`}>
                  {getStatusText(photo.time)}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-medium dark:text-white text-gray-900 mb-1">
                {photo.name}
              </h4>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Clock size={14} className="mr-1" />
                {photo.time}
              </div>
              <div className="mt-3 flex items-center justify-between">
                <button className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 flex items-center gap-1">
                  <Eye size={14} />
                  View Details
                </button>
                <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                  <Download size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
        <h4 className="font-medium dark:text-white text-gray-900 mb-3">Summary</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {photos.filter(p => getStatusText(p.time) === "On Time").length}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">On Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {photos.filter(p => getStatusText(p.time) === "Slightly Late").length}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Slightly Late</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {photos.filter(p => getStatusText(p.time) === "Late").length}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Late</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {photos.length}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Total</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhotoGallery 