import { useState } from 'react';
import { Save, Bell, Moon, Sun, Globe, Shield, Key } from 'lucide-react';

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 font-azonix">Settings</h1>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </button>
      </div>

      {/* Settings sections */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-medium text-gray-800 font-azonix">Settings Menu</h3>
            </div>
            <div className="p-4">
              <nav className="space-y-1">
                {[
                  { name: 'Profile', icon: <Globe className="w-5 h-5" />, current: true },
                  { name: 'Appearance', icon: <Moon className="w-5 h-5" />, current: false },
                  { name: 'Notifications', icon: <Bell className="w-5 h-5" />, current: false },
                  { name: 'Security', icon: <Shield className="w-5 h-5" />, current: false },
                  { name: 'API Keys', icon: <Key className="w-5 h-5" />, current: false },
                ].map((item) => (
                  <a
                    key={item.name}
                    href="#"
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                      item.current
                        ? 'bg-purple-50 text-purple-700'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <span
                      className={`mr-3 ${item.current ? 'text-purple-500' : 'text-gray-500'}`}
                    >
                      {item.icon}
                    </span>
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-medium text-gray-800 font-azonix">Profile Settings</h3>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                      First name
                    </label>
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      defaultValue="John"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                      Last name
                    </label>
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      defaultValue="Doe"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    defaultValue="john.doe@example.com"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                    About
                  </label>
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    defaultValue="I'm a neuroscience researcher specializing in cognitive functions."
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-medium text-gray-800 font-azonix">Preferences</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Dark Mode</h4>
                  <p className="text-sm text-gray-500">Enable dark mode for the dashboard</p>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    darkMode ? 'bg-purple-600' : 'bg-gray-200'
                  }`}
                >
                  <span className="sr-only">Toggle dark mode</span>
                  <span
                    className={`pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      darkMode ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  >
                    <span
                      className={`absolute inset-0 flex h-full w-full items-center justify-center transition-opacity ${
                        darkMode ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in'
                      }`}
                    >
                      <Sun className="h-3 w-3 text-gray-400" />
                    </span>
                    <span
                      className={`absolute inset-0 flex h-full w-full items-center justify-center transition-opacity ${
                        darkMode ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out'
                      }`}
                    >
                      <Moon className="h-3 w-3 text-gray-400" />
                    </span>
                  </span>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Notifications</h4>
                  <p className="text-sm text-gray-500">Receive email notifications for important updates</p>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    notifications ? 'bg-purple-600' : 'bg-gray-200'
                  }`}
                >
                  <span className="sr-only">Toggle notifications</span>
                  <span
                    className={`pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      notifications ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  >
                    <Bell className="absolute inset-0 flex h-full w-full items-center justify-center text-gray-400" />
                  </span>
                </button>
              </div>

              <div className="pt-5 border-t border-gray-200">
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}