"use client"

import { ChevronDown } from "lucide-react"

export default function ScheduleFilters({
  view,
  setView,
  category,
  setCategory,
  search,
  setSearch,
  views,
  categories,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <div className="flex gap-4">
        <div className="relative">
          <select
            value={view}
            onChange={(e) => setView(e.target.value)}
            className="appearance-none bg-white dark:bg-slate-800 border border-purple-200 dark:border-purple-700 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm hover:shadow-md transition-shadow"
          >
            {views.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="appearance-none bg-white dark:bg-slate-800 border border-purple-200 dark:border-purple-700 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm hover:shadow-md transition-shadow"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
      </div>

      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search schedule..."
          className="pl-8 pr-3 py-2 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-purple-200 dark:border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm hover:shadow-md transition-shadow"
        />
        <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-400">🔍</span>
      </div>
    </div>
  )
}
