import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu, X, Search, Sun, Moon } from 'lucide-react';
import Sidebar from './Sidebar';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`flex flex-col h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      {/* Mobile sidebar toggle button */}
      <button
        className="fixed z-50 p-2 bg-purple-600 rounded-md shadow-lg text-white md:hidden top-4 left-4 hover:bg-purple-700 transition-colors"
        onClick={toggleSidebar}
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-800 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out shadow-lg`}
      >
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 md:ml-64 flex flex-col">
        <header className={`h-16 px-6 ${darkMode ? 'bg-gray-800/90' : 'bg-gradient-to-r from-purple-600 to-indigo-600/80'} backdrop-blur-md text-white shadow-lg flex items-center justify-between transition-colors duration-300`}>
          <h2 className="text-xl font-semibold font-azonix">NeuroMark Dashboard</h2>
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search dashboards or users..."
                className="pl-10 pr-4 py-2 rounded-full bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" size={18} />
            </div>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200/20 hover:bg-gray-300/20 transition-colors duration-200 focus:outline-none"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-200" />}
            </button>
            <div className="relative group">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold hover:scale-105 transition-transform cursor-pointer">
                NM
              </div>
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 invisible group-hover:visible z-50">
                <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Profile</a>
                <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100">Settings</a>
                <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Logout</a>
              </div>
            </div>
          </div>
        </header>

        <main className={`flex-1 p-6 overflow-y-auto ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <Outlet />
        </main>

        {/* Footer */}
        <footer className={`p-4 ${darkMode ? 'bg-gray-800 border-t border-gray-700' : 'bg-white border-t border-gray-200'} shadow-inner`}>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} font-azonix`}>
              © 2025 NeuroMark. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="#" className={`text-sm hover:underline ${darkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-800'} transition-colors`}>
                Privacy Policy
              </a>
              <a href="#" className={`text-sm hover:underline ${darkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-800'} transition-colors`}>
                Terms of Service
              </a>
              <a href="#" className={`text-sm hover:underline ${darkMode ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-800'} transition-colors`}>
                Contact Us
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}