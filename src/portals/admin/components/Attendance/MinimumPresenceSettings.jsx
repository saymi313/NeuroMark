"use client"

import { useState, useEffect } from "react"
import { Clock, AlertTriangle, Info } from "lucide-react"

const MinimumPresenceSettings = ({ initialMinimumTime = 30, onMinimumTimeChange, disabled = false }) => {
  const [minimumTime, setMinimumTime] = useState(initialMinimumTime)
  const [showExplanation, setShowExplanation] = useState(false)
  const [useNoMinimum, setUseNoMinimum] = useState(false)

  useEffect(() => {
    if (onMinimumTimeChange) {
      onMinimumTimeChange(useNoMinimum ? 0 : minimumTime)
    }
  }, [minimumTime, useNoMinimum, onMinimumTimeChange])

  const handleSliderChange = (e) => {
    const value = Number.parseFloat(e.target.value)
    setMinimumTime(value)
    if (value > 0) {
      setUseNoMinimum(false)
    }
  }

  const handleNoMinimumToggle = () => {
    setUseNoMinimum(!useNoMinimum)
    if (!useNoMinimum) {
      // When enabling no minimum, set a reasonable default
      setMinimumTime(1)
    }
  }

  const presetTimes = [
    { label: "0.5s", value: 0.5, description: "Ultra-quick" },
    { label: "1s", value: 1, description: "Instant" },
    { label: "5s", value: 5, description: "Very quick" },
    { label: "15s", value: 15, description: "Quick check-in" },
    { label: "30s", value: 30, description: "Standard" },
    { label: "60s", value: 60, description: "Thorough presence" },
  ]

  const formatTime = (seconds) => {
    if (seconds === 0) return "No minimum"
    if (seconds < 1) return `${seconds} second${seconds !== 1 ? "s" : ""}`
    if (seconds < 60) return `${seconds} second${seconds !== 1 ? "s" : ""}`
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes} minute${minutes > 1 ? "s" : ""}`
  }

  const effectiveTime = useNoMinimum ? 0 : minimumTime

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="text-sm font-medium dark:text-white text-gray-900">Minimum Presence Time</h3>
        </div>
        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          title="Show explanation"
        >
          <Info size={16} />
        </button>
      </div>

      <div className="space-y-4">
        {/* No Minimum Option */}
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="noMinimum"
              checked={useNoMinimum}
              onChange={handleNoMinimumToggle}
              disabled={disabled}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 disabled:opacity-50"
            />
            <label htmlFor="noMinimum" className="text-sm font-medium dark:text-white text-gray-900">
              No minimum presence time
            </label>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">All detections count as present</span>
        </div>

        {/* Current Setting Display */}
        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">{formatTime(effectiveTime)}</div>
          <div className="text-xs text-blue-500 dark:text-blue-300">
            {useNoMinimum ? "Everyone detected will be marked as present" : `Minimum time to be marked as present`}
          </div>
        </div>

        {/* Time Slider - only show when not using no minimum */}
        {!useNoMinimum && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-600 dark:text-gray-400">Minimum time required</label>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{formatTime(minimumTime)}</span>
            </div>

            <div className="relative">
              <input
                type="range"
                
                min="0.5"
                max="300"
                step="0.5"
                value={minimumTime}
                onChange={handleSliderChange}
                disabled={disabled}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              />

              {/* Time markers */}
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0.5s</span>
                <span>1s</span>
                <span>30s</span>
                <span>1m</span>
                <span>5m</span>
              </div>
            </div>
          </div>
        )}

        {/* Quick preset buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {presetTimes.map((preset) => (
            <button
              key={preset.value}
              onClick={() => {
                setMinimumTime(preset.value)
                setUseNoMinimum(false)
              }}
              disabled={disabled}
              className={`p-2 text-xs rounded-lg border transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                !useNoMinimum && minimumTime === preset.value
                  ? "bg-blue-100 border-blue-300 text-blue-700 dark:bg-blue-900/30 dark:border-blue-600 dark:text-blue-400"
                  : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              <div className="font-medium">{preset.label}</div>
              <div className="text-gray-500 dark:text-gray-400">{preset.description}</div>
            </button>
          ))}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
              <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
                How Minimum Presence Time Works
              </h4>
              <ul className="text-xs text-blue-800 dark:text-blue-200 space-y-1">
                <li>• Calculates time between first and last detection of each person</li>
                <li>• If presence time ≥ minimum → marked as "Present"</li>
                <li>• If presence time &lt; minimum → marked as "Absent" (brief appearance)</li>
                <li>• "No minimum" option marks all detected people as present</li>
                <li>• Helps filter out people who just walked by vs. actually attended</li>
              </ul>
            </div>
          </div>
        )}

        {/* Warning for very low times */}
        {!useNoMinimum && minimumTime < 2 && (
          <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-amber-800 dark:text-amber-200">
              <strong>Very low threshold:</strong> May mark people as present even for brief appearances. Consider
              increasing for more accurate attendance tracking.
            </div>
          </div>
        )}

        {/* Warning for no minimum */}
        {useNoMinimum && (
          <div className="flex items-start gap-2 p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
            <AlertTriangle className="w-4 h-4 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-orange-800 dark:text-orange-200">
              <strong>No minimum time:</strong> All detected faces will be marked as present, including people who just
              walked by. Use this only if you want to count any appearance as attendance.
            </div>
          </div>
        )}

        {/* Info for high times */}
        {!useNoMinimum && minimumTime > 120 && (
          <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-blue-800 dark:text-blue-200">
              <strong>High threshold:</strong> Only people present for extended periods will be marked as present. Good
              for meetings or events with expected long attendance.
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MinimumPresenceSettings
