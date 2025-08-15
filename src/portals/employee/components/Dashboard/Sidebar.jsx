import { NavLink } from "react-router-dom"
import { Home, Clock, User, FileText, Calendar, HelpCircle, Send } from "lucide-react"

const Sidebar = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4">
        <NavLink to="/employee" className="flex items-center">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 w-8 h-8 rounded-md flex items-center justify-center mr-3">
            <User size={18} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold font-azonix text-white">Employee Portal</h2>
        </NavLink>
      </div>

      <div className="mt-6 px-3">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">Main</div>
        <nav className="space-y-1">
          <NavLink
            to="/employee"
            end
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
            to="/employee/attendance"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive ? "bg-gray-700/60 text-white" : "text-gray-300 hover:text-white hover:bg-gray-700/40"
              }`
            }
          >
            <Clock size={18} />
            My Attendance
          </NavLink>

          <NavLink
            to="/employee/leave-request"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive ? "bg-gray-700/60 text-white" : "text-gray-300 hover:text-white hover:bg-gray-700/40"
              }`
            }
          >
            <Send size={18} />
            Leave Request
          </NavLink>

          <NavLink
            to="/employee/profile"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive ? "bg-gray-700/60 text-white" : "text-gray-300 hover:text-white hover:bg-gray-700/40"
              }`
            }
          >
            <User size={18} />
            Profile
          </NavLink>
        </nav>
      </div>

      <div className="mt-6 px-3">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">Reports</div>
        <nav className="space-y-1">
          <NavLink
            to="/employee/reports"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive ? "bg-gray-700/60 text-white" : "text-gray-300 hover:text-white hover:bg-gray-700/40"
              }`
            }
          >
            <FileText size={18} />
            Reports
          </NavLink>

          <NavLink
            to="/employee/schedule"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive ? "bg-gray-700/60 text-white" : "text-gray-300 hover:text-white hover:bg-gray-700/40"
              }`
            }
          >
            <Calendar size={18} />
            Schedule
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
              <p className="text-xs text-gray-400 mt-1">Contact HR department</p>
              <a href="#" className="text-xs text-purple-400 hover:text-purple-300 mt-2 inline-block">
                Get Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
