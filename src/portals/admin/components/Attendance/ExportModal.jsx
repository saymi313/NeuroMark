"use client"

import { useState } from "react"
import { X, Download, FileText, Table } from "lucide-react"
import { Loader2 } from "lucide-react"

const ExportModal = ({ isOpen, onClose, detectionResults, attendanceData }) => {
  const [exportFormat, setExportFormat] = useState("csv")
  const [exportType, setExportType] = useState("attendance")
  const [includeImages, setIncludeImages] = useState(false)
  const [dateRange, setDateRange] = useState("all")
  const [isExporting, setIsExporting] = useState(false)

  if (!isOpen) return null

  const exportFormats = [
    { id: "csv", name: "CSV", icon: Table, description: "Comma-separated values for spreadsheets" },
    { id: "json", name: "JSON", icon: FileText, description: "JavaScript Object Notation for developers" },
    { id: "pdf", name: "PDF", icon: FileText, description: "Portable Document Format for reports" },
  ]

  const exportTypes = [
    { id: "attendance", name: "Attendance Records", description: "Employee attendance summary" },
    { id: "detections", name: "All Detections", description: "Raw face detection results" },
    { id: "summary", name: "Summary Report", description: "Statistical summary and insights" },
  ]

  const handleExport = async () => {
    setIsExporting(true)

    try {
      let dataToExport = []
      let filename = ""

      // Prepare data based on export type
      switch (exportType) {
        case "attendance":
          dataToExport = attendanceData.map((record) => ({
            Name: record.name,
            "Employee ID": record.employeeId,
            "Clock In": record.clockIn,
            Status: record.status,
            "Detection Count": record.detections.length,
            Confidence: `${record.confidence}%`,
            "First Detection": `${record.firstDetection.toFixed(1)}s`,
            "Last Detection": `${record.lastDetection.toFixed(1)}s`,
          }))
          filename = `attendance_records_${new Date().toISOString().split("T")[0]}`
          break

        case "detections":
          dataToExport = detectionResults.map((detection) => ({
            Name: detection.name,
            Status: detection.status,
            Confidence: `${detection.confidence}%`,
            Timestamp: `${detection.timestamp}s`,
            "Bounding Box": detection.bbox ? detection.bbox.join(",") : "",
            Frame: detection.frame || "",
          }))
          filename = `face_detections_${new Date().toISOString().split("T")[0]}`
          break

        case "summary":
          const uniqueEmployees = [
            ...new Set(detectionResults.filter((r) => r.status === "Detected").map((r) => r.name)),
          ]
          const totalDetections = detectionResults.length
          const detectedEmployees = detectionResults.filter((r) => r.status === "Detected").length

          dataToExport = [
            { Metric: "Total Detections", Value: totalDetections },
            { Metric: "Detected Employees", Value: detectedEmployees },
            { Metric: "Unique Employees", Value: uniqueEmployees.length },
            { Metric: "Unknown Faces", Value: detectionResults.filter((r) => r.status === "Unknown").length },
            { Metric: "Detection Rate", Value: `${((detectedEmployees / totalDetections) * 100).toFixed(1)}%` },
            { Metric: "Employees Present", Value: uniqueEmployees.join(", ") },
          ]
          filename = `attendance_summary_${new Date().toISOString().split("T")[0]}`
          break
      }

      // Export based on format
      switch (exportFormat) {
        case "csv":
          exportToCSV(dataToExport, filename)
          break
        case "json":
          exportToJSON(dataToExport, filename)
          break
        case "pdf":
          await exportToPDF(dataToExport, filename, exportType)
          break
      }

      // Close modal after successful export
      setTimeout(() => {
        onClose()
      }, 1000)
    } catch (error) {
      console.error("Export failed:", error)
      alert("Export failed. Please try again.")
    } finally {
      setIsExporting(false)
    }
  }

  const exportToCSV = (data, filename) => {
    if (data.length === 0) return

    const headers = Object.keys(data[0])
    const csvContent = [
      headers.join(","),
      ...data.map((row) => headers.map((header) => `"${row[header] || ""}"`).join(",")),
    ].join("\n")

    downloadFile(csvContent, `${filename}.csv`, "text/csv")
  }

  const exportToJSON = (data, filename) => {
    const jsonContent = JSON.stringify(data, null, 2)
    downloadFile(jsonContent, `${filename}.json`, "application/json")
  }

  const exportToPDF = async (data, filename, type) => {
    // This would require a PDF library like jsPDF
    // For now, we'll create a simple HTML report and let the user print to PDF
    const htmlContent = generateHTMLReport(data, type)
    const newWindow = window.open("", "_blank")
    newWindow.document.write(htmlContent)
    newWindow.document.close()
    newWindow.print()
  }

  const generateHTMLReport = (data, type) => {
    const title =
      type === "attendance" ? "Attendance Report" : type === "detections" ? "Detection Report" : "Summary Report"
    const date = new Date().toLocaleDateString()

    let tableRows = ""
    if (data.length > 0) {
      const headers = Object.keys(data[0])
      const headerRow = headers
        .map((h) => `<th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">${h}</th>`)
        .join("")
      const dataRows = data
        .map(
          (row) =>
            `<tr>${headers.map((h) => `<td style="border: 1px solid #ddd; padding: 8px;">${row[h] || ""}</td>`).join("")}</tr>`,
        )
        .join("")

      tableRows = `
        <table style="border-collapse: collapse; width: 100%; margin-top: 20px;">
          <thead><tr>${headerRow}</tr></thead>
          <tbody>${dataRows}</tbody>
        </table>
      `
    }

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #333; }
            .header { border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${title}</h1>
            <p>Generated on: ${date}</p>
          </div>
          ${tableRows}
        </body>
      </html>
    `
  }

  const downloadFile = (content, filename, mimeType) => {
    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold dark:text-white text-gray-900">Export Data</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Export Type */}
          <div>
            <label className="block text-sm font-medium dark:text-white text-gray-900 mb-3">What to Export</label>
            <div className="space-y-2">
              {exportTypes.map((type) => (
                <label key={type.id} className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="exportType"
                    value={type.id}
                    checked={exportType === type.id}
                    onChange={(e) => setExportType(e.target.value)}
                    className="mt-1 text-purple-600 focus:ring-purple-500"
                  />
                  <div>
                    <div className="text-sm font-medium dark:text-white text-gray-900">{type.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{type.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Export Format */}
          <div>
            <label className="block text-sm font-medium dark:text-white text-gray-900 mb-3">Export Format</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {exportFormats.map((format) => {
                const Icon = format.icon
                return (
                  <label
                    key={format.id}
                    className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                      exportFormat === format.id
                        ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-purple-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="exportFormat"
                      value={format.id}
                      checked={exportFormat === format.id}
                      onChange={(e) => setExportFormat(e.target.value)}
                      className="text-purple-600 focus:ring-purple-500"
                    />
                    <Icon size={20} className="text-gray-600 dark:text-gray-400" />
                    <div>
                      <div className="text-sm font-medium dark:text-white text-gray-900">{format.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{format.description}</div>
                    </div>
                  </label>
                )
              })}
            </div>
          </div>

          {/* Additional Options */}
          <div className="space-y-3">
            <label className="block text-sm font-medium dark:text-white text-gray-900">Additional Options</label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeImages}
                onChange={(e) => setIncludeImages(e.target.checked)}
                className="text-purple-600 focus:ring-purple-500"
                disabled={exportFormat === "csv"}
              />
              <span className="text-sm dark:text-gray-300 text-gray-700">Include face images (JSON/PDF only)</span>
            </label>

            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Date Range</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Data</option>
                <option value="today">Today Only</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>

          {/* Data Preview */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 className="text-sm font-medium dark:text-white text-gray-900 mb-2">Export Preview</h4>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <p>
                Records to export:{" "}
                {exportType === "attendance"
                  ? attendanceData.length
                  : exportType === "detections"
                    ? detectionResults.length
                    : "Summary data"}
              </p>
              <p>Format: {exportFormats.find((f) => f.id === exportFormat)?.name}</p>
              <p>Type: {exportTypes.find((t) => t.id === exportType)?.name}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isExporting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download size={16} />
                Export Data
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ExportModal
