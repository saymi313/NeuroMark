"use client"

import { useState, useEffect, useRef } from "react"
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  UserPlus,
  AlertCircle,
  Check,
  X,
  Calendar,
} from "lucide-react"

export default function Users() {
  // State for users data
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [loading, setLoading] = useState(true)

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage] = useState(10)

  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "ascending" })

  // State for slide panels and modals
  const [isAddUserPanelOpen, setIsAddUserPanelOpen] = useState(false)
  const [isEditUserPanelOpen, setIsEditUserPanelOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [userMenuOpen, setUserMenuOpen] = useState(null)

  // State for notifications
  const [notification, setNotification] = useState(null)

  // Refs for panels and menus
  const panelRef = useRef(null)
  const menuRef = useRef(null)
  const modalRef = useRef(null)

  // Form state for add/edit user
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
    status: "active",
    phone: "",
    joinDate: "",
    lastActive: "",
    avatar: "",
  })

  // Mock data for initial users
  useEffect(() => {
    const timer = setTimeout(() => {
      const mockUsers = [
        {
          id: 1,
          name: "Alex Johnson",
          email: "alex.johnson@example.com",
          role: "admin",
          status: "active",
          phone: "+1 (555) 123-4567",
          joinDate: "2023-01-15",
          lastActive: "2023-05-06T14:30:00",
          avatar: "AJ",
          avatarColor: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
        },
        {
          id: 2,
          name: "Maria Garcia",
          email: "maria.garcia@example.com",
          role: "user",
          status: "active",
          phone: "+1 (555) 234-5678",
          joinDate: "2023-02-20",
          lastActive: "2023-05-05T09:15:00",
          avatar: "MG",
          avatarColor: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
        },
        {
          id: 3,
          name: "Robert Chen",
          email: "robert.chen@example.com",
          role: "manager",
          status: "active",
          phone: "+1 (555) 345-6789",
          joinDate: "2023-01-05",
          lastActive: "2023-05-06T11:45:00",
          avatar: "RC",
          avatarColor: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
        },
        {
          id: 4,
          name: "Sarah Williams",
          email: "sarah.williams@example.com",
          role: "user",
          status: "inactive",
          phone: "+1 (555) 456-7890",
          joinDate: "2023-03-10",
          lastActive: "2023-04-20T16:20:00",
          avatar: "SW",
          avatarColor: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
        },
        {
          id: 5,
          name: "James Miller",
          email: "james.miller@example.com",
          role: "user",
          status: "active",
          phone: "+1 (555) 567-8901",
          joinDate: "2023-02-15",
          lastActive: "2023-05-04T13:10:00",
          avatar: "JM",
          avatarColor: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
        },
        {
          id: 6,
          name: "Emily Davis",
          email: "emily.davis@example.com",
          role: "manager",
          status: "active",
          phone: "+1 (555) 678-9012",
          joinDate: "2023-01-25",
          lastActive: "2023-05-06T10:30:00",
          avatar: "ED",
          avatarColor: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400",
        },
        {
          id: 7,
          name: "Michael Brown",
          email: "michael.brown@example.com",
          role: "user",
          status: "pending",
          phone: "+1 (555) 789-0123",
          joinDate: "2023-04-05",
          lastActive: "2023-05-01T15:45:00",
          avatar: "MB",
          avatarColor: "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400",
        },
        {
          id: 8,
          name: "Jessica Taylor",
          email: "jessica.taylor@example.com",
          role: "user",
          status: "active",
          phone: "+1 (555) 890-1234",
          joinDate: "2023-03-20",
          lastActive: "2023-05-05T17:20:00",
          avatar: "JT",
          avatarColor: "bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400",
        },
        {
          id: 9,
          name: "David Wilson",
          email: "david.wilson@example.com",
          role: "admin",
          status: "active",
          phone: "+1 (555) 901-2345",
          joinDate: "2023-01-10",
          lastActive: "2023-05-06T09:00:00",
          avatar: "DW",
          avatarColor: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
        },
        {
          id: 10,
          name: "Sophia Martinez",
          email: "sophia.martinez@example.com",
          role: "user",
          status: "inactive",
          phone: "+1 (555) 012-3456",
          joinDate: "2023-02-28",
          lastActive: "2023-04-15T14:10:00",
          avatar: "SM",
          avatarColor: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400",
        },
        {
          id: 11,
          name: "Daniel Lee",
          email: "daniel.lee@example.com",
          role: "manager",
          status: "active",
          phone: "+1 (555) 123-4567",
          joinDate: "2023-03-15",
          lastActive: "2023-05-05T11:30:00",
          avatar: "DL",
          avatarColor: "bg-lime-100 text-lime-600 dark:bg-lime-900/30 dark:text-lime-400",
        },
        {
          id: 12,
          name: "Olivia Johnson",
          email: "olivia.johnson@example.com",
          role: "user",
          status: "pending",
          phone: "+1 (555) 234-5678",
          joinDate: "2023-04-10",
          lastActive: "2023-04-25T16:45:00",
          avatar: "OJ",
          avatarColor: "bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400",
        },
      ]

      setUsers(mockUsers)
      setFilteredUsers(mockUsers)
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  // Apply filters and search
  useEffect(() => {
    let result = [...users]

    // Apply search term
    if (searchTerm) {
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((user) => user.status === statusFilter)
    }

    // Apply role filter
    if (roleFilter !== "all") {
      result = result.filter((user) => user.role === roleFilter)
    }

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1
        }
        return 0
      })
    }

    setFilteredUsers(result)
    // Only reset to first page when filters change if we're not on the first page already
    if (currentPage !== 1 && result.length <= (currentPage - 1) * usersPerPage) {
      setCurrentPage(1)
    }
  }, [users, searchTerm, statusFilter, roleFilter, sortConfig, currentPage, usersPerPage])

  // Handle click outside of panel, modal or menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      // For panels, only close if clicking outside and not on the open button
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target) &&
        !event.target.closest('[data-panel-trigger="true"]')
      ) {
        closeAllPanels()
      }

      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsDeleteModalOpen(false)
        setCurrentUser(null)
      }

      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setUserMenuOpen(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Auto-dismiss notifications
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  // Close all panels and modals
  const closeAllPanels = () => {
    setIsAddUserPanelOpen(false)
    setIsEditUserPanelOpen(false)
    setIsDeleteModalOpen(false)
    setCurrentUser(null)
    resetForm()
  }

  // Reset form data
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      role: "user",
      status: "active",
      phone: "",
      joinDate: "",
      lastActive: "",
      avatar: "",
    })
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Open add user panel
  const openAddUserPanel = () => {
    resetForm()
    // Set default join date to today
    const today = new Date().toISOString().split("T")[0]
    setFormData((prev) => ({
      ...prev,
      joinDate: today,
    }))
    setIsAddUserPanelOpen(true)
    setIsEditUserPanelOpen(false)
  }

  // Open edit user panel
  const openEditUserPanel = (user) => {
    setCurrentUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      phone: user.phone || "",
      joinDate: user.joinDate,
      lastActive: user.lastActive ? new Date(user.lastActive).toISOString().split("T")[0] : "",
      avatar: user.avatar,
    })
    setIsEditUserPanelOpen(true)
    setIsAddUserPanelOpen(false)
    setUserMenuOpen(null)
  }

  // Open delete user modal
  const openDeleteModal = (user) => {
    setCurrentUser(user)
    setIsDeleteModalOpen(true)
    setUserMenuOpen(null)
  }

  // Toggle user menu
  const toggleUserMenu = (userId) => {
    setUserMenuOpen(userMenuOpen === userId ? null : userId)
  }

  // Show notification
  const showNotification = (type, message) => {
    setNotification({ type, message })
  }

  // Add new user
  const addUser = (e) => {
    e.preventDefault()

    try {
      // Validate form data
      if (!formData.name || !formData.email || !formData.joinDate) {
        throw new Error("Please fill in all required fields")
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        throw new Error("Please enter a valid email address")
      }

      // Generate initials for avatar
      const nameParts = formData.name.split(" ")
      const initials = nameParts.length > 1 ? `${nameParts[0][0]}${nameParts[1][0]}` : nameParts[0].substring(0, 2)

      // Generate random color for avatar
      const colors = [
        "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
        "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
        "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
        "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
        "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
        "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400",
        "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400",
        "bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400",
      ]
      const randomColor = colors[Math.floor(Math.random() * colors.length)]

      const newUser = {
        id: users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        status: formData.status,
        phone: formData.phone || "",
        joinDate: formData.joinDate,
        lastActive: formData.lastActive ? new Date(formData.lastActive).toISOString() : new Date().toISOString(),
        avatar: initials.toUpperCase(),
        avatarColor: randomColor,
      }

      setUsers([...users, newUser])
      closeAllPanels()
      showNotification("success", `User ${newUser.name} has been added successfully`)
    } catch (error) {
      showNotification("error", error.message)
    }
  }

  // Update existing user
  const updateUser = (e) => {
    e.preventDefault()

    try {
      // Validate form data
      if (!formData.name || !formData.email || !formData.joinDate) {
        throw new Error("Please fill in all required fields")
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        throw new Error("Please enter a valid email address")
      }

      const updatedUsers = users.map((user) => {
        if (user.id === currentUser.id) {
          return {
            ...user,
            name: formData.name,
            email: formData.email,
            role: formData.role,
            status: formData.status,
            phone: formData.phone || "",
            joinDate: formData.joinDate,
            lastActive: formData.lastActive ? new Date(formData.lastActive).toISOString() : user.lastActive,
          }
        }
        return user
      })

      setUsers(updatedUsers)
      closeAllPanels()
      showNotification("success", `User ${formData.name} has been updated successfully`)
    } catch (error) {
      showNotification("error", error.message)
    }
  }

  // Delete user
  const deleteUser = () => {
    try {
      if (!currentUser) {
        throw new Error("No user selected for deletion")
      }

      const updatedUsers = users.filter((user) => user.id !== currentUser.id)
      setUsers(updatedUsers)
      setFilteredUsers(updatedUsers) // Also update filteredUsers to immediately reflect changes
      closeAllPanels()
      showNotification("success", `User ${currentUser.name} has been deleted successfully`)
    } catch (error) {
      showNotification("error", error.message)
    }
  }

  // Handle sorting
  const requestSort = (key) => {
    let direction = "ascending"
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  // Get current users for pagination
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A"

    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  // Format time ago
  const timeAgo = (dateString) => {
    if (!dateString) return "Never"

    const date = new Date(dateString)
    const now = new Date()
    const seconds = Math.floor((now - date) / 1000)

    let interval = Math.floor(seconds / 31536000)
    if (interval >= 1) {
      return interval === 1 ? "1 year ago" : `${interval} years ago`
    }

    interval = Math.floor(seconds / 2592000)
    if (interval >= 1) {
      return interval === 1 ? "1 month ago" : `${interval} months ago`
    }

    interval = Math.floor(seconds / 86400)
    if (interval >= 1) {
      return interval === 1 ? "1 day ago" : `${interval} days ago`
    }

    interval = Math.floor(seconds / 3600)
    if (interval >= 1) {
      return interval === 1 ? "1 hour ago" : `${interval} hours ago`
    }

    interval = Math.floor(seconds / 60)
    if (interval >= 1) {
      return interval === 1 ? "1 minute ago" : `${interval} minutes ago`
    }

    return "Just now"
  }

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
      case "inactive":
        return "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
      case "pending":
        return "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
    }
  }

  // Get role badge class
  const getRoleBadgeClass = (role) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
      case "manager":
        return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
      case "user":
        return "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
    }
  }

  return (
    <div className="space-y-6 relative">
      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg flex items-center ${
            notification.type === "success"
              ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
              : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
          }`}
        >
          {notification.type === "success" ? <Check className="w-5 h-5 mr-3" /> : <X className="w-5 h-5 mr-3" />}
          <p>{notification.message}</p>
          <button
            onClick={() => setNotification(null)}
            className="ml-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold dark:text-white text-gray-800">Users Management</h1>
          <p className="text-sm dark:text-gray-400 text-gray-500 mt-1">
            Manage your platform users, their roles and permissions.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="relative flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 w-full rounded-md text-sm dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:border-gray-700 bg-white text-gray-800 placeholder-gray-500 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          </div>
          <button
            onClick={openAddUserPanel}
            data-panel-trigger="true"
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center"
          >
            <Plus size={16} className="mr-1.5" />
            Add User
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-3 pr-8 py-2 rounded-md text-sm appearance-none dark:bg-gray-800 dark:text-white dark:border-gray-700 bg-white text-gray-800 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400"
            />
          </div>

          <div className="relative">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="pl-3 pr-8 py-2 rounded-md text-sm appearance-none dark:bg-gray-800 dark:text-white dark:border-gray-700 bg-white text-gray-800 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="user">User</option>
            </select>
            <ChevronDown
              size={14}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400"
            />
          </div>

          <button
            onClick={() => {
              setSearchTerm("")
              setStatusFilter("all")
              setRoleFilter("all")
              setSortConfig({ key: "name", direction: "ascending" })
            }}
            className="px-3 py-2 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 bg-white border border-gray-200 rounded-md text-sm text-gray-700 flex items-center hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <RefreshCw size={14} className="mr-1.5" />
            Reset
          </button>
        </div>

        <div className="text-sm dark:text-gray-400 text-gray-500">
          Showing {filteredUsers.length > 0 ? indexOfFirstUser + 1 : 0} to{" "}
          {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} users
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto rounded-lg border dark:border-gray-700 border-gray-200">
        <table className="min-w-full divide-y dark:divide-gray-700 divide-gray-200">
          <thead className="dark:bg-gray-800 bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("name")}
              >
                <div className="flex items-center">
                  <span>User</span>
                  {sortConfig.key === "name" && (
                    <ChevronDown
                      size={14}
                      className={`ml-1 transform ${sortConfig.direction === "ascending" ? "" : "rotate-180"}`}
                    />
                  )}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("status")}
              >
                <div className="flex items-center">
                  <span>Status</span>
                  {sortConfig.key === "status" && (
                    <ChevronDown
                      size={14}
                      className={`ml-1 transform ${sortConfig.direction === "ascending" ? "" : "rotate-180"}`}
                    />
                  )}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("role")}
              >
                <div className="flex items-center">
                  <span>Role</span>
                  {sortConfig.key === "role" && (
                    <ChevronDown
                      size={14}
                      className={`ml-1 transform ${sortConfig.direction === "ascending" ? "" : "rotate-180"}`}
                    />
                  )}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("joinDate")}
              >
                <div className="flex items-center">
                  <span>Join Date</span>
                  {sortConfig.key === "joinDate" && (
                    <ChevronDown
                      size={14}
                      className={`ml-1 transform ${sortConfig.direction === "ascending" ? "" : "rotate-180"}`}
                    />
                  )}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium dark:text-gray-400 text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("lastActive")}
              >
                <div className="flex items-center">
                  <span>Last Active</span>
                  {sortConfig.key === "lastActive" && (
                    <ChevronDown
                      size={14}
                      className={`ml-1 transform ${sortConfig.direction === "ascending" ? "" : "rotate-180"}`}
                    />
                  )}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium dark:text-gray-400 text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="dark:bg-gray-800 bg-white divide-y dark:divide-gray-700 divide-gray-200">
            {loading ? (
              // Loading state
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="animate-pulse">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                      <div className="ml-4">
                        <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="h-3 w-48 bg-gray-200 dark:bg-gray-700 rounded mt-2"></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full ml-auto"></div>
                  </td>
                </tr>
              ))
            ) : currentUsers.length === 0 ? (
              // No results
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <Search size={48} className="text-gray-300 dark:text-gray-600 mb-4" />
                    <h3 className="text-lg font-medium dark:text-white text-gray-800 mb-1">No users found</h3>
                    <p className="text-sm dark:text-gray-400 text-gray-500">
                      Try adjusting your search or filter to find what you're looking for.
                    </p>
                    <button
                      onClick={() => {
                        setSearchTerm("")
                        setStatusFilter("all")
                        setRoleFilter("all")
                      }}
                      className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                    >
                      Reset Filters
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              // User rows
              currentUsers.map((user) => (
                <tr key={user.id} className="dark:hover:bg-gray-700/50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-full ${user.avatarColor} flex items-center justify-center font-semibold`}
                      >
                        {user.avatar}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium dark:text-white text-gray-800">{user.name}</div>
                        <div className="text-sm dark:text-gray-400 text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                        user.status,
                      )}`}
                    >
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeClass(
                        user.role,
                      )}`}
                    >
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm dark:text-gray-300 text-gray-700">{formatDate(user.joinDate)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm dark:text-gray-300 text-gray-700">{timeAgo(user.lastActive)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="relative">
                      <button
                        onClick={() => toggleUserMenu(user.id)}
                        className="p-1.5 rounded-md dark:hover:bg-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <MoreHorizontal size={16} className="dark:text-gray-400 text-gray-500" />
                      </button>

                      {userMenuOpen === user.id && (
                        <div
                          ref={menuRef}
                          className="absolute right-0 mt-2 w-48 rounded-md shadow-lg overflow-hidden z-10 dark:bg-gray-800 dark:border-gray-700 bg-white border border-gray-200"
                        >
                          <div className="py-1">
                            <button
                              onClick={() => openEditUserPanel(user)}
                              className="flex w-full items-center px-4 py-2 text-sm dark:hover:bg-gray-700 dark:text-gray-300 hover:bg-gray-100 text-gray-700"
                            >
                              <Edit size={16} className="mr-2" />
                              Edit User
                            </button>
                            <button
                              onClick={() => openDeleteModal(user)}
                              className="flex w-full items-center px-4 py-2 text-sm dark:hover:bg-gray-700 dark:text-red-400 hover:bg-gray-100 text-red-600"
                            >
                              <Trash2 size={16} className="mr-2" />
                              Delete User
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredUsers.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm dark:text-gray-400 text-gray-500">
            Page {currentPage} of {Math.ceil(filteredUsers.length / usersPerPage)}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-md ${
                currentPage === 1
                  ? "dark:bg-gray-800 dark:text-gray-600 bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 bg-white text-gray-700 hover:bg-gray-100"
              } border dark:border-gray-700 border-gray-200`}
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from({ length: Math.min(5, Math.ceil(filteredUsers.length / usersPerPage)) }).map((_, index) => {
              // Calculate page numbers to show (centered around current page)
              const totalPages = Math.ceil(filteredUsers.length / usersPerPage)
              let startPage = Math.max(1, currentPage - 2)
              const endPage = Math.min(startPage + 4, totalPages)

              if (endPage - startPage < 4) {
                startPage = Math.max(1, endPage - 4)
              }

              const pageNumber = startPage + index

              if (pageNumber <= totalPages) {
                return (
                  <button
                    key={pageNumber}
                    onClick={() => paginate(pageNumber)}
                    className={`w-8 h-8 rounded-md ${
                      currentPage === pageNumber
                        ? "bg-purple-600 text-white"
                        : "dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 bg-white text-gray-700 hover:bg-gray-100 border dark:border-gray-700 border-gray-200"
                    }`}
                  >
                    {pageNumber}
                  </button>
                )
              }
              return null
            })}

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(filteredUsers.length / usersPerPage)}
              className={`p-2 rounded-md ${
                currentPage === Math.ceil(filteredUsers.length / usersPerPage)
                  ? "dark:bg-gray-800 dark:text-gray-600 bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 bg-white text-gray-700 hover:bg-gray-100"
              } border dark:border-gray-700 border-gray-200`}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Add User Slide Panel */}
      <div
        className={`fixed inset-y-0 right-0 z-40 w-full sm:w-[500px] bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out ${
          isAddUserPanelOpen ? "translate-x-0" : "translate-x-full"
        }`}
        ref={panelRef}
      >
        <div className="h-full flex flex-col">
          <div className="px-6 py-4 border-b dark:border-gray-700 border-gray-200 flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3">
                <UserPlus className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium dark:text-white text-gray-900">Add New User</h3>
                <p className="text-sm dark:text-gray-400 text-gray-500">
                  Fill in the details below to add a new user to the platform.
                </p>
              </div>
            </div>
            <button onClick={closeAllPanels} className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
              <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <form onSubmit={addUser} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium dark:text-gray-300 text-gray-700">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium dark:text-gray-300 text-gray-700">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                    placeholder="Enter email address"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium dark:text-gray-300 text-gray-700">
                      Role <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="role"
                      id="role"
                      required
                      value={formData.role}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                    >
                      <option value="user">User</option>
                      <option value="manager">Manager</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="status" className="block text-sm font-medium dark:text-gray-300 text-gray-700">
                      Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="status"
                      id="status"
                      required
                      value={formData.status}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium dark:text-gray-300 text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label htmlFor="joinDate" className="block text-sm font-medium dark:text-gray-300 text-gray-700">
                    Join Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative mt-1">
                    <input
                      type="date"
                      name="joinDate"
                      id="joinDate"
                      required
                      value={formData.joinDate}
                      onChange={handleInputChange}
                      className="block w-full rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm pr-10"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="px-6 py-4 border-t dark:border-gray-700 border-gray-200 flex justify-end space-x-3">
            <button
              type="button"
              onClick={closeAllPanels}
              className="px-4 py-2 border dark:border-gray-600 border-gray-300 rounded-md shadow-sm text-sm font-medium dark:text-gray-300 text-gray-700 dark:bg-gray-700 bg-white hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={addUser}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Add User
            </button>
          </div>
        </div>
      </div>

      {/* Edit User Slide Panel */}
      {currentUser && (
        <div
          className={`fixed inset-y-0 right-0 z-40 w-full sm:w-[500px] bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out ${
            isEditUserPanelOpen ? "translate-x-0" : "translate-x-full"
          }`}
          ref={panelRef}
        >
          <div className="h-full flex flex-col">
            <div className="px-6 py-4 border-b dark:border-gray-700 border-gray-200 flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                  <Edit className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium dark:text-white text-gray-900">Edit User</h3>
                  <p className="text-sm dark:text-gray-400 text-gray-500">Update the user information below.</p>
                </div>
              </div>
              <button onClick={closeAllPanels} className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <form onSubmit={updateUser} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="edit-name" className="block text-sm font-medium dark:text-gray-300 text-gray-700">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="edit-name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                      placeholder="Enter full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="edit-email" className="block text-sm font-medium dark:text-gray-300 text-gray-700">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="edit-email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                      placeholder="Enter email address"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="edit-role" className="block text-sm font-medium dark:text-gray-300 text-gray-700">
                        Role <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="role"
                        id="edit-role"
                        required
                        value={formData.role}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                      >
                        <option value="user">User</option>
                        <option value="manager">Manager</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="edit-status"
                        className="block text-sm font-medium dark:text-gray-300 text-gray-700"
                      >
                        Status <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="status"
                        id="edit-status"
                        required
                        value={formData.status}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="pending">Pending</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="edit-phone" className="block text-sm font-medium dark:text-gray-300 text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      id="edit-phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="edit-joinDate"
                      className="block text-sm font-medium dark:text-gray-300 text-gray-700"
                    >
                      Join Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative mt-1">
                      <input
                        type="date"
                        name="joinDate"
                        id="edit-joinDate"
                        required
                        value={formData.joinDate}
                        onChange={handleInputChange}
                        className="block w-full rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm pr-10"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="px-6 py-4 border-t dark:border-gray-700 border-gray-200 flex justify-end space-x-3">
              <button
                type="button"
                onClick={closeAllPanels}
                className="px-4 py-2 border dark:border-gray-600 border-gray-300 rounded-md shadow-sm text-sm font-medium dark:text-gray-300 text-gray-700 dark:bg-gray-700 bg-white hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={updateUser}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete User Modal */}
      {isDeleteModalOpen && currentUser && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
            </div>

            <div
              ref={modalRef}
              className="inline-block align-bottom dark:bg-gray-800 bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            >
              <div className="dark:bg-gray-800 bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 sm:mx-0 sm:h-10 sm:w-10">
                    <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium dark:text-white text-gray-900">Delete User</h3>
                    <div className="mt-2">
                      <p className="text-sm dark:text-gray-400 text-gray-500">
                        Are you sure you want to delete this user? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 rounded-md dark:bg-gray-700 bg-gray-50">
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full ${currentUser.avatarColor} flex items-center justify-center font-semibold`}
                    >
                      {currentUser.avatar}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium dark:text-white text-gray-800">{currentUser.name}</p>
                      <p className="text-sm dark:text-gray-400 text-gray-500">{currentUser.email}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="button"
                    onClick={deleteUser}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:col-start-2 sm:text-sm"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={closeAllPanels}
                    className="mt-3 w-full inline-flex justify-center rounded-md border dark:border-gray-600 border-gray-300 shadow-sm px-4 py-2 dark:bg-gray-700 bg-white text-base font-medium dark:text-gray-300 text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
