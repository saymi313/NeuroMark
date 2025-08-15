"use client"

import { useState } from "react"
import { Calendar, Clock, MapPin, Users, Star, Search, Video, AlertCircle } from "lucide-react"

const meetings = [
  {
    id: 1,
    title: "Sprint Planning",
    purpose: "Plan next sprint tasks",
    agenda: "Discuss backlog, assign tasks",
    date: "2024-05-10",
    time: "10:00 AM",
    duration: "1h",
    location: "Room 201",
    link: "https://meet.example.com/1",
    participants: ["Alice", "Bob", "Charlie"],
    priority: "critical",
  },
  {
    id: 2,
    title: "Design Review",
    purpose: "Review UI designs",
    agenda: "Feedback on new dashboard",
    date: "2024-05-11",
    time: "2:00 PM",
    duration: "45m",
    location: "Zoom",
    link: "https://meet.example.com/2",
    participants: ["Alice", "Dana"],
    priority: "normal",
  },
  {
    id: 3,
    title: "Optional Sync",
    purpose: "Open Q&A",
    agenda: "Any team questions",
    date: "2024-05-12",
    time: "4:00 PM",
    duration: "30m",
    location: "Teams",
    link: "https://meet.example.com/3",
    participants: ["Bob", "Charlie"],
    priority: "optional",
  },
]

const priorityConfig = {
  critical: {
    bg: "bg-gradient-to-r from-red-500 to-pink-500",
    text: "text-white",
    icon: AlertCircle,
    border: "border-red-200",
  },
  normal: {
    bg: "bg-gradient-to-r from-purple-500 to-violet-500",
    text: "text-white",
    icon: Star,
    border: "border-purple-200",
  },
  optional: {
    bg: "bg-gradient-to-r from-slate-400 to-slate-500",
    text: "text-white",
    icon: Clock,
    border: "border-slate-200",
  },
}

const PRIORITIES = ["All", "critical", "normal", "optional"]

export default function Meetings() {
  const [search, setSearch] = useState("")
  const [priority, setPriority] = useState("All")

  const filtered = meetings.filter(
    (m) =>
      (priority === "All" || m.priority === priority) &&
      (m.title.toLowerCase().includes(search.toLowerCase()) ||
        m.purpose.toLowerCase().includes(search.toLowerCase()) ||
        m.participants.some((p) => p.toLowerCase().includes(search.toLowerCase()))),
  )

  return (
    <section className="space-y-8">
      <div className="text-left">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 mb-4 shadow-lg">
          <Calendar className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-700 to-violet-700 bg-clip-text text-transparent mb-2">
          Upcoming Meetings
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Stay connected with your team and never miss important discussions
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Priority:</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="px-4 py-3 rounded-xl font-medium bg-white dark:bg-slate-800 border border-purple-200 dark:border-purple-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm transition-all duration-300 w-36"
          >
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search meetings..."
            className="pl-12 pr-4 py-3 w-full rounded-xl bg-white dark:bg-slate-800 border border-purple-200 dark:border-purple-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm transition-all duration-300"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400" size={20} />
        </div>
      </div>

      <div className="grid gap-6">
        {filtered.map((m) => {
          const config = priorityConfig[m.priority]
          const PriorityIcon = config.icon

          return (
            <div
              key={m.id}
              className="group bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-200 dark:border-slate-700 overflow-hidden"
            >
              <div className={`h-1 bg-gradient-to-r ${config.bg.replace("bg-gradient-to-r", "")}`}></div>

              <div className="p-8">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="flex-1 space-y-4">
                    {/* Meeting header */}
                    <div className="flex items-start gap-4">
                      <div
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${config.bg} ${config.text} shadow-lg`}
                      >
                        <PriorityIcon size={16} />
                        <span className="font-semibold text-sm">{m.priority.toUpperCase()}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{m.title}</h3>
                        <p className="text-slate-600 dark:text-slate-300 text-lg">{m.purpose}</p>
                      </div>
                    </div>

                    {/* Meeting details */}
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
                      <p className="text-slate-600 dark:text-slate-300 mb-3">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">Agenda:</span> {m.agenda}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                          <Calendar className="w-5 h-5 text-purple-500" />
                          <span className="font-medium">{m.date}</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                          <Clock className="w-5 h-5 text-purple-500" />
                          <span className="font-medium">
                            {m.time} ({m.duration})
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                          <MapPin className="w-5 h-5 text-purple-500" />
                          <span className="font-medium">{m.location}</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                          <Users className="w-5 h-5 text-purple-500" />
                          <span className="font-medium">{m.participants.join(", ")}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action area */}
                  <div className="flex flex-col items-end gap-4">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                        {m.time.split(" ")[0]}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">{m.time.split(" ")[1]}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">{m.date}</div>
                    </div>

                    <a
                      href={m.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-violet-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      <Video size={18} />
                      Join Meeting
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Calendar className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <p className="text-xl text-slate-500 dark:text-slate-400">No meetings found</p>
            <p className="text-slate-400 dark:text-slate-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </section>
  )
}
