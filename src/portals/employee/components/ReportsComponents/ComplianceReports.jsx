import React from "react";
import { ShieldCheck } from "lucide-react";
import Section from "./Section";

const complianceData = {
  trainings: [
    { name: "Security Awareness", completed: true },
    { name: "Workplace Safety", completed: false }
  ],
  policies: [
    { name: "NDA", signed: true },
    { name: "Code of Conduct", signed: true }
  ],
  certifications: [
    { name: "AWS Developer", validTill: "2025-06-01" },
    { name: "Scrum Master", validTill: "2024-12-31" }
  ]
};

export default function ComplianceReports({ search, setSearch }) {
  const filteredTrainings = complianceData.trainings.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));
  const filteredPolicies = complianceData.policies.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  const filteredCerts = complianceData.certifications.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  const handleDownload = () => {
    let csv = "Type,Name,Status\n";
    filteredTrainings.forEach(t => {
      csv += `Training,${t.name},${t.completed ? "Completed" : "Pending"}\n`;
    });
    filteredPolicies.forEach(p => {
      csv += `Policy,${p.name},${p.signed ? "Signed" : "Pending"}\n`;
    });
    filteredCerts.forEach(c => {
      csv += `Certification,${c.name},Valid till ${c.validTill}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compliance_report.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <Section icon={<ShieldCheck size={24} className="text-blue-500" />} title="Compliance & Policy Reports" description="Stay compliant with mandatory trainings and policy acknowledgements." onDownload={handleDownload} search={search} setSearch={setSearch}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <div className="font-semibold mb-1">Mandatory Training Completion</div>
          <ul className="text-sm">
            {filteredTrainings.map((t) => (
              <li key={t.name}>{t.name}: {t.completed ? <span className="text-green-700">Completed</span> : <span className="text-red-600">Pending</span>}</li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800/40 rounded-lg p-4">
          <div className="font-semibold mb-1">Policy Acknowledgement</div>
          <ul className="text-sm">
            {filteredPolicies.map((p) => (
              <li key={p.name}>{p.name}: {p.signed ? <span className="text-green-700">Signed</span> : <span className="text-red-600">Pending</span>}</li>
            ))}
          </ul>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 col-span-2">
          <div className="font-semibold mb-1">Certification Validity</div>
          <ul className="text-sm">
            {filteredCerts.map((c) => (
              <li key={c.name}>{c.name}: Valid till {c.validTill}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
