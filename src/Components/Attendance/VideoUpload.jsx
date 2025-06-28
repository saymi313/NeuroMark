import { useState, useRef, useEffect } from "react"
import { Upload, Play, Pause, Square, Loader2, FileVideo, X, Camera, Users, Eye } from "lucide-react"

const VideoUpload = ({ onVideoUpload, onPhotosUpload, isProcessing, uploadedVideo, uploadedPhotos: externalPhotos }) => {
  const [dragActive, setDragActive] = useState(false)
  const [photoDragActive, setPhotoDragActive] = useState(false)
  const [videoPreview, setVideoPreview] = useState(null)
  const [uploadedPhotos, setUploadedPhotos] = useState(externalPhotos || [])
  const [isLiveDetection, setIsLiveDetection] = useState(false)
  const [detectionResults, setDetectionResults] = useState([])
  const fileInputRef = useRef(null)
  const photoInputRef = useRef(null)
  const videoRef = useRef(null)

  // Sync with external photos
  useEffect(() => {
    if (externalPhotos) {
      setUploadedPhotos(externalPhotos)
    }
  }, [externalPhotos])

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handlePhotoDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setPhotoDragActive(true)
    } else if (e.type === "dragleave") {
      setPhotoDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handlePhotoDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setPhotoDragActive(false)
    
    if (e.dataTransfer.files) {
      Array.from(e.dataTransfer.files).forEach(file => {
        if (file.type.startsWith("image/")) {
          handlePhotoFile(file)
        }
      })
    }
  }

  const handleFile = (file) => {
    if (file.type.startsWith("video/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setVideoPreview(e.target.result)
        onVideoUpload(file)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePhotoFile = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const newPhoto = {
        id: Date.now() + Math.random(),
        name: file.name.replace(/\.[^/.]+$/, ""),
        photo: e.target.result,
        file: file
      }
      const updatedPhotos = [...uploadedPhotos, newPhoto]
      setUploadedPhotos(updatedPhotos)
      if (onPhotosUpload) {
        onPhotosUpload(updatedPhotos)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handlePhotoInput = (e) => {
    if (e.target.files) {
      Array.from(e.target.files).forEach(file => {
        if (file.type.startsWith("image/")) {
          handlePhotoFile(file)
        }
      })
    }
  }

  const removeVideo = () => {
    setVideoPreview(null)
    onVideoUpload(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const removePhoto = (photoId) => {
    const updatedPhotos = uploadedPhotos.filter(photo => photo.id !== photoId)
    setUploadedPhotos(updatedPhotos)
    if (onPhotosUpload) {
      onPhotosUpload(updatedPhotos)
    }
  }

  const startLiveDetection = () => {
    setIsLiveDetection(true)
    // Simulate live detection results
    setTimeout(() => {
      setDetectionResults([
        { id: 1, name: "John Doe", confidence: 95, status: "Detected", time: new Date().toLocaleTimeString() },
        { id: 2, name: "Jane Smith", confidence: 87, status: "Detected", time: new Date().toLocaleTimeString() },
        { id: 3, name: "Unknown Person", confidence: 45, status: "Unknown", time: new Date().toLocaleTimeString() },
      ])
    }, 2000)
  }

  const stopLiveDetection = () => {
    setIsLiveDetection(false)
    setDetectionResults([])
  }

  return (
    <div className="space-y-8">
      {/* Video Upload Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium dark:text-white text-gray-900 flex items-center gap-2">
          <FileVideo size={20} />
          Upload Attendance Video
        </h3>
        
        {!videoPreview ? (
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                : "border-gray-300 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-500"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                <Upload className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium dark:text-white text-gray-900">
                  Upload Video for Attendance Processing
                </h3>
                <p className="text-sm dark:text-gray-400 text-gray-500 mt-1">
                  Drag and drop your video file here, or click to browse
                </p>
              </div>
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                >
                  Choose Video File
                </button>
                <span className="text-sm dark:text-gray-400 text-gray-500">
                  Supports MP4, AVI, MOV
                </span>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileInput}
              className="hidden"
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium dark:text-white text-gray-900">Video Preview</h4>
              <button
                onClick={removeVideo}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="relative bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                src={videoPreview}
                className="w-full h-64 object-cover"
                controls
              />
              {isProcessing && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                    <p>Processing video for face detection...</p>
                    <p className="text-sm text-gray-300 mt-1">This may take a few moments</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-3">
                <FileVideo className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <div>
                  <p className="text-sm font-medium dark:text-white text-gray-900">
                    {uploadedVideo?.name || "Video file"}
                  </p>
                  <p className="text-xs dark:text-gray-400 text-gray-500">
                    {(uploadedVideo?.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
              {isProcessing && (
                <div className="flex items-center space-x-2 text-purple-600 dark:text-purple-400">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Processing...</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Employee Photos Upload Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium dark:text-white text-gray-900 flex items-center gap-2">
          <Users size={20} />
          Upload Employee Photos for Face Detection
        </h3>
        
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            photoDragActive
              ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
              : "border-gray-300 dark:border-gray-600 hover:border-purple-400 dark:hover:border-purple-500"
          }`}
          onDragEnter={handlePhotoDrag}
          onDragLeave={handlePhotoDrag}
          onDragOver={handlePhotoDrag}
          onDrop={handlePhotoDrop}
        >
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
              <Camera className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium dark:text-white text-gray-900">
                Upload Employee Photos
              </h3>
              <p className="text-sm dark:text-gray-400 text-gray-500 mt-1">
                Drag and drop employee photos here for face recognition training
              </p>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => photoInputRef.current?.click()}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                Choose Photo Files
              </button>
              <span className="text-sm dark:text-gray-400 text-gray-500">
                Supports JPG, PNG, WebP
              </span>
            </div>
          </div>
          <input
            ref={photoInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotoInput}
            className="hidden"
          />
        </div>

        {/* Uploaded Photos Grid */}
        {uploadedPhotos.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-medium dark:text-white text-gray-900">
              Uploaded Employee Photos ({uploadedPhotos.length})
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {uploadedPhotos.map((photo) => (
                <div key={photo.id} className="relative group">
                  <img
                    src={photo.photo}
                    alt={photo.name}
                    className="w-full h-24 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <button
                      onClick={() => removePhoto(photo.id)}
                      className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <p className="text-xs text-center mt-1 dark:text-gray-300 text-gray-600 truncate">
                    {photo.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Live Face Detection Analysis Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium dark:text-white text-gray-900 flex items-center gap-2">
          <Eye size={20} />
          Live Face Detection Analysis
        </h3>
        
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-medium dark:text-white text-gray-900">Real-time Face Detection</h4>
              <p className="text-sm dark:text-gray-400 text-gray-500">
                Analyze the uploaded video against employee photos
              </p>
            </div>
            <div className="flex space-x-2">
              {!isLiveDetection ? (
                <button
                  onClick={startLiveDetection}
                  disabled={!videoPreview || uploadedPhotos.length === 0}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Play size={16} />
                  Start Detection
                </button>
              ) : (
                <button
                  onClick={stopLiveDetection}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  <Square size={16} />
                  Stop Detection
                </button>
              )}
            </div>
          </div>

          {/* Live Detection Results */}
          <div className="space-y-4">
            {isLiveDetection && (
              <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-medium dark:text-white text-gray-900">Detection Results</h5>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-600 dark:text-green-400">Live</span>
                  </div>
                </div>
                
                {detectionResults.length > 0 ? (
                  <div className="space-y-2">
                    {detectionResults.map((result) => (
                      <div key={result.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-600 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            result.status === "Detected" ? "bg-green-500" : "bg-yellow-500"
                          }`}></div>
                          <div>
                            <p className="font-medium dark:text-white text-gray-900">{result.name}</p>
                            <p className="text-sm dark:text-gray-400 text-gray-500">
                              Confidence: {result.confidence}%
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm dark:text-gray-400 text-gray-500">{result.time}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            result.status === "Detected" 
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                          }`}>
                            {result.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                    <p className="text-sm dark:text-gray-400 text-gray-500">
                      Analyzing video for face detection...
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Requirements Check */}
            {!isLiveDetection && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                  Requirements for Live Detection:
                </h5>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li className={`flex items-center gap-2 ${videoPreview ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                    {videoPreview ? "✓" : "✗"} Video uploaded
                  </li>
                  <li className={`flex items-center gap-2 ${uploadedPhotos.length > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                    {uploadedPhotos.length > 0 ? "✓" : "✗"} Employee photos uploaded ({uploadedPhotos.length})
                  </li>
                  <li className="text-blue-600 dark:text-blue-400 flex items-center gap-2">
                    ℹ Face detection model ready
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
          Instructions for best results:
        </h4>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• Upload employee photos with their first name as filename (e.g., Farrukh.png for Farrukh Saeed)</li>
          <li>• Upload clear, high-quality employee photos for better recognition</li>
          <li>• Ensure good lighting in the video</li>
          <li>• Faces should be clearly visible and facing the camera</li>
          <li>• Avoid fast movements or blurry footage</li>
          <li>• Recommended: 1 photo per employee for better accuracy</li>
        </ul>
      </div>
    </div>
  )
}

export default VideoUpload 