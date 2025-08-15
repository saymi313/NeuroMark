"use client"

import { useState } from "react"
import { Star, Calendar, User, CheckCircle, Search, AlertTriangle, Zap, Minus } from "lucide-react"

const initialTasks = [
  {
    id: 1,
    title: "Update Employee Portal UI",
    description: "Redesign the dashboard for better UX.",
    assignedBy: "Sarah Smith",
    dueDate: "2024-05-13",
    priority: "high",
    status: "in progress",
  },
  {
    id: 2,
    title: "Write API Docs",
    description: "Document all endpoints for v2.",
    assignedBy: "Mike Chen",
    dueDate: "2024-05-15",
    priority: "medium",
    status: "pending",
  },
  {
    id: 3,
    title: "Fix Login Bug",
    description: "Resolve issue with SSO login.",
    assignedBy: "Sarah Smith",
    dueDate: "2024-05-10",
    priority: "low",
    status: "completed",
  },
]

const priorityConfig = {
  high: {
    bg: "bg-gradient-to-r from-red-500 to-pink-500",
    text: "text-white",
    icon: AlertTriangle,
    lightBg: "bg-red-50 dark:bg-red-900/20",
    border: "border-red-200 dark:border-red-800",
  },
  medium: {
    bg: "bg-gradient-to-r from-amber-500 to-orange-500",
    text: "text-white",
    icon: Zap,
    lightBg: "bg-amber-50 dark:bg-amber-900/20",
    border: "border-amber-200 dark:border-amber-800",
  },
  low: {
    bg: "bg-gradient-to-r from-emerald-500 to-green-500",
    text: "text-white",
    icon: Minus,
    lightBg: "bg-emerald-50 dark:bg-emerald-900/20",
    border: "border-emerald-200 dark:border-emerald-800",
  },
}

const statusConfig = {
  pending: {
    bg: "bg-gradient-to-r from-slate-400 to-slate-500",
    text: "text-white",
    lightBg: "bg-slate-50 dark:bg-slate-900/20",
  },
  "in progress": {
    bg: "bg-gradient-to-r from-blue-500 to-indigo-500",
    text: "text-white",
    lightBg: "bg-blue-50 dark:bg-blue-900/20",
  },
  completed: {
    bg: "bg-gradient-to-r from-emerald-500 to-green-500",
    text: "text-white",
    lightBg: "bg-emerald-50 dark:bg-emerald-900/20",
  },
}

const PRIORITIES = ["All", "high", "medium", "low"]
const STATUSES = ["All", "pending", "in progress", "completed"]

export default function Tasks() {
  const [tasks, setTasks] = useState(initialTasks)
  const [search, setSearch] = useState("")
  const [priority, setPriority] = useState("All")
  const [status, setStatus] = useState("All")

  const filtered = tasks.filter(
    (t) =>
      (priority === "All" || t.priority === priority) &&
      (status === "All" || t.status === status) &&
      (t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase()) ||
        t.assignedBy.toLowerCase().includes(search.toLowerCase())),
  )

  const toggleDone = (id) => {
    setTasks((ts) =>
      ts.map((t) => (t.id === id ? { ...t, status: t.status === "completed" ? "pending" : "completed" } : t)),
    )
  }

  return (
    <section className="space-y-8">
      <div className="text-left">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 mb-4 shadow-lg">
          <Star className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent mb-2">
          Assigned Tasks
        </h2>
        <p className="text-slate-600 dark:text-slate-300">Track your progress and stay on top of your deliverables</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Priority:</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="px-4 py-3 rounded-xl font-medium bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm transition-all duration-300 w-36"
          >
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-4 py-3 rounded-xl font-medium bg-white dark:bg-slate-800 border border-purple-200 dark:border-purple-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm transition-all duration-300 w-36"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="pl-12 pr-4 py-3 w-full rounded-xl bg-white dark:bg-slate-800 border border-purple-200 dark:border-purple-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm transition-all duration-300"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400" size={20} />
        </div>
      </div>

      <div className="grid gap-6">
        {filtered.map((t) => {
          const priorityConf = priorityConfig[t.priority]
          const statusConf = statusConfig[t.status]
          const PriorityIcon = priorityConf.icon

          return (
            <div
              key={t.id}
              className={`group bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border ${priorityConf.border} overflow-hidden`}
            >
              <div className={`h-1 bg-gradient-to-r ${priorityConf.bg.replace("bg-gradient-to-r", "")}`}></div>

              <div className="p-8">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="flex-1 space-y-4">
                    {/* Task header */}
                    <div className="flex flex-wrap items-start gap-3">
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${priorityConf.bg} ${priorityConf.text} shadow-lg`}
                      >
                        <PriorityIcon size={14} />
                        <span className="font-semibold text-xs">{t.priority.toUpperCase()}</span>
                      </div>
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${statusConf.bg} ${statusConf.text} shadow-lg`}
                      >
                        <CheckCircle size={14} />
                        <span className="font-semibold text-xs">{t.status.toUpperCase()}</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{t.title}</h3>
                      <p className="text-slate-600 dark:text-slate-300 text-lg">{t.description}</p>
                    </div>

                    {/* Task details */}
                    <div className={`${priorityConf.lightBg} rounded-xl p-4`}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                          <User className="w-5 h-5 text-purple-500" />
                          <span className="font-medium">Assigned by {t.assignedBy}</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                          <Calendar className="w-5 h-5 text-purple-500" />
                          <span className="font-medium">Due {t.dueDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action area */}
                  <div className="flex flex-col items-end gap-4">
                    <div className="text-right">
                      <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Due Date</div>
                      <div className="text-xl font-bold text-slate-800 dark:text-slate-100">{t.dueDate}</div>
                    </div>

                    <button
                      onClick={() => toggleDone(t.id)}
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg ${
                        t.status === "completed"
                          ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:from-emerald-700 hover:to-green-700"
                          : "bg-gradient-to-r from-slate-600 to-slate-700 text-white hover:from-slate-700 hover:to-slate-800"
                      }`}
                    >
                      <CheckCircle size={18} />
                      {t.status === "completed" ? "Mark as Pending" : "Mark as Done"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Star className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <p className="text-xl text-slate-500 dark:text-slate-400">No tasks found</p>
            <p className="text-slate-400 dark:text-slate-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </section>
  )
}
