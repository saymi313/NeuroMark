"use client"

import { useState } from "react"
import { Layers, Calendar, Users, Clock, CheckCircle, Search, Target, TrendingUp, AlertCircle } from "lucide-react"

const initialProjects = [
  {
    id: 1,
    name: "Employee Portal Redesign",
    description: "Revamp the UI/UX for the employee portal.",
    milestones: [
      { name: "Wireframes", date: "2024-05-08", done: false },
      { name: "Prototype", date: "2024-05-15", done: false },
      { name: "Final UI", date: "2024-05-22", done: false },
    ],
    deadline: "2024-05-25",
    team: ["Alice", "Bob"],
  },
  {
    id: 2,
    name: "AI Chatbot Integration",
    description: "Integrate chatbot for HR queries.",
    milestones: [
      { name: "API Setup", date: "2024-05-10", done: false },
      { name: "Bot Training", date: "2024-05-18", done: false },
    ],
    deadline: "2024-05-28",
    team: ["Charlie", "Dana"],
  },
]

export default function ProjectDeadlines() {
  const [projects, setProjects] = useState(initialProjects)
  const [search, setSearch] = useState("")
  const [team, setTeam] = useState("All")
  const [month, setMonth] = useState("All")

  // Collect all unique team members and months
  const allTeam = Array.from(new Set(projects.flatMap((p) => p.team)))
  const allMonths = Array.from(new Set(projects.map((p) => p.deadline.slice(0, 7))))

  const filtered = projects.filter(
    (p) =>
      (team === "All" || p.team.includes(team)) &&
      (month === "All" || p.deadline.slice(0, 7) === month) &&
      (p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.team.some((t) => t.toLowerCase().includes(search.toLowerCase()))),
  )

  const toggleMilestone = (pid, mname) => {
    setProjects((ps) =>
      ps.map((p) =>
        p.id === pid
          ? {
              ...p,
              milestones: p.milestones.map((m) => (m.name === mname ? { ...m, done: !m.done } : m)),
            }
          : p,
      ),
    )
  }

  return (
    <section className="space-y-8">
      <div className="text-left">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 mb-4 shadow-lg">
          <Target className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-violet-700 to-purple-700 bg-clip-text text-transparent mb-2">
          Project Deadlines
        </h2>
        <p className="text-slate-600 dark:text-slate-300">Monitor project progress and ensure timely delivery</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="pl-12 pr-4 py-3 w-full rounded-xl bg-white dark:bg-slate-800 border border-violet-200 dark:border-violet-700 focus:ring-2 focus:ring-violet-500 focus:border-transparent shadow-sm transition-all duration-300"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-violet-400" size={20} />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Team:</label>
          <select
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            className="px-4 py-3 rounded-xl font-medium bg-white dark:bg-slate-800 border border-violet-200 dark:border-violet-700 focus:ring-2 focus:ring-violet-500 focus:border-transparent shadow-sm transition-all duration-300 w-36"
          >
            <option value="All">All Teams</option>
            {allTeam.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Month:</label>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="px-4 py-3 rounded-xl font-medium bg-white dark:bg-slate-800 border border-violet-200 dark:border-violet-700 focus:ring-2 focus:ring-violet-500 focus:border-transparent shadow-sm transition-all duration-300 w-36"
          >
            <option value="All">All Months</option>
            {allMonths.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-6">
        {filtered.map((p) => {
          const completedMilestones = p.milestones.filter((m) => m.done).length
          const totalMilestones = p.milestones.length
          const progressPercentage = (completedMilestones / totalMilestones) * 100

          return (
            <div
              key={p.id}
              className="group bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-violet-200 dark:border-violet-700 overflow-hidden"
            >
              <div className="h-1 bg-gradient-to-r from-violet-500 to-purple-500"></div>

              <div className="p-8">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="flex-1 space-y-6">
                    {/* Project header */}
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 shadow-lg">
                          <Layers className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{p.name}</h3>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 text-lg">{p.description}</p>
                    </div>

                    {/* Progress bar */}
                    <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Progress</span>
                        <span className="text-sm font-bold text-violet-600">{Math.round(progressPercentage)}%</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-violet-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {completedMilestones} of {totalMilestones} milestones completed
                      </div>
                    </div>

                    {/* Project details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                        <Users className="w-5 h-5 text-violet-500" />
                        <span className="font-medium">{p.team.join(", ")}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                        <Calendar className="w-5 h-5 text-violet-500" />
                        <span className="font-medium">Deadline: {p.deadline}</span>
                      </div>
                    </div>

                    {/* Milestones */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-violet-500" />
                        Milestones
                      </h4>
                      <div className="space-y-2">
                        {p.milestones.map((m) => (
                          <div
                            key={m.name}
                            className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl"
                          >
                            <button
                              onClick={() => toggleMilestone(p.id, m.name)}
                              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                                m.done
                                  ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg"
                                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 shadow-sm border border-emerald-200 dark:border-emerald-800"
                              }`}
                            >
                              <CheckCircle size={16} />
                              {m.done ? "Completed" : "Mark Done"}
                            </button>
                            <div className="flex-1">
                              <div className="font-medium text-slate-800 dark:text-slate-200">{m.name}</div>
                              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                <Clock size={14} />
                                {m.date}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action area */}
                  <div className="flex flex-col items-end gap-4">
                    <div className="text-right">
                      <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Deadline</div>
                      <div className="text-xl font-bold text-slate-800 dark:text-slate-100">{p.deadline}</div>
                    </div>

                    <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 rounded-xl">
                      <AlertCircle className="w-4 h-4 text-violet-600" />
                      <span className="text-sm font-medium text-violet-700 dark:text-violet-300">
                        {totalMilestones - completedMilestones} remaining
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Target className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <p className="text-xl text-slate-500 dark:text-slate-400">No projects found</p>
            <p className="text-slate-400 dark:text-slate-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </section>
  )
}
