"use client"

import { useState, useEffect } from "react"
import { Sliders, Eye, EyeOff } from "lucide-react"

const ConfidenceSlider = ({ initialThreshold = 60, onThresholdChange, detectionResults = [], disabled = false }) => {
  const [threshold, setThreshold] = useState(initialThreshold)
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    if (onThresholdChange) {
      onThresholdChange(threshold)
    }
  }, [threshold, onThresholdChange])

  const handleSliderChange = (e) => {
    setThreshold(Number.parseInt(e.target.value))
  }

  const getFilteredResults = () => {
    return detectionResults.filter((result) => result.confidence >= threshold)
  }

  const getThresholdStats = () => {
    const filtered = getFilteredResults()
    const total = detectionResults.length
    const passed = filtered.length
    const uniqueEmployees = [...new Set(filtered.filter((r) => r.status === "Detected").map((r) => r.name))].length

    return {
      total,
      passed,
      filtered: total - passed,
      uniqueEmployees,
      percentage: total > 0 ? ((passed / total) * 100).toFixed(1) : 0,
    }
  }

  const stats = getThresholdStats()

  const getThresholdColor = () => {
    if (threshold < 50) return "text-red-600 dark:text-red-400"
    if (threshold < 70) return "text-yellow-600 dark:text-yellow-400"
    return "text-green-600 dark:text-green-400"
  }

  const getSliderColor = () => {
    if (threshold < 50) return "accent-red-500"
    if (threshold < 70) return "accent-yellow-500"
    return "accent-green-500"
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <h3 className="text-sm font-medium dark:text-white text-gray-900">Confidence Threshold</h3>
        </div>
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          title={showPreview ? "Hide preview" : "Show preview"}
        >
          {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      <div className="space-y-4">
        {/* Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-600 dark:text-gray-400">Minimum confidence required</label>
            <span className={`text-sm font-medium ${getThresholdColor()}`}>{threshold}%</span>
          </div>

          <div className="relative">
            <input
              type="range"
              min="0"
              max="100"
              value={threshold}
              onChange={handleSliderChange}
              disabled={disabled}
              className={`w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer ${getSliderColor()} disabled:opacity-50 disabled:cursor-not-allowed`}
            />

            {/* Threshold markers */}
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>0%</span>
              <span className="text-red-500">Low</span>
              <span className="text-yellow-500">Medium</span>
              <span className="text-green-500">High</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Quick preset buttons */}
        <div className="flex gap-2">
          {[
            {
              label: "Low",
              value: 40,
              color: "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400",
            },
            {
              label: "Medium",
              value: 60,
              color: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400",
            },
            {
              label: "High",
              value: 80,
              color: "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400",
            },
          ].map((preset) => (
            <button
              key={preset.value}
              onClick={() => setThreshold(preset.value)}
              disabled={disabled}
              className={`px-3 py-1 text-xs rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                threshold === preset.value ? preset.color.replace("hover:", "") : preset.color
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Threshold Impact Explanation */}
        {detectionResults.length === 0 && (
          <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-medium dark:text-white text-gray-900 mb-2">Threshold Impact</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800">
                <div className="font-medium text-red-800 dark:text-red-200">Low (30-50%)</div>
                <div className="text-red-600 dark:text-red-300">More detections, some false positives</div>
              </div>
              <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded border border-yellow-200 dark:border-yellow-800">
                <div className="font-medium text-yellow-800 dark:text-yellow-200">Medium (50-70%)</div>
                <div className="text-yellow-600 dark:text-yellow-300">Balanced accuracy and coverage</div>
              </div>
              <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
                <div className="font-medium text-green-800 dark:text-green-200">High (70-90%)</div>
                <div className="text-green-600 dark:text-green-300">High accuracy, may miss some faces</div>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        {detectionResults.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="text-lg font-semibold text-green-600 dark:text-green-400">{stats.passed}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Passed</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-red-600 dark:text-red-400">{stats.filtered}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Filtered</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-purple-600 dark:text-purple-400">{stats.uniqueEmployees}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Employees</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">{stats.percentage}%</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Pass Rate</div>
            </div>
          </div>
        )}

        {/* Preview */}
        {showPreview && detectionResults.length > 0 && (
          <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-medium dark:text-white text-gray-900 mb-2">Filtered Results Preview</h4>
            <div className="max-h-32 overflow-y-auto space-y-1">
              {getFilteredResults()
                .slice(0, 5)
                .map((result, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-xs p-2 bg-gray-50 dark:bg-gray-700 rounded"
                  >
                    <span className="font-medium dark:text-white text-gray-900">{result.name}</span>
                    <span className={`${getThresholdColor()}`}>{result.confidence}%</span>
                  </div>
                ))}
              {getFilteredResults().length > 5 && (
                <div className="text-xs text-gray-500 dark:text-gray-400 text-center py-1">
                  +{getFilteredResults().length - 5} more results
                </div>
              )}
            </div>
          </div>
        )}

        {/* Recommendation */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
          <p className="text-xs text-blue-800 dark:text-blue-200">
            <strong>Recommendation:</strong>{" "}
            {threshold < 50
              ? "Low threshold may include false positives. Consider increasing for better accuracy."
              : threshold > 85
                ? "High threshold may miss valid detections. Consider lowering if results seem incomplete."
                : "Good balance between accuracy and detection coverage."}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ConfidenceSlider
