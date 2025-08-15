"use client"

import { useState } from "react"
import Meetings from "../../components/ScheduleComponents/Meetings"
import Tasks from "../../components/ScheduleComponents/Tasks"
import ProjectDeadlines from "../../components/ScheduleComponents/ProjectDeadlines"
import ScheduleCalendar from "../../components/ScheduleComponents/ScheduleCalendar"
import { Calendar, CheckSquare, Target, Grid3X3 } from "lucide-react"

const TABS = [
  { key: "meetings", label: "Meetings", icon: Calendar, color: "from-purple-600 to-violet-600" },
  { key: "tasks", label: "Tasks", icon: CheckSquare, color: "from-indigo-600 to-purple-600" },
  { key: "projects", label: "Project Deadlines", icon: Target, color: "from-violet-600 to-purple-600" },
  { key: "calendar", label: "Calendar", icon: Grid3X3, color: "from-purple-600 to-indigo-600" },
]

export default function Schedule() {
  const [activeTab, setActiveTab] = useState("meetings")

  let content
  switch (activeTab) {
    case "meetings":
      content = <Meetings />
      break
    case "tasks":
      content = <Tasks />
      break
    case "projects":
      content = <ProjectDeadlines />
      break
    case "calendar":
      content = <ScheduleCalendar />
      break
    default:
      content = null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 dark:from-slate-900 dark:via-purple-900/20 dark:to-indigo-900/20">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black dark:text-white mb-2 text-left">Schedule Hub</h1>
          <p className="text-slate-600 dark:text-slate-300 text-left">
            Manage your meetings, tasks, and deadlines efficiently
          </p>
        </div>

        <div className="flex flex-wrap gap-8 mb-8 border-b border-slate-200 dark:border-slate-700">
          {TABS.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`group relative px-2 py-4 font-medium text-sm transition-all duration-300 ${
                  activeTab === tab.key
                    ? "text-purple-600 dark:text-purple-400"
                    : "text-slate-600 dark:text-slate-400 hover:text-purple-500 dark:hover:text-purple-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon
                    className={`w-4 h-4 transition-transform duration-300 ${activeTab === tab.key ? "scale-110" : "group-hover:scale-105"}`}
                  />
                  <span>{tab.label}</span>
                </div>
                {activeTab === tab.key && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-violet-600 rounded-full"></div>
                )}
              </button>
            )
          })}
        </div>

        <main className="transition-all duration-500 ease-in-out">{content}</main>
      </div>
    </div>
  )
}
