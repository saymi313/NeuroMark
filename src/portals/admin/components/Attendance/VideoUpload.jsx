"use client"

import { useState, useRef, useEffect } from "react"
import { Upload, Play, Square, Loader2, FileVideo, X, Camera, Users, Eye, Sliders } from "lucide-react"
import { uploadVideoToBackend, uploadMultipleEmployeePhotos, getEmployees, startDetection } from "../../../../services/api"
import ProgressTracker from "./ProgressTracker"
import ConfidenceSlider from "./ConfidenceSlider"
import MinimumPresenceSettings from "./MinimumPresenceSettings"

const VideoUpload = ({
  onVideoUpload,
  onPhotosUpload,
  onDetectionResults,
  onMinimumPresenceTimeChange,
  isProcessing,
  uploadedVideo,
  uploadedPhotos: externalPhotos,
}) => {
  const [dragActive, setDragActive] = useState(false)
  const [photoDragActive, setPhotoDragActive] = useState(false)
  const [videoPreview, setVideoPreview] = useState(null)
  const [uploadedPhotos, setUploadedPhotos] = useState(externalPhotos || [])
  const [isLiveDetection, setIsLiveDetection] = useState(false)
  const [detectionResults, setDetectionResults] = useState([])
  const [processingVideo, setProcessingVideo] = useState(false)
  const [processingPhotos, setProcessingPhotos] = useState(false)
  const [error, setError] = useState(null)
  const [enrollmentStatus, setEnrollmentStatus] = useState("")
  const [enrolledEmployees, setEnrolledEmployees] = useState([])
  const [processingProgress, setProcessingProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [confidenceThreshold, setConfidenceThreshold] = useState(60)
  const [minimumPresenceTime, setMinimumPresenceTime] = useState(1)
  const [videoPath, setVideoPath] = useState(null)
  const fileInputRef = useRef(null)
  const photoInputRef = useRef(null)
  const videoRef = useRef(null)

  // Sync with external photos
  useEffect(() => {
    if (externalPhotos) {
      setUploadedPhotos(externalPhotos)
    }
  }, [externalPhotos])

  // Load enrolled employees on component mount
  useEffect(() => {
    loadEnrolledEmployees()
  }, [])

  // Pass minimum presence time to parent
  useEffect(() => {
    if (onMinimumPresenceTimeChange) {
      onMinimumPresenceTimeChange(minimumPresenceTime)
    }
  }, [minimumPresenceTime, onMinimumPresenceTimeChange])

  const loadEnrolledEmployees = async () => {
    try {
      const result = await getEmployees()
      setEnrolledEmployees(result.employees || [])
    } catch (error) {
      console.error("Error loading enrolled employees:", error)
    }
  }

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
      Array.from(e.dataTransfer.files).forEach((file) => {
        if (file.type.startsWith("image/")) {
          handlePhotoFile(file)
        }
      })
    }
  }

  const handleFile = async (file) => {
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
        file: file,
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
      Array.from(e.target.files).forEach((file) => {
        if (file.type.startsWith("image/")) {
          handlePhotoFile(file)
        }
      })
    }
  }

  const removeVideo = () => {
    setVideoPreview(null)
    onVideoUpload(null)
    setDetectionResults([])
    setVideoPath(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const removePhoto = (photoId) => {
    const updatedPhotos = uploadedPhotos.filter((photo) => photo.id !== photoId)
    setUploadedPhotos(updatedPhotos)
    if (onPhotosUpload) {
      onPhotosUpload(updatedPhotos)
    }
  }

  // Enroll employees with Flask backend
  const enrollEmployees = async () => {
    if (uploadedPhotos.length === 0) return

    setProcessingPhotos(true)
    setError(null)
    setEnrollmentStatus("Enrolling employees...")

    try {
      const photoFiles = uploadedPhotos.map((photo) => photo.file)
      const result = await uploadMultipleEmployeePhotos(photoFiles)

      console.log("Multiple enrollment result:", result)

      if (result.message) {
        setEnrollmentStatus(`✅ ${result.message}`)
        setError(null)
        
        // Reload enrolled employees
        await loadEnrolledEmployees()
      }
    } catch (error) {
      console.error("Error enrolling employees:", error)
      setError(`Failed to enroll employees: ${error.message}`)
      setEnrollmentStatus("❌ Enrollment failed")
    } finally {
      setProcessingPhotos(false)
      setTimeout(() => setEnrollmentStatus(""), 3000)
    }
  }

  const startLiveDetection = async () => {
    if (!uploadedVideo) {
      setError("Please upload a video first")
      return
    }

    if (enrolledEmployees.length === 0) {
      setError("Please upload employee photos and enroll them first")
      return
    }

    setIsLiveDetection(true)
    setError(null)
    setDetectionResults([])
    setProcessingProgress(0)
    setCurrentStep(1)

    try {
      // First upload the video
      console.log("Uploading video...")
      const uploadResult = await uploadVideoToBackend(uploadedVideo)
      setVideoPath(uploadResult.video_path)
      setProcessingProgress(30)
      setCurrentStep(2)

      // Then start detection
      console.log("Starting detection...")
      const detectionResult = await startDetection(uploadResult.video_path)
      setProcessingProgress(100)
      setCurrentStep(5)

      if (detectionResult.results && detectionResult.results.length > 0) {
        const newResults = detectionResult.results
          .filter((face) => face.confidence >= confidenceThreshold / 100)
          .map((face, index) => ({
            id: Date.now() + index,
            name: face.name,
            confidence: Math.round((face.confidence || 0) * 100),
            status: face.name !== "Unknown" ? "Detected" : "Unknown",
            time: new Date().toLocaleTimeString(),
            timestamp: face.timestamp,
            bbox: face.bbox,
            image: face.image,
            photo: face.image ? `data:image/jpeg;base64,${face.image}` : null,
          }))

        setDetectionResults(newResults)

        if (onDetectionResults) {
          onDetectionResults(newResults)
        }

        const uniquePeople = [...new Set(newResults.map((r) => r.name).filter((name) => name !== "Unknown"))]
        console.log(
          `Detection complete: Found ${newResults.length} faces, ${uniquePeople.length} unique people: ${uniquePeople.join(", ")}`,
        )

        if (uniquePeople.length === 0) {
          setError(
            "No enrolled employees detected in the video. Please check if the video contains clear faces of enrolled employees.",
          )
        }
      } else {
        setError("No faces detected in the video. Please ensure the video contains clear faces.")
        setDetectionResults([])
      }
    } catch (error) {
      console.error("Error starting detection:", error)
      setError("Failed to start detection: " + error.message)
      setDetectionResults([])
    } finally {
      setIsLiveDetection(false)
      setTimeout(() => {
        setCurrentStep(0)
        setProcessingProgress(0)
      }, 3000)
    }
  }

  const stopLiveDetection = () => {
    setIsLiveDetection(false)
    setDetectionResults([])
  }

  return (
    <div className="space-y-8">
      {/* Error Display */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
        </div>
      )}

      {/* Enrollment Status */}
      {enrollmentStatus && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-blue-800 dark:text-blue-200 text-sm">{enrollmentStatus}</p>
        </div>
      )}

      {/* Enrolled Employees Status */}
      {enrolledEmployees.length > 0 && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <p className="text-green-800 dark:text-green-200 text-sm">
            ✅ {enrolledEmployees.length} employees enrolled: {enrolledEmployees.join(", ")}
          </p>
        </div>
      )}

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
                <span className="text-sm dark:text-gray-400 text-gray-500">Supports MP4, AVI, MOV</span>
              </div>
            </div>
            <input ref={fileInputRef} type="file" accept="video/*" onChange={handleFileInput} className="hidden" />
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
              <video ref={videoRef} src={videoPreview} className="w-full h-64 object-cover" controls />
              {(isProcessing || processingVideo || isLiveDetection) && (
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
                    {uploadedVideo ? (uploadedVideo.size / (1024 * 1024)).toFixed(2) + " MB" : "Unknown size"}
                  </p>
                </div>
              </div>
              {(isProcessing || processingVideo || isLiveDetection) && (
                <div className="flex items-center space-x-2 text-purple-600 dark:text-purple-400">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Processing...</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Progress Tracker */}
        {(isLiveDetection || currentStep > 0) && (
          <ProgressTracker
            isProcessing={isLiveDetection}
            currentStep={currentStep}
            totalSteps={5}
            progress={processingProgress}
            onCancel={() => {
              setIsLiveDetection(false)
              setCurrentStep(0)
              setProcessingProgress(0)
            }}
          />
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
              <h3 className="text-lg font-medium dark:text-white text-gray-900">Upload Employee Photos</h3>
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
              <span className="text-sm dark:text-gray-400 text-gray-500">Supports JPG, PNG, WebP</span>
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
            <div className="flex items-center justify-between">
              <h4 className="font-medium dark:text-white text-gray-900">
                Uploaded Employee Photos ({uploadedPhotos.length})
              </h4>
              <button
                onClick={enrollEmployees}
                disabled={processingPhotos}
                className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {processingPhotos ? <Loader2 className="w-4 h-4 animate-spin" /> : <Users className="w-4 h-4" />}
                {processingPhotos ? "Enrolling..." : "Enroll Employees"}
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {uploadedPhotos.map((photo) => (
                <div key={photo.id} className="relative group">
                  <img
                    src={photo.photo || "/placeholder.svg"}
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
                  <p className="text-xs text-center mt-1 dark:text-gray-300 text-gray-600 truncate">{photo.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Detection Settings - Show when employees are enrolled */}
      {enrolledEmployees.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium dark:text-white text-gray-900 flex items-center gap-2">
            <Sliders size={20} />
            Detection Settings
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Confidence Threshold */}
            <ConfidenceSlider
              initialThreshold={confidenceThreshold}
              onThresholdChange={setConfidenceThreshold}
              detectionResults={detectionResults}
              disabled={isLiveDetection}
            />

            {/* Minimum Presence Time */}
            <MinimumPresenceSettings
              initialMinimumTime={minimumPresenceTime}
              onMinimumTimeChange={setMinimumPresenceTime}
              disabled={isLiveDetection}
            />
          </div>
        </div>
      )}

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
                Analyze the uploaded video against enrolled employee photos
              </p>
            </div>
            <div className="flex space-x-2">
              {!isLiveDetection ? (
                <button
                  onClick={startLiveDetection}
                  disabled={!videoPreview || enrolledEmployees.length === 0}
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

          {/* Detection Results */}
          <div className="space-y-4">
            {isLiveDetection && (
              <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-medium dark:text-white text-gray-900">Processing Video...</h5>
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin text-green-500" />
                    <span className="text-sm text-green-600 dark:text-green-400">Processing</span>
                  </div>
                </div>
              </div>
            )}

            {detectionResults.length > 0 && !isLiveDetection && (
              <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-medium dark:text-white text-gray-900">
                    Detection Results ({detectionResults.length})
                  </h5>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600 dark:text-green-400">Complete</span>
                  </div>
                </div>

                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {detectionResults.map((result) => (
                    <div
                      key={result.id}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-600 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        {result.image && (
                          <img
                            src={`data:image/jpeg;base64,${result.image}`}
                            alt={result.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        )}
                        <div
                          className={`w-3 h-3 rounded-full ${
                            result.status === "Detected" ? "bg-green-500" : "bg-yellow-500"
                          }`}
                        ></div>
                        <div>
                          <p className="font-medium dark:text-white text-gray-900">{result.name}</p>
                          <p className="text-sm dark:text-gray-400 text-gray-500">
                            Confidence: {result.confidence}% | Time: {result.timestamp}s
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            result.status === "Detected"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                          }`}
                        >
                          {result.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Requirements Check */}
            {!isLiveDetection && detectionResults.length === 0 && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Requirements for Live Detection:</h5>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li
                    className={`flex items-center gap-2 ${videoPreview ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                  >
                    {videoPreview ? "✓" : "✗"} Video uploaded
                  </li>
                  <li
                    className={`flex items-center gap-2 ${uploadedPhotos.length > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                  >
                    {uploadedPhotos.length > 0 ? "✓" : "✗"} Employee photos uploaded ({uploadedPhotos.length})
                  </li>
                  <li
                    className={`flex items-center gap-2 ${enrolledEmployees.length > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                  >
                    {enrolledEmployees.length > 0 ? "✓" : "✗"} Employees enrolled ({enrolledEmployees.length})
                  </li>
                  <li className="text-green-600 dark:text-green-400 flex items-center gap-2">
                    ✓ Confidence threshold: {confidenceThreshold}%
                  </li>
                  <li className="text-green-600 dark:text-green-400 flex items-center gap-2">
                    ✓ Minimum presence time: {minimumPresenceTime === 0 ? "No minimum" : `${minimumPresenceTime}s`}
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">Step-by-step workflow:</h4>
        <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-decimal list-inside">
          <li>Upload employee photos (clear, front-facing images)</li>
          <li>Click "Enroll Employees" to train the face recognition system</li>
          <li>Configure detection settings (confidence threshold & minimum presence time)</li>
          <li>Upload a video file containing the employees</li>
          <li>Click "Start Detection" to analyze the video</li>
          <li>View results in Detection Results and Attendance List tabs</li>
        </ol>
      </div>
    </div>
  )
}

export default VideoUpload
