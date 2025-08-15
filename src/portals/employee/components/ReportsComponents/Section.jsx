import React from "react";
import { Search, Download } from "lucide-react";

export default function Section({ icon, title, description, children, onDownload, search, setSearch }) {
  return (
    <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 mb-8 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-2">
        <div className="flex items-center">
          {icon}
          <h2 className="text-xl font-bold ml-2">{title}</h2>
        </div>
        <div className="flex gap-2 items-center mt-2 md:mt-0">
          {typeof search !== 'undefined' && setSearch && (
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search..."
                className="pl-8 pr-3 py-1.5 rounded-md text-sm dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-1 focus:ring-purple-500"
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
          )}
          {onDownload && (
            <button onClick={onDownload} className="flex items-center gap-1 px-3 py-1.5 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm">
              <Download size={16} /> Download
            </button>
          )}
        </div>
      </div>
      {description && <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm">{description}</p>}
      {children}
    </section>
  );
}
