import React, { useState } from "react";
import { Calendar, TrendingUp, FileText, ShieldCheck, Layers, Smile, ArrowUpRight } from "lucide-react";
import PerformanceReports from "../../components/ReportsComponents/PerformanceReports";
import PayrollReports from "../../components/ReportsComponents/PayrollReports";
import ComplianceReports from "../../components/ReportsComponents/ComplianceReports";
import ProjectReports from "../../components/ReportsComponents/ProjectReports";
import EngagementReports from "../../components/ReportsComponents/EngagementReports";
import CareerReports from "../../components/ReportsComponents/CareerReports";

const TABS = [
  // { key: "attendance", label: "Attendance & Time", icon: <Calendar size={18} /> },
  { key: "performance", label: "Performance", icon: <TrendingUp size={18} /> },
  { key: "payroll", label: "Payroll & Compensation", icon: <FileText size={18} /> },
  { key: "compliance", label: "Compliance & Policy", icon: <ShieldCheck size={18} /> },
  { key: "project", label: "Project & Task", icon: <Layers size={18} /> },
  { key: "engagement", label: "Engagement & Feedback", icon: <Smile size={18} /> },
  { key: "career", label: "Career Growth", icon: <ArrowUpRight size={18} /> },
];

export default function Reports() {
  const [activeTab, setActiveTab] = useState(TABS[0].key);
  const [search, setSearch] = useState("");

  let content;
  switch (activeTab) {
    // case "attendance":
    //   content = <AttendanceReports search={search} setSearch={setSearch} />; break;
    case "performance":
      content = <PerformanceReports search={search} setSearch={setSearch} />; break;
    case "payroll":
      content = <PayrollReports search={search} setSearch={setSearch} />; break;
    case "compliance":
      content = <ComplianceReports search={search} setSearch={setSearch} />; break;
    case "project":
      content = <ProjectReports search={search} setSearch={setSearch} />; break;
    case "engagement":
      content = <EngagementReports search={search} setSearch={setSearch} />; break;
    case "career":
      content = <CareerReports search={search} setSearch={setSearch} />; break;
    default:
      content = null;
  }

  return (
    <div className="max-w-5xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Employee Reports</h1>
      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => { setActiveTab(tab.key); setSearch(""); }}
            className={`flex items-center gap-1 px-4 py-2 rounded-t-lg font-medium transition-colors ${activeTab === tab.key ? "bg-purple-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-purple-900/20"}`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>
      <div>
        {content}
      </div>
    </div>
  );
}
