import React from "react";
import { Layers } from "lucide-react";
import Section from "./Section";

const projectData = {
  projects: [
    { name: "Portal Redesign", assigned: 10, completed: 9, delayed: 1 },
    { name: "AI Chatbot", assigned: 5, completed: 5, delayed: 0 }
  ],
  billable: 120,
  nonBillable: 30,
  feedback: [
    { client: "Acme Corp", feedback: "Great work!" }
  ]
};

export default function ProjectReports({ search, setSearch }) {
  const filteredProjects = projectData.projects.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  const filteredFeedback = projectData.feedback.filter(f => f.client.toLowerCase().includes(search.toLowerCase()));
  const handleDownload = () => {
    let csv = "Project,Assigned,Completed,Delayed\n";
    filteredProjects.forEach(p => {
      csv += `${p.name},${p.assigned},${p.completed},${p.delayed}\n`;
    });
    csv += "\nClient,Feedback\n";
    filteredFeedback.forEach(f => {
      csv += `${f.client},${f.feedback}\n`;
    });
    csv += `Billable Hours,${projectData.billable}\nNon-billable Hours,${projectData.nonBillable}\n`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `project_report.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <Section icon={<Layers size={24} className="text-indigo-500" />} title="Project & Task Reports" description="Analyze your project participation and client feedback." onDownload={handleDownload} search={search} setSearch={setSearch}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4">
          <div className="font-semibold mb-1">Project Participation</div>
          <ul className="text-sm">
            {filteredProjects.map((p) => (
              <li key={p.name}>{p.name}: Assigned {p.assigned}, Completed {p.completed}, Delayed {p.delayed}</li>
            ))}
          </ul>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <div className="font-semibold mb-1">Billable vs Non-billable Hours</div>
          <div className="text-sm">Billable: {projectData.billable} hrs, Non-billable: {projectData.nonBillable} hrs</div>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 col-span-2">
          <div className="font-semibold mb-1">Client Feedback</div>
          <ul className="text-sm">
            {filteredFeedback.map((f, i) => (
              <li key={i}>{f.client}: {f.feedback}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
