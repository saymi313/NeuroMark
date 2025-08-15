import React from "react";
import { ArrowUpRight } from "lucide-react";
import Section from "./Section";

const careerData = {
  promotions: [
    { year: 2021, role: "Senior Engineer" }],
  skillGap: ["Docker", "Advanced Python"],
  training: ["Docker for Developers", "Advanced Python Bootcamp"]
};

export default function CareerReports({ search, setSearch }) {
  const filteredPromotions = careerData.promotions.filter(p => p.role.toLowerCase().includes(search.toLowerCase()));
  const filteredSkillGap = careerData.skillGap.filter(s => s.toLowerCase().includes(search.toLowerCase()));
  const filteredTraining = careerData.training.filter(t => t.toLowerCase().includes(search.toLowerCase()));
  const handleDownload = () => {
    let csv = "Type,Value\n";
    filteredPromotions.forEach(p => {
      csv += `Promotion,${p.year} - ${p.role}\n`;
    });
    filteredSkillGap.forEach(s => {
      csv += `Skill Gap,${s}\n`;
    });
    filteredTraining.forEach(t => {
      csv += `Training Recommendation,${t}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `career_report.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <Section icon={<ArrowUpRight size={24} className="text-green-500" />} title="Career Growth Reports" description="Track your promotions, skill gaps, and training recommendations." onDownload={handleDownload} search={search} setSearch={setSearch}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
          <div className="font-semibold mb-1">Promotions & Role Changes</div>
          <ul className="text-sm">
            {filteredPromotions.map((p, i) => (
              <li key={i}>{p.year}: {p.role}</li>
            ))}
          </ul>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
          <div className="font-semibold mb-1">Skill Gap Report</div>
          <ul className="text-sm">
            {filteredSkillGap.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 col-span-2">
          <div className="font-semibold mb-1">Training Recommendations</div>
          <ul className="text-sm">
            {filteredTraining.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
