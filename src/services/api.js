// API service for communicating with Flask Face Detection Backend
const API_BASE_URL = "http://localhost:8000"

// Upload employee photo for face recognition
export const uploadEmployeePhoto = async (photoFile, employeeName) => {
  const formData = new FormData()
  formData.append("photo", photoFile)
  formData.append("name", employeeName)

  try {
    const response = await fetch(`${API_BASE_URL}/api/enroll-employee`, {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    return result
  } catch (error) {
    console.error("Error uploading employee photo:", error)
    throw error
  }
}

// Upload multiple employee photos at once
export const uploadMultipleEmployeePhotos = async (photoFiles) => {
  const formData = new FormData()

  photoFiles.forEach((photoFile) => {
    formData.append("photos", photoFile)
  })

  try {
    const response = await fetch(`${API_BASE_URL}/api/upload-multiple-employees`, {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    return result
  } catch (error) {
    console.error("Error uploading multiple employee photos:", error)
    throw error
  }
}

// Get all enrolled employees
export const getEmployees = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/employees`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const employees = await response.json()
    return employees
  } catch (error) {
    console.error("Error fetching employees:", error)
    throw error
  }
}

// Clear all enrolled employees
export const clearEmployees = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/clear-employees`, {
      method: "POST",
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    return result
  } catch (error) {
    console.error("Error clearing employees:", error)
    throw error
  }
}

// Remove specific employee
export const removeEmployee = async (employeeName) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/remove-employee`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: employeeName }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    return result
  } catch (error) {
    console.error("Error removing employee:", error)
    throw error
  }
}

// Upload video for processing
export const uploadVideoToBackend = async (videoFile) => {
  const formData = new FormData()
  formData.append("video", videoFile)

  try {
    console.log("Uploading video to backend:", videoFile.name)

    const response = await fetch(`${API_BASE_URL}/upload-video`, {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      const errorText = await response.text()
      let errorMessage

      try {
        const errorData = JSON.parse(errorText)
        errorMessage = errorData.error || `HTTP error! status: ${response.status}`
      } catch {
        errorMessage = `HTTP error! status: ${response.status}`
      }

      throw new Error(errorMessage)
    }

    const result = await response.json()
    console.log("Video processing successful:", result)
    return result
  } catch (error) {
    console.error("Error uploading video:", error)
    throw error
  }
}

// Start face detection
export const startDetection = async (videoPath) => {
  try {
    const response = await fetch(`${API_BASE_URL}/start-detection`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ video_path: videoPath }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    return result
  } catch (error) {
    console.error("Error starting detection:", error)
    throw error
  }
}

// Get attendance records
export const getAttendanceRecords = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/attendance`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const records = await response.json()
    return records
  } catch (error) {
    console.error("Error fetching attendance records:", error)
    // Return empty array if endpoint doesn't exist yet
    return []
  }
}

// Test server connection
export const testServerConnection = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.text()
    return result
  } catch (error) {
    console.error("Error testing server connection:", error)
    throw error
  }
}

// Legacy functions for backward compatibility
export const uploadVideoToSwitch = async (videoFile) => {
  // This is now handled by uploadVideoToBackend
  return await uploadVideoToBackend(videoFile)
}

export const enrollEmployee = async (photoFile, employeeName) => {
  // This is now handled by uploadEmployeePhoto
  return await uploadEmployeePhoto(photoFile, employeeName)
}

// WebSocket connection (placeholder - not implemented in Flask backend yet)
export const connectWebSocket = (onMessage, onOpen, onClose, onError) => {
  console.warn("WebSocket not implemented in Flask backend yet")

  // Return a mock WebSocket object
  const mockWs = {
    close: () => {
      console.log("Mock WebSocket closed")
      if (onClose) onClose()
    },
    send: (data) => {
      console.log("Mock WebSocket send:", data)
    },
  }

  // Simulate connection
  setTimeout(() => {
    if (onOpen) onOpen()
  }, 100)

  return mockWs
}

// Export all functions
export default {
  uploadEmployeePhoto,
  uploadMultipleEmployeePhotos,
  getEmployees,
  clearEmployees,
  removeEmployee,
  uploadVideoToBackend,
  startDetection,
  getAttendanceRecords,
  testServerConnection,
  uploadVideoToSwitch,
  enrollEmployee,
  connectWebSocket,
}
