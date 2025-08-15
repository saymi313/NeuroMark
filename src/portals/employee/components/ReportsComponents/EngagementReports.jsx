import React from "react";
import { Smile } from "lucide-react";
import Section from "./Section";

const engagementData = {
  satisfaction: 87,
  feedback: [
    { type: "Peer", trend: "Positive" },
    { type: "Manager", trend: "Very Positive" }
  ]
};

export default function EngagementReports({ search, setSearch }) {
  const filteredFeedback = engagementData.feedback.filter(f => f.type.toLowerCase().includes(search.toLowerCase()));
  const handleDownload = () => {
    let csv = `Satisfaction,${engagementData.satisfaction}\n`;
    filteredFeedback.forEach(f => {
      csv += `Feedback ${f.type},${f.trend}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `engagement_report.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <Section icon={<Smile size={24} className="text-pink-500" />} title="Engagement & Feedback Reports" description="See your survey results and feedback trends." onDownload={handleDownload} search={search} setSearch={setSearch}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-4">
          <div className="font-semibold mb-1">Employee Satisfaction Survey</div>
          <div className="text-lg font-bold text-pink-700">{engagementData.satisfaction}%</div>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <div className="font-semibold mb-1">Feedback Trends</div>
          <ul className="text-sm">
            {filteredFeedback.map((f, i) => (
              <li key={i}>{f.type}: {f.trend}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
