"use client"

import { useState, useEffect } from "react"
import { Loader2, CheckCircle, Clock, Play } from "lucide-react"

const ProgressTracker = ({ isProcessing, currentStep, totalSteps, progress, onCancel }) => {
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [estimatedTimeRemaining, setEstimatedTimeRemaining] = useState(null)

  useEffect(() => {
    let interval = null
    if (isProcessing) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1)
      }, 1000)
    } else {
      setTimeElapsed(0)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isProcessing])

  useEffect(() => {
    if (progress > 0 && timeElapsed > 0) {
      const estimatedTotal = (timeElapsed / progress) * 100
      const remaining = Math.max(0, estimatedTotal - timeElapsed)
      setEstimatedTimeRemaining(Math.round(remaining))
    }
  }, [progress, timeElapsed])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const steps = [
    { id: 1, name: "Initializing", description: "Preparing video for processing" },
    { id: 2, name: "Face Detection", description: "Detecting faces in video frames" },
    { id: 3, name: "Recognition", description: "Matching faces with enrolled employees" },
    { id: 4, name: "Processing Results", description: "Generating attendance records" },
    { id: 5, name: "Complete", description: "Processing finished successfully" },
  ]

  if (!isProcessing && currentStep === 0) {
    return null
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium dark:text-white text-gray-900">Processing Video</h3>
        {isProcessing && onCancel && (
          <button
            onClick={onCancel}
            className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>Progress: {Math.round(progress)}%</span>
          <span>
            {timeElapsed > 0 && `Elapsed: ${formatTime(timeElapsed)}`}
            {estimatedTimeRemaining && ` | ETA: ${formatTime(estimatedTimeRemaining)}`}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-purple-600 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {steps.map((step) => {
          const isActive = step.id === currentStep
          const isCompleted = step.id < currentStep
          const isFuture = step.id > currentStep

          return (
            <div key={step.id} className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : isActive ? (
                  isProcessing ? (
                    <Loader2 className="w-5 h-5 text-purple-600 animate-spin" />
                  ) : (
                    <Play className="w-5 h-5 text-purple-600" />
                  )
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600"></div>
                )}
              </div>
              <div className="flex-1">
                <p
                  className={`text-sm font-medium ${
                    isActive
                      ? "text-purple-600 dark:text-purple-400"
                      : isCompleted
                        ? "text-green-600 dark:text-green-400"
                        : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {step.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{step.description}</p>
              </div>
              {isActive && (
                <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="w-3 h-3" />
                  <span>{formatTime(timeElapsed)}</span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Current Status */}
      {isProcessing && (
        <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <p className="text-sm text-purple-800 dark:text-purple-200">
            {currentStep <= steps.length ? steps[currentStep - 1]?.description : "Processing..."}
          </p>
        </div>
      )}
    </div>
  )
}

export default ProgressTracker
