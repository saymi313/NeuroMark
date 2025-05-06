import { NavLink } from "react-router-dom"
import { Home, BarChart2, Settings, Users, Brain, Layers, HelpCircle } from "lucide-react"

const Sidebar = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4">
        <NavLink to="/" className="flex items-center">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 w-8 h-8 rounded-md flex items-center justify-center mr-3">
            <Brain size={18} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold font-azonix text-white">NeuroMark</h2>
        </NavLink>
      </div>

      <div className="mt-6 px-3">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">Main</div>
        <nav className="space-y-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive ? "bg-gray-700/60 text-white" : "text-gray-300 hover:text-white hover:bg-gray-700/40"
              }`
            }
          >
            <Home size={18} />
            Dashboard
          </NavLink>

          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive ? "bg-gray-700/60 text-white" : "text-gray-300 hover:text-white hover:bg-gray-700/40"
              }`
            }
          >
            <BarChart2 size={18} />
            Analytics
          </NavLink>

          <NavLink
            to="/users"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive ? "bg-gray-700/60 text-white" : "text-gray-300 hover:text-white hover:bg-gray-700/40"
              }`
            }
          >
            <Users size={18} />
            Users
          </NavLink>
        </nav>
      </div>

      <div className="mt-6 px-3">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">Administration</div>
        <nav className="space-y-1">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive ? "bg-gray-700/60 text-white" : "text-gray-300 hover:text-white hover:bg-gray-700/40"
              }`
            }
          >
            <Settings size={18} />
            Settings
          </NavLink>

          <NavLink
            to="/integrations"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive ? "bg-gray-700/60 text-white" : "text-gray-300 hover:text-white hover:bg-gray-700/40"
              }`
            }
          >
            <Layers size={18} />
            Integrations
          </NavLink>
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive ? "bg-gray-700/60 text-white" : "text-gray-300 hover:text-white hover:bg-gray-700/40"
              }`
            }
          >
            {/* <Layers size={18} /> */}
            Signup
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive ? "bg-gray-700/60 text-white" : "text-gray-300 hover:text-white hover:bg-gray-700/40"
              }`
            }
          >
            {/* <Layers size={18} /> */}
            Login
          </NavLink>
        </nav>
      </div>

      <div className="mt-auto p-4">
        <div className="bg-gray-700/30 rounded-lg p-3">
          <div className="flex items-start">
            <div className="p-2 bg-purple-500/20 rounded-md text-purple-400">
              <HelpCircle size={18} />
            </div>
            <div className="ml-3">
              <h5 className="text-sm font-medium text-white">Need help?</h5>
              <p className="text-xs text-gray-400 mt-1">Check our documentation</p>
              <a href="#" className="text-xs text-purple-400 hover:text-purple-300 mt-2 inline-block">
                View Documentation
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
