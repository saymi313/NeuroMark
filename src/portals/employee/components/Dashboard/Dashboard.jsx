"use client"

import { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"
import { Menu, X, Search, Sun, Moon, Bell, ChevronDown, User, LogOut, SettingsIcon } from "lucide-react"
import Sidebar from "./Sidebar"

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(() => {
    const savedPreference = localStorage.getItem("darkMode")
    return savedPreference === "true" || (!savedPreference && window.matchMedia("(prefers-color-scheme: dark)").matches)
  })
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    localStorage.setItem("darkMode", darkMode)
  }, [darkMode])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen)
  }

  const handleContentClick = () => {
    if (sidebarOpen && window.innerWidth < 768) {
      setSidebarOpen(false)
    }
    if (userMenuOpen) {
      setUserMenuOpen(false)
    }
  }

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setUserMenuOpen(false)
        if (window.innerWidth < 768) {
          setSidebarOpen(false)
        }
      }
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [])

  return (
    <div className="flex h-screen">
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={toggleSidebar} />}

      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out shadow-xl bg-gradient-to-b from-gray-800 to-gray-900 dark:from-gray-900 dark:to-gray-950`}
      >
        <Sidebar />
      </div>

      <div
        className="flex-1 md:ml-64 flex flex-col dark:bg-gray-900 bg-gray-50 transition-colors duration-300"
        onClick={handleContentClick}
      >
        <header className="h-16 px-4 md:px-6 dark:bg-gray-800/90 bg-white border-b dark:border-gray-700 border-gray-200 backdrop-blur-md shadow-sm flex items-center justify-between sticky top-0 z-20 transition-colors duration-300">
          <div className="flex items-center">
            <button
              className="p-2 rounded-md md:hidden text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300 transition-colors"
              onClick={toggleSidebar}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <div className="flex items-center md:hidden ml-2">
              <h2 className="text-lg font-semibold font-azonix">
                <span className="dark:text-purple-400 text-purple-600">Neuro</span>
                <span className="dark:text-white text-gray-800">Mark</span>
              </h2>
            </div>

            <div className="hidden md:flex items-center ml-4">
              <h2 className="text-lg font-semibold dark:text-white text-gray-800">Employee Portal</h2>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search..."
                className="pl-9 pr-4 py-1.5 rounded-md text-sm dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:border-gray-600 bg-gray-100 text-gray-800 placeholder-gray-500 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all duration-200 w-48 lg:w-64"
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 dark:text-gray-400 text-gray-500"
                size={16}
              />
            </div>

            <button className="relative p-2 rounded-full dark:hover:bg-gray-700 dark:text-gray-300 hover:bg-gray-100 text-gray-600 transition-colors">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full dark:hover:bg-gray-700 dark:text-yellow-400 hover:bg-gray-100 text-gray-600 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <div className="relative">
              <button className="flex items-center gap-2" onClick={toggleUserMenu}>
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white text-xs font-medium">
                  EM
                </div>
                <span className="hidden md:inline text-sm font-medium dark:text-white text-gray-800">Employee</span>
                <ChevronDown size={16} className="hidden md:inline dark:text-gray-400 text-gray-600" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg overflow-hidden z-50 dark:bg-gray-800 dark:border-gray-700 bg-white border border-gray-200">
                  <div className="px-4 py-3 border-b dark:border-gray-700 border-gray-200">
                    <p className="text-sm font-medium dark:text-white text-gray-800">Employee User</p>
                    <p className="text-xs dark:text-gray-400 text-gray-500">employee@neuromark.com</p>
                  </div>
                  <div className="py-1">
                    <a
                      href="#"
                      className="flex items-center px-4 py-2 text-sm dark:hover:bg-gray-700 dark:text-gray-300 hover:bg-gray-100 text-gray-700"
                    >
                      <User size={16} className="mr-2" />
                      Your Profile
                    </a>
                    <a
                      href="#"
                      className="flex items-center px-4 py-2 text-sm dark:hover:bg-gray-700 dark:text-gray-300 hover:bg-gray-100 text-gray-700"
                    >
                      <SettingsIcon size={16} className="mr-2" />
                      Settings
                    </a>
                    <a
                      href="#"
                      className="flex items-center px-4 py-2 text-sm dark:hover:bg-gray-700 dark:text-red-400 hover:bg-gray-100 text-red-600"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign out
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 overflow-y-auto dark:bg-gray-900 bg-gray-50 transition-colors duration-300">
          <Outlet />
        </main>

        <footer className="py-3 px-4 md:px-6 dark:bg-gray-800 dark:border-t dark:border-gray-700 bg-white border-t border-gray-200 text-xs transition-colors duration-300">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="dark:text-gray-400 text-gray-600">© 2025 NeuroMark. All rights reserved.</p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="hover:underline dark:text-purple-400 dark:hover:text-purple-300 text-purple-600 hover:text-purple-800 transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="hover:underline dark:text-purple-400 dark:hover:text-purple-300 text-purple-600 hover:text-purple-800 transition-colors"
              >
                Terms
              </a>
              <a
                href="#"
                className="hover:underline dark:text-purple-400 dark:hover:text-purple-300 text-purple-600 hover:text-purple-800 transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
