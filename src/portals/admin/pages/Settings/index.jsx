"use client"

import { useState, useRef, useEffect } from "react"
import {
  User,
  Bell,
  Shield,
  Moon,
  Sun,
  HelpCircle,
  Save,
  X,
  Check,
  Upload,
  LogOut,
  Trash2,
  Lock,
  Mail,
  Eye,
  EyeOff,
} from "lucide-react"

export default function Settings() {
  // State for active tab
  const [activeTab, setActiveTab] = useState("profile")

  // State for form data
  const [profileData, setProfileData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    bio: "Senior Product Manager with 5+ years of experience in SaaS products.",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    avatar: null,
    avatarUrl: "/placeholder.svg?height=200&width=200",
  })

  // State for notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true,
    marketingEmails: false,
    newFeatures: true,
    securityAlerts: true,
  })

  // State for security settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    passwordLastChanged: "2023-03-15",
    sessionTimeout: "30",
    loginAlerts: true,
  })

  // State for appearance settings
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: "system",
    compactMode: false,
    fontSize: "medium",
    language: "english",
  })

  // State for password change
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // State for showing/hiding passwords
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  // State for notifications
  const [notification, setNotification] = useState(null)

  // Refs
  const fileInputRef = useRef(null)

  // Auto-dismiss notifications
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  // Handle profile form changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileData({
      ...profileData,
      [name]: value,
    })
  }

  // Handle notification toggle changes
  const handleNotificationToggle = (setting) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting],
    })
  }

  // Handle security toggle changes
  const handleSecurityToggle = (setting) => {
    setSecuritySettings({
      ...securitySettings,
      [setting]: !securitySettings[setting],
    })
  }

  // Handle appearance changes
  const handleAppearanceChange = (e) => {
    const { name, value } = e.target
    setAppearanceSettings({
      ...appearanceSettings,
      [name]: value,
    })
  }

  // Handle appearance toggle changes
  const handleAppearanceToggle = (setting) => {
    setAppearanceSettings({
      ...appearanceSettings,
      [setting]: !appearanceSettings[setting],
    })
  }

  // Handle password change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData({
      ...passwordData,
      [name]: value,
    })
  }

  // Toggle password visibility
  const togglePasswordVisibility = (field) => {
    setShowPasswords({
      ...showPasswords,
      [field]: !showPasswords[field],
    })
  }

  // Handle avatar upload
  const handleAvatarUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileData({
          ...profileData,
          avatar: file,
          avatarUrl: e.target.result,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current.click()
  }

  // Save profile changes
  const saveProfileChanges = () => {
    // Here you would typically send the data to your API
    setNotification({
      type: "success",
      message: "Profile settings saved successfully",
    })
  }

  // Save notification settings
  const saveNotificationSettings = () => {
    // Here you would typically send the data to your API
    setNotification({
      type: "success",
      message: "Notification preferences saved successfully",
    })
  }

  // Save security settings
  const saveSecuritySettings = () => {
    // Here you would typically send the data to your API
    setNotification({
      type: "success",
      message: "Security settings saved successfully",
    })
  }

  // Save appearance settings
  const saveAppearanceSettings = () => {
    // Here you would typically send the data to your API
    setNotification({
      type: "success",
      message: "Appearance settings saved successfully",
    })
  }

  // Change password
  const changePassword = (e) => {
    e.preventDefault()

    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setNotification({
        type: "error",
        message: "New passwords do not match",
      })
      return
    }

    if (passwordData.newPassword.length < 8) {
      setNotification({
        type: "error",
        message: "Password must be at least 8 characters long",
      })
      return
    }

    // Here you would typically send the data to your API
    setNotification({
      type: "success",
      message: "Password changed successfully",
    })

    // Reset password fields
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
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
          <h1 className="text-2xl font-bold dark:text-white text-gray-800">Settings</h1>
          <p className="text-sm dark:text-gray-400 text-gray-500 mt-1">Manage your account settings and preferences</p>
        </div>
      </div>

      {/* Settings Layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 border-gray-200 overflow-hidden">
            <nav className="flex flex-col">
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex items-center px-4 py-3 text-sm ${
                  activeTab === "profile"
                    ? "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 font-medium border-l-2 border-purple-600 dark:border-purple-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                }`}
              >
                <User size={18} className="mr-3" />
                Profile
              </button>
              <button
                onClick={() => setActiveTab("notifications")}
                className={`flex items-center px-4 py-3 text-sm ${
                  activeTab === "notifications"
                    ? "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 font-medium border-l-2 border-purple-600 dark:border-purple-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                }`}
              >
                <Bell size={18} className="mr-3" />
                Notifications
              </button>
              <button
                onClick={() => setActiveTab("security")}
                className={`flex items-center px-4 py-3 text-sm ${
                  activeTab === "security"
                    ? "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 font-medium border-l-2 border-purple-600 dark:border-purple-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                }`}
              >
                <Shield size={18} className="mr-3" />
                Security
              </button>
              <button
                onClick={() => setActiveTab("appearance")}
                className={`flex items-center px-4 py-3 text-sm ${
                  activeTab === "appearance"
                    ? "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 font-medium border-l-2 border-purple-600 dark:border-purple-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                }`}
              >
                <Moon size={18} className="mr-3" />
                Appearance
              </button>
            </nav>

            <div className="border-t dark:border-gray-700 border-gray-200 p-4">
              <div className="space-y-4">
                <button className="flex items-center w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-md">
                  <HelpCircle size={18} className="mr-3 text-gray-500 dark:text-gray-400" />
                  Help & Support
                </button>
                <button className="flex items-center w-full px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md">
                  <LogOut size={18} className="mr-3" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 border-gray-200 overflow-hidden">
            {/* Profile Settings */}
            {activeTab === "profile" && (
              <div className="p-6">
                <h2 className="text-xl font-semibold dark:text-white text-gray-800 mb-6">Profile Settings</h2>

                <div className="space-y-6">
                  {/* Avatar Upload */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                        <img
                          src={profileData.avatarUrl || '../../assets/react.svg'}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        onClick={triggerFileInput}
                        className="absolute bottom-0 right-0 bg-purple-600 text-white p-1.5 rounded-full shadow-lg hover:bg-purple-700 transition-colors"
                      >
                        <Upload size={14} />
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleAvatarUpload}
                        accept="image/*"
                        className="hidden"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium dark:text-white text-gray-800">Profile Picture</h3>
                      <p className="text-xs dark:text-gray-400 text-gray-500 mt-1">JPG, GIF or PNG. Max size 2MB.</p>
                      <button
                        onClick={triggerFileInput}
                        className="mt-2 text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
                      >
                        Change photo
                      </button>
                    </div>
                  </div>

                  {/* Profile Form */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={profileData.name}
                        onChange={handleProfileChange}
                        className="w-full rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-1"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                        className="w-full rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-1"
                      >
                        Phone Number
                      </label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleProfileChange}
                        className="w-full rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="location"
                        className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-1"
                      >
                        Location
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={profileData.location}
                        onChange={handleProfileChange}
                        className="w-full rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="bio" className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-1">
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        name="bio"
                        rows={4}
                        value={profileData.bio}
                        onChange={handleProfileChange}
                        className="w-full rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                      />
                      <p className="mt-1 text-xs dark:text-gray-400 text-gray-500">
                        Brief description for your profile. URLs are hyperlinked.
                      </p>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-end">
                    <button
                      onClick={saveProfileChanges}
                      className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center"
                    >
                      <Save size={16} className="mr-1.5" />
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === "notifications" && (
              <div className="p-6">
                <h2 className="text-xl font-semibold dark:text-white text-gray-800 mb-6">Notification Preferences</h2>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium dark:text-white text-gray-800 pb-2 border-b dark:border-gray-700 border-gray-200">
                      Email Notifications
                    </h3>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium dark:text-gray-200 text-gray-700">Email Notifications</h4>
                        <p className="text-xs dark:text-gray-400 text-gray-500 mt-1">
                          Receive emails about your account activity
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={notificationSettings.emailNotifications}
                          onChange={() => handleNotificationToggle("emailNotifications")}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium dark:text-gray-200 text-gray-700">Weekly Digest</h4>
                        <p className="text-xs dark:text-gray-400 text-gray-500 mt-1">
                          Get a weekly summary of activity
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={notificationSettings.weeklyDigest}
                          onChange={() => handleNotificationToggle("weeklyDigest")}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium dark:text-gray-200 text-gray-700">Marketing Emails</h4>
                        <p className="text-xs dark:text-gray-400 text-gray-500 mt-1">
                          Receive emails about new products, features, and more
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={notificationSettings.marketingEmails}
                          onChange={() => handleNotificationToggle("marketingEmails")}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium dark:text-white text-gray-800 pb-2 border-b dark:border-gray-700 border-gray-200">
                      System Notifications
                    </h3>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium dark:text-gray-200 text-gray-700">Push Notifications</h4>
                        <p className="text-xs dark:text-gray-400 text-gray-500 mt-1">
                          Receive push notifications in-app and on desktop
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={notificationSettings.pushNotifications}
                          onChange={() => handleNotificationToggle("pushNotifications")}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium dark:text-gray-200 text-gray-700">New Features</h4>
                        <p className="text-xs dark:text-gray-400 text-gray-500 mt-1">
                          Get notified when we release new features
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={notificationSettings.newFeatures}
                          onChange={() => handleNotificationToggle("newFeatures")}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium dark:text-gray-200 text-gray-700">Security Alerts</h4>
                        <p className="text-xs dark:text-gray-400 text-gray-500 mt-1">
                          Get important notifications about your account security
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={notificationSettings.securityAlerts}
                          onChange={() => handleNotificationToggle("securityAlerts")}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-end">
                    <button
                      onClick={saveNotificationSettings}
                      className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center"
                    >
                      <Save size={16} className="mr-1.5" />
                      Save Preferences
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
              <div className="p-6">
                <h2 className="text-xl font-semibold dark:text-white text-gray-800 mb-6">Security Settings</h2>

                <div className="space-y-6">
                  {/* Change Password */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium dark:text-white text-gray-800 pb-2 border-b dark:border-gray-700 border-gray-200">
                      Change Password
                    </h3>

                    <form onSubmit={changePassword} className="space-y-4">
                      <div>
                        <label
                          htmlFor="currentPassword"
                          className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-1"
                        >
                          Current Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPasswords.current ? "text" : "password"}
                            id="currentPassword"
                            name="currentPassword"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                            className="w-full rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility("current")}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          >
                            {showPasswords.current ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="newPassword"
                          className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-1"
                        >
                          New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPasswords.new ? "text" : "password"}
                            id="newPassword"
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            className="w-full rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility("new")}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          >
                            {showPasswords.new ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="confirmPassword"
                          className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-1"
                        >
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPasswords.confirm ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                            className="w-full rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility("confirm")}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          >
                            {showPasswords.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                        <p className="mt-1 text-xs dark:text-gray-400 text-gray-500">
                          Password must be at least 8 characters long.
                        </p>
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center"
                        >
                          <Lock size={16} className="mr-1.5" />
                          Change Password
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Two-Factor Authentication */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium dark:text-white text-gray-800 pb-2 border-b dark:border-gray-700 border-gray-200">
                      Two-Factor Authentication
                    </h3>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium dark:text-gray-200 text-gray-700">
                          Two-Factor Authentication
                        </h4>
                        <p className="text-xs dark:text-gray-400 text-gray-500 mt-1">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={securitySettings.twoFactorAuth}
                          onChange={() => handleSecurityToggle("twoFactorAuth")}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium dark:text-gray-200 text-gray-700">Login Alerts</h4>
                        <p className="text-xs dark:text-gray-400 text-gray-500 mt-1">
                          Get notified when someone logs into your account
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={securitySettings.loginAlerts}
                          onChange={() => handleSecurityToggle("loginAlerts")}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                      </label>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium dark:text-gray-200 text-gray-700">Session Timeout</h4>
                      <p className="text-xs dark:text-gray-400 text-gray-500">
                        Automatically log out after a period of inactivity
                      </p>
                      <select
                        name="sessionTimeout"
                        value={securitySettings.sessionTimeout}
                        onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: e.target.value })}
                        className="mt-1 block w-full rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                      >
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="60">1 hour</option>
                        <option value="120">2 hours</option>
                        <option value="never">Never</option>
                      </select>
                    </div>
                  </div>

                  {/* Account Actions */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium dark:text-white text-gray-800 pb-2 border-b dark:border-gray-700 border-gray-200">
                      Account Actions
                    </h3>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button className="px-4 py-2 border dark:border-gray-600 border-gray-300 rounded-md shadow-sm text-sm font-medium dark:text-gray-300 text-gray-700 dark:bg-gray-700 bg-white hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 flex items-center justify-center">
                        <Mail size={16} className="mr-1.5" />
                        Change Email
                      </button>
                      <button className="px-4 py-2 border border-red-300 dark:border-red-800 rounded-md shadow-sm text-sm font-medium text-red-600 dark:text-red-400 bg-white dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 flex items-center justify-center">
                        <Trash2 size={16} className="mr-1.5" />
                        Delete Account
                      </button>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-end">
                    <button
                      onClick={saveSecuritySettings}
                      className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center"
                    >
                      <Save size={16} className="mr-1.5" />
                      Save Settings
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeTab === "appearance" && (
              <div className="p-6">
                <h2 className="text-xl font-semibold dark:text-white text-gray-800 mb-6">Appearance Settings</h2>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium dark:text-white text-gray-800 pb-2 border-b dark:border-gray-700 border-gray-200">
                      Theme
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div
                        className={`border rounded-lg p-4 cursor-pointer ${
                          appearanceSettings.theme === "light"
                            ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                            : "border-gray-200 dark:border-gray-700"
                        }`}
                        onClick={() => setAppearanceSettings({ ...appearanceSettings, theme: "light" })}
                      >
                        <div className="flex items-center justify-center h-20 bg-white rounded-md border border-gray-200 mb-3">
                          <Sun size={24} className="text-gray-700" />
                        </div>
                        <div className="text-center">
                          <h4 className="text-sm font-medium dark:text-gray-200 text-gray-700">Light</h4>
                        </div>
                      </div>

                      <div
                        className={`border rounded-lg p-4 cursor-pointer ${
                          appearanceSettings.theme === "dark"
                            ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                            : "border-gray-200 dark:border-gray-700"
                        }`}
                        onClick={() => setAppearanceSettings({ ...appearanceSettings, theme: "dark" })}
                      >
                        <div className="flex items-center justify-center h-20 bg-gray-800 rounded-md border border-gray-700 mb-3">
                          <Moon size={24} className="text-gray-300" />
                        </div>
                        <div className="text-center">
                          <h4 className="text-sm font-medium dark:text-gray-200 text-gray-700">Dark</h4>
                        </div>
                      </div>

                      <div
                        className={`border rounded-lg p-4 cursor-pointer ${
                          appearanceSettings.theme === "system"
                            ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                            : "border-gray-200 dark:border-gray-700"
                        }`}
                        onClick={() => setAppearanceSettings({ ...appearanceSettings, theme: "system" })}
                      >
                        <div className="flex items-center justify-center h-20 bg-gradient-to-r from-white to-gray-800 rounded-md border border-gray-200 mb-3">
                          <div className="flex">
                            <Sun size={24} className="text-gray-700" />
                            <Moon size={24} className="text-gray-300 ml-2" />
                          </div>
                        </div>
                        <div className="text-center">
                          <h4 className="text-sm font-medium dark:text-gray-200 text-gray-700">System</h4>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium dark:text-white text-gray-800 pb-2 border-b dark:border-gray-700 border-gray-200">
                      Display Options
                    </h3>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium dark:text-gray-200 text-gray-700">Compact Mode</h4>
                        <p className="text-xs dark:text-gray-400 text-gray-500 mt-1">
                          Reduce spacing and padding in the UI
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={appearanceSettings.compactMode}
                          onChange={() => handleAppearanceToggle("compactMode")}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                      </label>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium dark:text-gray-200 text-gray-700">Font Size</h4>
                      <select
                        name="fontSize"
                        value={appearanceSettings.fontSize}
                        onChange={handleAppearanceChange}
                        className="mt-1 block w-full rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                      >
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium dark:text-white text-gray-800 pb-2 border-b dark:border-gray-700 border-gray-200">
                      Language
                    </h3>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium dark:text-gray-200 text-gray-700">Interface Language</h4>
                      <select
                        name="language"
                        value={appearanceSettings.language}
                        onChange={handleAppearanceChange}
                        className="mt-1 block w-full rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                      >
                        <option value="english">English</option>
                        <option value="spanish">Spanish</option>
                        <option value="french">French</option>
                        <option value="german">German</option>
                        <option value="japanese">Japanese</option>
                        <option value="chinese">Chinese</option>
                      </select>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-end">
                    <button
                      onClick={saveAppearanceSettings}
                      className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center"
                    >
                      <Save size={16} className="mr-1.5" />
                      Save Settings
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
