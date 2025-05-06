"use client"

import { useState, useEffect } from "react"
import {
  Search,
  Filter,
  Edit,
  Trash2,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  UserPlus,
  Download,
  Upload,
  RefreshCw,
} from "lucide-react"

export default function Users() {
  // State for users data
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState("name")
  const [sortDirection, setSortDirection] = useState("asc")
  const [filters, setFilters] = useState({
    name: "",
    department: "",
    role: "",
  })
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
    department: "",
    age: "",
    phone: "",
    status: "active",
  })

  // Sample departments and roles for filters and form selects
  const departments = ["Engineering", "Marketing", "Sales", "Finance", "HR", "Product", "Support"]
  const roles = ["Admin", "Manager", "Developer", "Analyst", "Designer", "Coordinator", "Specialist"]
  const statuses = ["active", "inactive", "pending"]

  // Load sample data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const sampleUsers = Array(25)
        .fill()
        .map((_, i) => ({
          id: `USR${1000 + i}`,
          name: [
            "Alex Johnson",
            "Maria Garcia",
            "James Smith",
            "Sarah Williams",
            "Robert Chen",
            "Emily Davis",
            "Michael Brown",
            "Jessica Wilson",
            "David Miller",
            "Jennifer Taylor",
          ][i % 10],
          email: [
            "alex@neuromark.com",
            "maria@neuromark.com",
            "james@neuromark.com",
            "sarah@neuromark.com",
            "robert@neuromark.com",
            "emily@neuromark.com",
            "michael@neuromark.com",
            "jessica@neuromark.com",
            "david@neuromark.com",
            "jennifer@neuromark.com",
          ][i % 10],
          role: roles[i % roles.length],
          department: departments[i % departments.length],
          age: 25 + (i % 20),
          phone: `(${500 + Math.floor(i / 10)}) ${100 + i}-${2000 + i}`,
          status: statuses[i % statuses.length],
          lastActive: new Date(Date.now() - i * 86400000 * (i % 10)).toISOString(),
        }))
      setUsers(sampleUsers)
      setLoading(false)
    }, 1000)
  }, [])

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters({
      ...filters,
      [name]: value,
    })
  }

  // Reset filters
  const resetFilters = () => {
    setFilters({
      name: "",
      department: "",
      role: "",
    })
  }

  // Open modal for creating a new user
  const openCreateModal = () => {
    setSelectedUser(null)
    setFormData({
      id: `USR${1000 + users.length}`,
      name: "",
      email: "",
      role: "",
      department: "",
      age: "",
      phone: "",
      status: "active",
    })
    setIsModalOpen(true)
  }

  // Open modal for editing a user
  const openEditModal = (user) => {
    setSelectedUser(user)
    setFormData({ ...user })
    setIsModalOpen(true)
  }

  // Open delete confirmation modal
  const openDeleteModal = (user) => {
    setSelectedUser(user)
    setIsDeleteModalOpen(true)
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    if (selectedUser) {
      // Edit existing user
      setUsers(users.map((user) => (user.id === selectedUser.id ? formData : user)))
    } else {
      // Create new user
      setUsers([...users, formData])
    }

    setIsModalOpen(false)
  }

  // Handle user deletion
  const handleDelete = () => {
    setUsers(users.filter((user) => user.id !== selectedUser.id))
    setIsDeleteModalOpen(false)
  }

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Apply filters and sorting
  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      (filters.department === "" || user.department === filters.department) &&
      (filters.role === "" || user.role === filters.role)
    )
  })

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1
    if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  // Pagination
  const usersPerPage = 10
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage)
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser)

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold dark:text-white text-gray-800">User Management</h1>
          <p className="text-sm dark:text-gray-400 text-gray-500 mt-1">
            Manage user accounts, permissions, and information
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => openCreateModal()}
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </button>
          <button className="flex items-center px-3 py-2 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 bg-white border border-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </button>
          <button className="flex items-center px-3 py-2 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 bg-white border border-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search users..."
            value={filters.name}
            name="name"
            onChange={handleFilterChange}
            className="w-full pl-10 pr-4 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-700 bg-white border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 dark:text-gray-400 text-gray-500"
            size={18}
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center px-3 py-2 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 bg-white border border-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filter
            <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${isFilterOpen ? "rotate-180" : ""}`} />
          </button>
          <button
            onClick={() => {
              setLoading(true)
              setTimeout(() => setLoading(false), 500)
            }}
            className="flex items-center px-3 py-2 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 bg-white border border-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Advanced filters */}
      {isFilterOpen && (
        <div className="p-4 dark:bg-gray-800 dark:border-gray-700 bg-white border border-gray-200 rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-1">Department</label>
              <select
                name="department"
                value={filters.department}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 dark:bg-gray-700 dark:text-white dark:border-gray-600 bg-white border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-1">Role</label>
              <select
                name="role"
                value={filters.role}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 dark:bg-gray-700 dark:text-white dark:border-gray-600 bg-white border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">All Roles</option>
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={resetFilters}
                className="px-4 py-2 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Users table */}
      <div className="dark:bg-gray-800 dark:border-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y dark:divide-gray-700 divide-gray-200">
            <thead className="dark:bg-gray-700/50 bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium dark:text-gray-300 text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("id")}
                >
                  <div className="flex items-center">
                    ID
                    {sortField === "id" && (
                      <span className="ml-1">
                        {sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium dark:text-gray-300 text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center">
                    Name
                    {sortField === "name" && (
                      <span className="ml-1">
                        {sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium dark:text-gray-300 text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("role")}
                >
                  <div className="flex items-center">
                    Role
                    {sortField === "role" && (
                      <span className="ml-1">
                        {sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium dark:text-gray-300 text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("department")}
                >
                  <div className="flex items-center">
                    Department
                    {sortField === "department" && (
                      <span className="ml-1">
                        {sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium dark:text-gray-300 text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center">
                    Status
                    {sortField === "status" && (
                      <span className="ml-1">
                        {sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium dark:text-gray-300 text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("lastActive")}
                >
                  <div className="flex items-center">
                    Last Active
                    {sortField === "lastActive" && (
                      <span className="ml-1">
                        {sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </span>
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium dark:text-gray-300 text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="dark:divide-gray-700 divide-y divide-gray-200">
              {loading ? (
                // Loading state
                Array(5)
                  .fill()
                  .map((_, index) => (
                    <tr key={index} className="dark:bg-gray-800 bg-white">
                      {Array(7)
                        .fill()
                        .map((_, cellIndex) => (
                          <td key={cellIndex} className="px-6 py-4 whitespace-nowrap">
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                          </td>
                        ))}
                    </tr>
                  ))
              ) : currentUsers.length > 0 ? (
                currentUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="dark:bg-gray-800 bg-white hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-gray-300 text-gray-900">{user.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                          <span className="text-purple-600 dark:text-purple-400 font-medium text-sm">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium dark:text-white text-gray-900">{user.name}</div>
                          <div className="text-sm dark:text-gray-400 text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-gray-300 text-gray-500">
                      {user.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-gray-300 text-gray-500">
                      {user.department}
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-gray-300 text-gray-500">
                      {formatDate(user.lastActive)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => openEditModal(user)}
                          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => openDeleteModal(user)}
                          className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                        >
                          <Trash2 size={16} />
                        </button>
                        <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-sm dark:text-gray-400 text-gray-500">
                    No users found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-3 dark:bg-gray-800 bg-white border-t dark:border-gray-700 border-gray-200 flex items-center justify-between">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md ${
                currentPage === 1
                  ? "dark:text-gray-500 text-gray-300 dark:bg-gray-700 bg-gray-100"
                  : "dark:text-gray-300 text-gray-700 dark:bg-gray-800 bg-white hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md ${
                currentPage === totalPages
                  ? "dark:text-gray-500 text-gray-300 dark:bg-gray-700 bg-gray-100"
                  : "dark:text-gray-300 text-gray-700 dark:bg-gray-800 bg-white hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm dark:text-gray-400 text-gray-700">
                Showing <span className="font-medium">{indexOfFirstUser + 1}</span> to{" "}
                <span className="font-medium">{Math.min(indexOfLastUser, sortedUsers.length)}</span> of{" "}
                <span className="font-medium">{sortedUsers.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 text-sm font-medium ${
                    currentPage === 1
                      ? "dark:text-gray-500 text-gray-300 dark:bg-gray-700 bg-gray-100"
                      : "dark:text-gray-300 text-gray-700 dark:bg-gray-800 bg-white hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <span className="sr-only">Previous</span>
                  <ChevronDown className="h-5 w-5 rotate-90" aria-hidden="true" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      currentPage === page
                        ? "z-10 bg-purple-50 dark:bg-purple-900/30 border-purple-500 dark:border-purple-500 text-purple-600 dark:text-purple-400"
                        : "dark:text-gray-300 text-gray-700 dark:bg-gray-800 bg-white border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 text-sm font-medium ${
                    currentPage === totalPages
                      ? "dark:text-gray-500 text-gray-300 dark:bg-gray-700 bg-gray-100"
                      : "dark:text-gray-300 text-gray-700 dark:bg-gray-800 bg-white hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <span className="sr-only">Next</span>
                  <ChevronDown className="h-5 w-5 -rotate-90" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Create/Edit User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom dark:bg-gray-800 bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="dark:bg-gray-800 bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium dark:text-white text-gray-900">
                      {selectedUser ? "Edit User" : "Create New User"}
                    </h3>
                    <div className="mt-4">
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium dark:text-gray-300 text-gray-700"
                            >
                              Full Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              id="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                              className="mt-1 block w-full px-3 py-2 dark:bg-gray-700 dark:text-white dark:border-gray-600 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium dark:text-gray-300 text-gray-700"
                            >
                              Email Address
                            </label>
                            <input
                              type="email"
                              name="email"
                              id="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              className="mt-1 block w-full px-3 py-2 dark:bg-gray-700 dark:text-white dark:border-gray-600 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label
                              htmlFor="role"
                              className="block text-sm font-medium dark:text-gray-300 text-gray-700"
                            >
                              Role
                            </label>
                            <select
                              name="role"
                              id="role"
                              value={formData.role}
                              onChange={handleInputChange}
                              required
                              className="mt-1 block w-full px-3 py-2 dark:bg-gray-700 dark:text-white dark:border-gray-600 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                            >
                              <option value="">Select Role</option>
                              {roles.map((role) => (
                                <option key={role} value={role}>
                                  {role}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label
                              htmlFor="department"
                              className="block text-sm font-medium dark:text-gray-300 text-gray-700"
                            >
                              Department
                            </label>
                            <select
                              name="department"
                              id="department"
                              value={formData.department}
                              onChange={handleInputChange}
                              required
                              className="mt-1 block w-full px-3 py-2 dark:bg-gray-700 dark:text-white dark:border-gray-600 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                            >
                              <option value="">Select Department</option>
                              {departments.map((dept) => (
                                <option key={dept} value={dept}>
                                  {dept}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="age" className="block text-sm font-medium dark:text-gray-300 text-gray-700">
                              Age
                            </label>
                            <input
                              type="number"
                              name="age"
                              id="age"
                              value={formData.age}
                              onChange={handleInputChange}
                              required
                              className="mt-1 block w-full px-3 py-2 dark:bg-gray-700 dark:text-white dark:border-gray-600 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="phone"
                              className="block text-sm font-medium dark:text-gray-300 text-gray-700"
                            >
                              Phone Number
                            </label>
                            <input
                              type="text"
                              name="phone"
                              id="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              required
                              className="mt-1 block w-full px-3 py-2 dark:bg-gray-700 dark:text-white dark:border-gray-600 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="status"
                            className="block text-sm font-medium dark:text-gray-300 text-gray-700"
                          >
                            Status
                          </label>
                          <select
                            name="status"
                            id="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 dark:bg-gray-700 dark:text-white dark:border-gray-600 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                          >
                            {statuses.map((status) => (
                              <option key={status} value={status}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                              </option>
                            ))}
                          </select>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dark:bg-gray-800 bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t dark:border-gray-700 border-gray-200">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  {selectedUser ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border dark:border-gray-600 border-gray-300 shadow-sm px-4 py-2 dark:bg-gray-700 bg-white text-base font-medium dark:text-gray-300 text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom dark:bg-gray-800 bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="dark:bg-gray-800 bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 sm:mx-0 sm:h-10 sm:w-10">
                    <Trash2 className="h-6 w-6 text-red-600 dark:text-red-400" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium dark:text-white text-gray-900">Delete User</h3>
                    <div className="mt-2">
                      <p className="text-sm dark:text-gray-300 text-gray-500">
                        Are you sure you want to delete {selectedUser?.name}? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dark:bg-gray-800 bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t dark:border-gray-700 border-gray-200">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border dark:border-gray-600 border-gray-300 shadow-sm px-4 py-2 dark:bg-gray-700 bg-white text-base font-medium dark:text-gray-300 text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
