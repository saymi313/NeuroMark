import React from "react";
import { TrendingUp } from "lucide-react";
import Section from "./Section";

const performanceData = {
  annual: { year: 2023, kpis: 90, rating: "Excellent", feedback: "Consistently exceeded expectations." },
  quarterly: [
    { quarter: "Q1", kpis: 88, rating: "Very Good" },
    { quarter: "Q2", kpis: 91, rating: "Excellent" }
  ],
  productivity: [
    { month: "Jan", rate: 92 },
    { month: "Feb", rate: 89 },
    { month: "Mar", rate: 95 }
  ],
  goals: [
    { goal: "OKR: Launch Portal", progress: 100 },
    { goal: "SMART: Improve Code Quality", progress: 80 }
  ],
  training: { before: 75, after: 88 }
};

export default function PerformanceReports({ search, setSearch }) {
  const filteredGoals = performanceData.goals.filter(g => g.goal.toLowerCase().includes(search.toLowerCase()));
  const handleDownload = () => {
    let csv = "Type,Value\n";
    csv += `Annual KPIs,${performanceData.annual.kpis}\nAnnual Rating,${performanceData.annual.rating}\nAnnual Feedback,${performanceData.annual.feedback}\n`;
    performanceData.quarterly.forEach(q => {
      csv += `Quarter ${q.quarter} KPIs,${q.kpis}\nQuarter ${q.quarter} Rating,${q.rating}\n`;
    });
    performanceData.productivity.forEach(p => {
      csv += `Productivity ${p.month},${p.rate}\n`;
    });
    filteredGoals.forEach(g => {
      csv += `Goal ${g.goal},${g.progress}\n`;
    });
    csv += `Training Before,${performanceData.training.before}\nTraining After,${performanceData.training.after}\n`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `performance_report.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <Section icon={<TrendingUp size={24} className="text-green-500" />} title="Performance Reports" description="Review your performance, productivity, and training impact." onDownload={handleDownload} search={search} setSearch={setSearch}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
          <div className="font-semibold mb-1">Annual Performance Review</div>
          <div className="text-sm">Year: {performanceData.annual.year}, KPIs: {performanceData.annual.kpis}, Rating: <span className="font-bold text-green-700">{performanceData.annual.rating}</span></div>
          <div className="text-xs text-gray-500">Manager Feedback: {performanceData.annual.feedback}</div>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <div className="font-semibold mb-1">Quarterly Performance</div>
          <ul className="text-sm">
            {performanceData.quarterly.map((q) => (
              <li key={q.quarter}>{q.quarter}: KPIs {q.kpis}, Rating: {q.rating}</li>
            ))}
          </ul>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
          <div className="font-semibold mb-1">Productivity Trends</div>
          <ul className="text-sm">
            {performanceData.productivity.map((p) => (
              <li key={p.month}>{p.month}: {p.rate}%</li>
            ))}
          </ul>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
          <div className="font-semibold mb-1">Goal Achievement Report</div>
          <ul className="text-sm">
            {filteredGoals.map((g) => (
              <li key={g.goal}>{g.goal}: {g.progress}%</li>
            ))}
          </ul>
        </div>
        <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-4 col-span-2">
          <div className="font-semibold mb-1">Training & Development Impact</div>
          <div className="text-sm">Before Training: {performanceData.training.before} | After Training: {performanceData.training.after}</div>
        </div>
      </div>
    </Section>
  );
}
