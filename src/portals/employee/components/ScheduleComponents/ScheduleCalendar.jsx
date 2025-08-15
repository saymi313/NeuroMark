"use client"

import { useState } from "react"
import { Calendar, Star, Layers, Search, Grid3X3 } from "lucide-react"

const meetings = [
  { id: 1, title: "Sprint Planning", date: "2025-08-10", type: "meeting" },
  { id: 2, title: "Design Review", date: "2025-08-11", type: "meeting" },
  { id: 3, title: "Optional Sync", date: "2025-08-12", type: "meeting" },
  { id: 4, title: "Client Presentation", date: "2025-08-15", type: "meeting" },
  { id: 5, title: "Team Standup", date: "2025-08-16", type: "meeting" },
  { id: 6, title: "Product Demo", date: "2025-08-20", type: "meeting" },
  { id: 7, title: "Quarterly Review", date: "2025-08-25", type: "meeting" },
]
const tasks = [
  { id: 1, title: "Update Employee Portal UI", dueDate: "2025-08-13", type: "task" },
  { id: 2, title: "Write API Docs", dueDate: "2025-08-15", type: "task" },
  { id: 3, title: "Fix Login Bug", dueDate: "2025-08-10", type: "task" },
  { id: 4, title: "Database Migration", dueDate: "2025-08-18", type: "task" },
  { id: 5, title: "Security Audit", dueDate: "2025-08-22", type: "task" },
  { id: 6, title: "Performance Testing", dueDate: "2025-08-24", type: "task" },
  { id: 7, title: "Code Review", dueDate: "2025-08-14", type: "task" },
]

const projects = [
  { id: 1, name: "Employee Portal Redesign", deadline: "2025-08-25", type: "project" },
  { id: 2, name: "AI Chatbot Integration", deadline: "2025-08-28", type: "project" },
  { id: 3, name: "Mobile App Launch", deadline: "2025-08-30", type: "project" },
  { id: 4, name: "Data Analytics Platform", deadline: "2025-08-17", type: "project" },
  { id: 5, name: "Customer Portal", deadline: "2025-08-21", type: "project" },
]

const TYPES = ["All", "meeting", "task", "project"]
const TYPE_COLORS = {
  meeting: "bg-gradient-to-r from-blue-500 to-blue-600",
  task: "bg-gradient-to-r from-emerald-500 to-green-600",
  project: "bg-gradient-to-r from-amber-500 to-orange-600",
}
const TYPE_LABELS = {
  meeting: "Meeting",
  task: "Task",
  project: "Project",
}
const TYPE_ICONS = {
  meeting: <Calendar size={14} className="mr-1" />,
  task: <Star size={14} className="mr-1" />,
  project: <Layers size={14} className="mr-1" />,
}

function getItemsByDate(search, type) {
  const items = {}
  meetings.forEach((m) => {
    if ((type === "All" || type === "meeting") && (!search || m.title.toLowerCase().includes(search.toLowerCase()))) {
      items[m.date] = items[m.date] || []
      items[m.date].push({ ...m, color: TYPE_COLORS.meeting })
    }
  })
  tasks.forEach((t) => {
    if ((type === "All" || type === "task") && (!search || t.title.toLowerCase().includes(search.toLowerCase()))) {
      items[t.dueDate] = items[t.dueDate] || []
      items[t.dueDate].push({ ...t, color: TYPE_COLORS.task })
    }
  })
  projects.forEach((p) => {
    if ((type === "All" || type === "project") && (!search || p.name.toLowerCase().includes(search.toLowerCase()))) {
      items[p.deadline] = items[p.deadline] || []
      items[p.deadline].push({ ...p, color: TYPE_COLORS.project })
    }
  })
  return items
}

function getMonthDays(year, month) {
  const days = []
  const date = new Date(year, month, 1)
  while (date.getMonth() === month) {
    days.push(new Date(date))
    date.setDate(date.getDate() + 1)
  }
  return days
}

export default function ScheduleCalendar() {
  const [search, setSearch] = useState("")
  const [type, setType] = useState("All")
  const [hovered, setHovered] = useState(null)
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const days = getMonthDays(year, month)
  const itemsByDate = getItemsByDate(search, type)
  const firstDay = new Date(year, month, 1).getDay()
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  return (
    <section className="space-y-8">
      <div className="text-left">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 mb-4 shadow-lg">
          <Grid3X3 className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent mb-2">
          Schedule Calendar
        </h2>
        <p className="text-slate-600 dark:text-slate-300">Get a comprehensive view of all your upcoming events</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300">View:</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="px-4 py-3 rounded-xl font-medium bg-white dark:bg-slate-800 border border-purple-200 dark:border-purple-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm transition-all duration-300 w-36"
          >
            {TYPES.map((t) => (
              <option key={t} value={t}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search calendar..."
            className="pl-12 pr-4 py-3 w-full rounded-xl bg-white dark:bg-slate-800 border border-purple-200 dark:border-purple-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm transition-all duration-300"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400" size={20} />
        </div>
      </div>

      <div className="space-y-6">
        {/* Calendar header with month/year */}
        <div className="flex items-center justify-between p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
              {monthNames[month]} {year}
            </h3>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-sm"></div>
              <span className="text-slate-600 dark:text-slate-300">Meetings</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 shadow-sm"></div>
              <span className="text-slate-600 dark:text-slate-300">Tasks</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 shadow-sm"></div>
              <span className="text-slate-600 dark:text-slate-300">Projects</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        {/* Days of week header */}
        <div className="grid grid-cols-7 bg-gradient-to-r from-purple-600 to-indigo-600">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="text-center py-4 font-bold text-white text-lg tracking-wide">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7">
          {Array(firstDay)
            .fill(null)
            .map((_, i) => (
              <div key={"empty-" + i} className="h-32 border-r border-b border-slate-200 dark:border-slate-700"></div>
            ))}
          {days.map((date) => {
            const dStr = date.toISOString().split("T")[0]
            const items = itemsByDate[dStr] || []
            const isToday = dStr === new Date().toISOString().split("T")[0]

            return (
              <div
                key={dStr}
                className={`relative h-32 border-r border-b border-slate-200 dark:border-slate-700 p-2 transition-all duration-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer group ${
                  isToday
                    ? "bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30"
                    : ""
                }`}
                onMouseEnter={() => setHovered(dStr)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Date number */}
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm mb-2 ${
                    isToday
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                      : "text-slate-700 dark:text-slate-300 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30"
                  }`}
                >
                  {date.getDate()}
                </div>

                {/* Event indicators */}
                <div className="space-y-1">
                  {items.slice(0, 3).map((item, idx) => (
                    <div
                      key={idx}
                      className={`text-xs px-2 py-1 rounded-md text-white font-medium truncate shadow-sm ${item.color}`}
                    >
                      {item.title || item.name}
                    </div>
                  ))}
                  {items.length > 3 && (
                    <div className="text-xs text-slate-500 dark:text-slate-400 px-2">+{items.length - 3} more</div>
                  )}
                </div>

                {/* Hover tooltip */}
                {hovered === dStr && items.length > 0 && (
                  <div className="absolute z-50 left-full top-0 ml-2 w-72 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 p-4 animate-in slide-in-from-left-2 duration-200">
                    <div className="font-bold text-purple-700 dark:text-purple-300 mb-3 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {date.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" })}
                    </div>
                    <div className="space-y-2">
                      {items.map((item, idx) => (
                        <div
                          key={idx}
                          className={`flex items-center gap-2 p-2 rounded-lg text-white text-sm font-medium ${item.color}`}
                        >
                          {TYPE_ICONS[item.type]}
                          <span className="truncate">{item.title || item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
