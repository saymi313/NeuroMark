"use client"

import { useState, useEffect } from "react"
import { 
  Calendar, 
  Clock, 
  FileText, 
  Send, 
  CheckCircle, 
  XCircle, 
  Clock as PendingIcon,
  Plus,
  Edit,
  Trash2,
  AlertCircle,
  Info,
  CalendarDays,
  User,
  Building,
  Mail,
  Phone,
  MapPin,
  ChevronDown,
  ChevronUp,
  Filter,
  Search,
  Download,
  Eye
} from "lucide-react"

export default function LeaveRequest() {
  const [activeTab, setActiveTab] = useState("new")
  const [leaveType, setLeaveType] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [reason, setReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Sample leave requests data
  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      type: "Annual Leave",
      startDate: "2025-01-15",
      endDate: "2025-01-17",
      days: 3,
      reason: "Family vacation to the mountains",
      status: "approved",
      submittedDate: "2025-01-10",
      approvedBy: "Sarah Johnson",
      approvedDate: "2025-01-11",
      comments: "Approved. Enjoy your vacation!"
    },
    {
      id: 2,
      type: "Sick Leave",
      startDate: "2025-01-20",
      endDate: "2025-01-21",
      days: 2,
      reason: "Medical appointment and recovery",
      status: "pending",
      submittedDate: "2025-01-18",
      approvedBy: null,
      approvedDate: null,
      comments: null
    },
    {
      id: 3,
      type: "Personal Leave",
      startDate: "2025-02-05",
      endDate: "2025-02-05",
      days: 1,
      reason: "Personal family matter",
      status: "rejected",
      submittedDate: "2025-01-25",
      approvedBy: "Mike Chen",
      approvedDate: "2025-01-26",
      comments: "Rejected due to high workload during this period."
    }
  ])

  const leaveTypes = [
    { value: "annual", label: "Annual Leave", color: "bg-blue-500", icon: Calendar },
    { value: "sick", label: "Sick Leave", color: "bg-red-500", icon: AlertCircle },
    { value: "personal", label: "Personal Leave", color: "bg-purple-500", icon: User },
    { value: "maternity", label: "Maternity Leave", color: "bg-pink-500", icon: User },
    { value: "paternity", label: "Paternity Leave", color: "bg-indigo-500", icon: User },
    { value: "bereavement", label: "Bereavement Leave", color: "bg-gray-500", icon: User }
  ]

  const calculateDays = () => {
    if (startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      const diffTime = Math.abs(end - start)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
      return diffDays
    }
    return 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const newRequest = {
      id: leaveRequests.length + 1,
      type: leaveType,
      startDate,
      endDate,
      days: calculateDays(),
      reason,
      status: "pending",
      submittedDate: new Date().toISOString().split('T')[0],
      approvedBy: null,
      approvedDate: null,
      comments: null
    }
    
    setLeaveRequests([newRequest, ...leaveRequests])
    setShowSuccess(true)
    setIsSubmitting(false)
    
    // Reset form
    setLeaveType("")
    setStartDate("")
    setEndDate("")
    setReason("")
    
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "approved": return "bg-green-100 text-green-800 border-green-200"
      case "rejected": return "bg-red-100 text-red-800 border-red-200"
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved": return <CheckCircle size={16} />
      case "rejected": return <XCircle size={16} />
      case "pending": return <PendingIcon size={16} />
      default: return <Clock size={16} />
    }
  }

  const filteredRequests = leaveRequests.filter(request => {
    const matchesStatus = filterStatus === "all" || request.status === filterStatus
    const matchesSearch = request.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.reason.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 rounded-2xl p-8 text-white shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Leave Management</h1>
            <p className="text-purple-100 text-lg">Request time off and track your leave applications</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <div className="text-center">
              <div className="text-2xl font-bold">15</div>
              <div className="text-purple-100 text-sm">Days Remaining</div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center space-x-3 animate-in slide-in-from-top-2">
          <CheckCircle className="text-green-600" size={20} />
          <div>
            <h3 className="font-semibold text-green-800">Leave Request Submitted!</h3>
            <p className="text-green-600 text-sm">Your request has been sent for approval.</p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab("new")}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-200 ${
              activeTab === "new"
                ? "text-purple-600 border-b-2 border-purple-600 bg-purple-50 dark:bg-purple-900/20"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            <Plus size={16} className="inline mr-2" />
            New Request
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-200 ${
              activeTab === "history"
                ? "text-purple-600 border-b-2 border-purple-600 bg-purple-50 dark:bg-purple-900/20"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            <FileText size={16} className="inline mr-2" />
            Request History
          </button>
        </div>

        <div className="p-6">
          {activeTab === "new" ? (
            /* New Request Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Leave Type Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Leave Type
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {leaveTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setLeaveType(type.value)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                        leaveType === type.value
                          ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                          : "border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-600"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg ${type.color} flex items-center justify-center`}>
                          <type.icon size={20} className="text-white" />
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">{type.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Start Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    End Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Days Calculation */}
              {calculateDays() > 0 && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CalendarDays className="text-blue-600 dark:text-blue-400" size={20} />
                      <span className="font-semibold text-blue-800 dark:text-blue-200">Total Days</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {calculateDays()} {calculateDays() === 1 ? 'Day' : 'Days'}
                    </div>
                  </div>
                </div>
              )}

              {/* Reason */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Reason for Leave
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                  placeholder="Please provide a detailed reason for your leave request..."
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting || !leaveType || !startDate || !endDate || !reason}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Submit Request</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* Request History */
            <div className="space-y-6">
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search requests..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              {/* Requests List */}
              <div className="space-y-4">
                {filteredRequests.map((request) => (
                  <div
                    key={request.id}
                    className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border border-gray-200 dark:border-gray-600 shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="bg-white dark:bg-gray-700 rounded-xl p-3 shadow-sm">
                            <Calendar size={24} className="text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {request.type}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                              {request.startDate} - {request.endDate} ({request.days} days)
                            </p>
                          </div>
                          <div className={`px-3 py-1 rounded-full border text-sm font-medium flex items-center space-x-1 ${getStatusColor(request.status)}`}>
                            {getStatusIcon(request.status)}
                            <span className="capitalize">{request.status}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white mb-1">Reason</h4>
                            <p className="text-gray-600 dark:text-gray-400">{request.reason}</p>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500 dark:text-gray-400">Submitted:</span>
                              <p className="font-medium text-gray-900 dark:text-white">{request.submittedDate}</p>
                            </div>
                            {request.approvedBy && (
                              <div>
                                <span className="text-gray-500 dark:text-gray-400">Approved by:</span>
                                <p className="font-medium text-gray-900 dark:text-white">{request.approvedBy}</p>
                              </div>
                            )}
                            {request.approvedDate && (
                              <div>
                                <span className="text-gray-500 dark:text-gray-400">Approved on:</span>
                                <p className="font-medium text-gray-900 dark:text-white">{request.approvedDate}</p>
                              </div>
                            )}
                            {request.comments && (
                              <div className="md:col-span-2">
                                <span className="text-gray-500 dark:text-gray-400">Comments:</span>
                                <p className="font-medium text-gray-900 dark:text-white">{request.comments}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 ml-4">
                        <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                          <Eye size={20} />
                        </button>
                        {request.status === "pending" && (
                          <>
                            <button className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                              <Edit size={20} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                              <Trash2 size={20} />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {filteredRequests.length === 0 && (
                  <div className="text-center py-12">
                    <FileText className="mx-auto text-gray-400" size={48} />
                    <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">No requests found</h3>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                      {searchQuery || filterStatus !== "all" 
                        ? "Try adjusting your search or filter criteria."
                        : "You haven't submitted any leave requests yet."
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
