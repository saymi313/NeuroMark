import React from "react";
import { FileText } from "lucide-react";
import Section from "./Section";

const payrollData = {
  salarySlips: [
    { month: "March 2024", amount: "$7,500", download: true },
    { month: "February 2024", amount: "$7,500", download: true }
  ],
  tax: "$1,200",
  deductions: "$300",
  benefits: ["Health Insurance", "Stock Options"],
  bonus: [
    { year: 2023, amount: "$2,000" },
    { year: 2022, amount: "$1,500" }
  ]
};

export default function PayrollReports({ search, setSearch }) {
  const filteredSlips = payrollData.salarySlips.filter(s => s.month.toLowerCase().includes(search.toLowerCase()));
  const handleDownload = () => {
    let csv = "Month,Amount\n";
    filteredSlips.forEach(s => {
      csv += `${s.month},${s.amount}\n`;
    });
    csv += `Tax,${payrollData.tax}\nDeductions,${payrollData.deductions}\n`;
    payrollData.benefits.forEach(b => {
      csv += `Benefit,${b}\n`;
    });
    payrollData.bonus.forEach(b => {
      csv += `Bonus ${b.year},${b.amount}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `payroll_report.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <Section icon={<FileText size={24} className="text-orange-500" />} title="Payroll & Compensation Reports" description="View your salary slips, tax, benefits, and bonus history." onDownload={handleDownload} search={search} setSearch={setSearch}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
          <div className="font-semibold mb-1">Salary Slip Report</div>
          <ul className="text-sm">
            {filteredSlips.map((s) => (
              <li key={s.month}>{s.month}: {s.amount} <button className="ml-2 text-xs text-blue-600 underline">{s.download ? "Download" : "View"}</button></li>
            ))}
          </ul>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
          <div className="font-semibold mb-1">Tax & Deductions</div>
          <div className="text-sm">Tax: {payrollData.tax}, Deductions: {payrollData.deductions}</div>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
          <div className="font-semibold mb-1">Benefits & Allowances</div>
          <ul className="flex flex-wrap gap-2 text-xs">
            {payrollData.benefits.map((b) => (
              <li key={b} className="bg-green-100 text-green-700 px-2 py-0.5 rounded">{b}</li>
            ))}
          </ul>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
          <div className="font-semibold mb-1">Bonus & Incentive History</div>
          <ul className="text-sm">
            {payrollData.bonus.map((b) => (
              <li key={b.year}>{b.year}: {b.amount}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
