import React, { useState } from "react";
import { User, Edit, Mail, Phone, MapPin, Briefcase, Award, FileText, Calendar, Star, Globe, ShieldCheck, TrendingUp, Activity, CheckCircle, AlertCircle, Download, UploadCloud, MessageCircle, BookOpen, Layers, FileBadge, FileCheck2, FileWarning, FileLock, FileSearch, FileText as FileTextIcon, LogIn, Clock, Users, Building2, Map, ChevronDown } from "lucide-react";

// Mock data for demonstration
const initialProfile = {
  employeeId: "EMP-2024-001",
  fullName: "John Doe",
  profilePicture: "https://randomuser.me/api/portraits/men/32.jpg",
  dob: "1990-05-15",
  gender: "Male",
  contact: { phone: "+1 234 567 8901", email: "john.doe@email.com" },
  address: {
    current: "123 Main St, Springfield, USA",
    permanent: "456 Elm St, Shelbyville, USA"
  },
  emergency: {
    name: "Jane Doe",
    relation: "Spouse",
    phone: "+1 234 567 8902"
  },
  job: {
    department: "Engineering",
    title: "Senior Software Engineer",
    manager: "Sarah Smith",
    joining: "2018-09-01",
    type: "Full-time",
    status: "Active",
    location: "Springfield HQ"
  },
  skills: {
    technical: [
      { name: "React", level: "Expert" },
      { name: "Node.js", level: "Advanced" },
      { name: "Python", level: "Intermediate" }
    ],
    soft: ["Teamwork", "Communication", "Problem Solving"],
    certifications: ["AWS Certified Developer", "Scrum Master"],
    languages: ["English", "Spanish"]
  },
  aiSkillGap: [
    { suggestion: "Deepen Python skills", program: "Advanced Python Bootcamp" },
    { suggestion: "Learn Docker", program: "Docker for Developers" }
  ],
  workHistory: {
    previous: [
      { company: "TechSoft", role: "Developer", years: "2015-2018" }
    ],
    projects: ["Employee Portal Redesign", "AI Chatbot"],
    achievements: ["Employee of the Year 2022"],
    promotions: ["Promoted to Senior Engineer in 2021"]
  },
  attendance: {
    records: 98,
    overtime: 12,
    leaveBalance: 8,
    leaveHistory: [
      { type: "Annual", days: 5, date: "2024-03-10" },
      { type: "Sick", days: 2, date: "2024-01-15" }
    ]
  },
  performance: {
    kpis: [
      { name: "Project Delivery", score: 92 },
      { name: "Code Quality", score: 88 }
    ],
    appraisals: [
      { year: 2023, rating: "Excellent" },
      { year: 2022, rating: "Very Good" }
    ],
    aiPrediction: 89,
    careerPath: ["Lead Engineer", "Engineering Manager"]
  },
  payroll: {
    salary: "$90,000/year",
    payments: [
      { month: "March 2024", amount: "$7,500", status: "Paid" },
      { month: "February 2024", amount: "$7,500", status: "Paid" }
    ],
    tax: "$12,000/year",
    benefits: ["Health Insurance", "Stock Options"],
    provident: "$15,000"
  },
  documents: {
    resume: true,
    certificates: true,
    idProof: true,
    contract: true,
    aiVerified: true
  },
  system: {
    loginHistory: [
      { date: "2024-04-10", time: "09:01 AM" },
      { date: "2024-04-09", time: "09:03 AM" }
    ],
    lastUpdate: "2024-04-01",
    communications: [
      { type: "Feedback", date: "2024-03-20" },
      { type: "Survey", date: "2024-02-15" }
    ]
  }
};

const Section = ({ icon, title, children, description }) => (
  <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 mb-8 p-6">
    <div className="flex items-center mb-2">
      {icon}
      <h2 className="text-xl font-bold ml-2">{title}</h2>
    </div>
    {description && <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm">{description}</p>}
    {children}
  </section>
);

export default function Profile() {
  const [profile, setProfile] = useState(initialProfile);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(initialProfile);
  const [success, setSuccess] = useState("");
  const [picPreview, setPicPreview] = useState(initialProfile.profilePicture);

  const handleEdit = () => {
    setEditData(profile);
    setPicPreview(profile.profilePicture);
    setEditMode(true);
    setSuccess("");
  };

  const handleCancel = () => {
    setEditMode(false);
    setSuccess("");
  };

  const handleChange = (section, field, value) => {
    setEditData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleBasicChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPicPreview(reader.result);
        setEditData((prev) => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setProfile(editData);
    setEditMode(false);
    setSuccess("Profile updated successfully!");
    setTimeout(() => setSuccess(""), 3000);
  };

  const p = editMode ? editData : profile;

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-bold">My Profile</h1>
        {!editMode && (
          <button onClick={handleEdit} className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
            <Edit size={18} /> Edit Profile
          </button>
        )}
      </div>
      {success && <div className="mb-4 p-3 bg-green-100 text-green-800 rounded shadow text-center">{success}</div>}
      <Section
        icon={<User size={24} className="text-purple-500" />}
        title="Basic Information"
        description="Your core personal details. Keep them up to date for HR and payroll accuracy."
      >
        <form onSubmit={handleSave} className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex flex-col items-center gap-2">
            <img src={picPreview} alt="Profile" className="w-28 h-28 rounded-full object-cover border-4 border-purple-200 shadow" />
            {editMode && (
              <label className="block mt-2">
                <span className="text-xs text-gray-500">Change Picture</span>
                <input type="file" accept="image/*" onChange={handlePicChange} className="block mt-1 text-xs" />
              </label>
            )}
          </div>
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><span className="font-semibold">Employee ID:</span> {p.employeeId}</div>
            <div>
              <span className="font-semibold">Full Name:</span>{" "}
              {editMode ? (
                <input type="text" value={p.fullName} onChange={e => handleBasicChange("fullName", e.target.value)} className="input input-bordered w-full mt-1" />
              ) : p.fullName}
            </div>
            <div>
              <span className="font-semibold">Date of Birth:</span>{" "}
              {editMode ? (
                <input type="date" value={p.dob} onChange={e => handleBasicChange("dob", e.target.value)} className="input input-bordered w-full mt-1" />
              ) : p.dob}
            </div>
            <div>
              <span className="font-semibold">Gender:</span>{" "}
              {editMode ? (
                <select value={p.gender} onChange={e => handleBasicChange("gender", e.target.value)} className="input input-bordered w-full mt-1">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              ) : p.gender}
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} />
              {editMode ? (
                <input type="email" value={p.contact.email} onChange={e => handleChange("contact", "email", e.target.value)} className="input input-bordered w-full mt-1" />
              ) : <span>{p.contact.email}</span>}
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} />
              {editMode ? (
                <input type="text" value={p.contact.phone} onChange={e => handleChange("contact", "phone", e.target.value)} className="input input-bordered w-full mt-1" />
              ) : <span>{p.contact.phone}</span>}
            </div>
            <div>
              <span className="font-semibold">Current Address:</span>{" "}
              {editMode ? (
                <input type="text" value={p.address.current} onChange={e => handleChange("address", "current", e.target.value)} className="input input-bordered w-full mt-1" />
              ) : p.address.current}
            </div>
            <div>
              <span className="font-semibold">Permanent Address:</span>{" "}
              {editMode ? (
                <input type="text" value={p.address.permanent} onChange={e => handleChange("address", "permanent", e.target.value)} className="input input-bordered w-full mt-1" />
              ) : p.address.permanent}
            </div>
            <div className="col-span-2">
              <span className="font-semibold">Emergency Contact:</span>{" "}
              {editMode ? (
                <>
                  <input type="text" value={p.emergency.name} onChange={e => handleChange("emergency", "name", e.target.value)} className="input input-bordered w-full mt-1 mr-2" placeholder="Name" />
                  <input type="text" value={p.emergency.relation} onChange={e => handleChange("emergency", "relation", e.target.value)} className="input input-bordered w-full mt-1 mr-2" placeholder="Relation" />
                  <input type="text" value={p.emergency.phone} onChange={e => handleChange("emergency", "phone", e.target.value)} className="input input-bordered w-full mt-1" placeholder="Phone" />
                </>
              ) : `${p.emergency.name} (${p.emergency.relation}), ${p.emergency.phone}`}
            </div>
          </div>
          {editMode && (
            <div className="col-span-2 flex gap-2 mt-4">
              <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Save</button>
              <button type="button" onClick={handleCancel} className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">Cancel</button>
            </div>
          )}
        </form>
      </Section>
      {/* The rest of the profile sections remain unchanged, using 'p' for data */}
      {/* ...existing sections for Job, Skills, Work History, etc... */}
      <Section
        icon={<Briefcase size={24} className="text-blue-500" />}
        title="Job & Company Details"
        description="Your current role and employment status."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><span className="font-semibold">Department:</span> {p.job.department}</div>
          <div><span className="font-semibold">Job Title:</span> {p.job.title}</div>
          <div><span className="font-semibold">Reporting Manager:</span> {p.job.manager}</div>
          <div><span className="font-semibold">Date of Joining:</span> {p.job.joining}</div>
          <div><span className="font-semibold">Employment Type:</span> {p.job.type}</div>
          <div><span className="font-semibold">Employee Status:</span> {p.job.status}</div>
          <div><span className="font-semibold">Work Location:</span> {p.job.location}</div>
        </div>
      </Section>
      <Section
        icon={<Star size={24} className="text-yellow-500" />}
        title="Skills & Competencies"
        description="Showcase your skills and discover areas for growth."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
          <div>
            <div className="font-semibold mb-1">Technical Skills</div>
            <ul>
              {p.skills.technical.map((s) => (
                <li key={s.name} className="flex items-center gap-2 mb-1">
                  <span className="inline-block w-24">{s.name}</span>
                  <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs font-medium">{s.level}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-1">Soft Skills</div>
            <ul className="flex flex-wrap gap-2">
              {p.skills.soft.map((s) => (
                <li key={s} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-medium">{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-1">Certifications & Licenses</div>
            <ul className="flex flex-wrap gap-2">
              {p.skills.certifications.map((c) => (
                <li key={c} className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium">{c}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-1">Languages Known</div>
            <ul className="flex flex-wrap gap-2">
              {p.skills.languages.map((l) => (
                <li key={l} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs font-medium">{l}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-2">
          <div className="font-semibold mb-1 flex items-center gap-2"><AlertCircle size={16} className="text-orange-500" /> AI Skill Gap Analysis</div>
          <ul className="list-disc ml-6 text-sm">
            {p.aiSkillGap.map((g, i) => (
              <li key={i}><span className="font-medium">{g.suggestion}</span> &mdash; <span className="text-purple-700">Suggested: {g.program}</span></li>
            ))}
          </ul>
        </div>
      </Section>
      <Section
        icon={<Layers size={24} className="text-indigo-500" />}
        title="Work History"
        description="Your professional journey and achievements."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
          <div>
            <div className="font-semibold mb-1">Previous Roles & Companies</div>
            <ul>
              {p.workHistory.previous.map((w, i) => (
                <li key={i}>{w.role} at {w.company} ({w.years})</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-1">Projects Worked On</div>
            <ul>
              {p.workHistory.projects.map((proj, i) => (
                <li key={i}>{proj}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-1">Achievements / Awards</div>
            <ul>
              {p.workHistory.achievements.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-1">Internal Promotions</div>
            <ul>
              {p.workHistory.promotions.map((pr, i) => (
                <li key={i}>{pr}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
      <Section
        icon={<Calendar size={24} className="text-pink-500" />}
        title="Attendance & Leave Data"
        description="Track your attendance, overtime, and leave balances."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
          <div><span className="font-semibold">Attendance Records:</span> {p.attendance.records} days</div>
          <div><span className="font-semibold">Overtime Hours:</span> {p.attendance.overtime} hrs</div>
          <div><span className="font-semibold">Leave Balance:</span> {p.attendance.leaveBalance} days</div>
        </div>
        <div className="mt-2">
          <div className="font-semibold mb-1">Leave History</div>
          <ul className="list-disc ml-6 text-sm">
            {p.attendance.leaveHistory.map((l, i) => (
              <li key={i}>{l.type} Leave: {l.days} days on {l.date}</li>
            ))}
          </ul>
        </div>
      </Section>
      <Section
        icon={<TrendingUp size={24} className="text-green-500" />}
        title="Performance & Goals"
        description="Monitor your KPIs, appraisals, and get AI-powered career advice."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
          <div>
            <div className="font-semibold mb-1">Key Performance Indicators (KPIs)</div>
            <ul>
              {p.performance.kpis.map((k, i) => (
                <li key={i}>{k.name}: <span className="font-medium text-green-700">{k.score}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-1">Appraisal History</div>
            <ul>
              {p.performance.appraisals.map((a, i) => (
                <li key={i}>{a.year}: {a.rating}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-2">
          <div className="font-semibold mb-1 flex items-center gap-2"><Activity size={16} className="text-blue-500" /> AI-based Performance Predictions</div>
          <div className="text-sm mb-2">Predicted future performance score: <span className="font-bold text-blue-700">{p.performance.aiPrediction}</span></div>
          <div className="font-semibold mb-1 flex items-center gap-2"><BookOpen size={16} className="text-purple-500" /> Career Path Suggestions</div>
          <ul className="list-disc ml-6 text-sm">
            {p.performance.careerPath.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      </Section>
      <Section
        icon={<FileTextIcon size={24} className="text-orange-500" />}
        title="Payroll & Benefits"
        description="Your salary, benefits, and tax details."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
          <div><span className="font-semibold">Salary Structure:</span> {p.payroll.salary}</div>
          <div><span className="font-semibold">Tax Details:</span> {p.payroll.tax}</div>
          <div><span className="font-semibold">Provident Fund:</span> {p.payroll.provident}</div>
        </div>
        <div className="mt-2">
          <div className="font-semibold mb-1">Payment History</div>
          <ul className="list-disc ml-6 text-sm">
            {p.payroll.payments.map((pay, i) => (
              <li key={i}>{pay.month}: {pay.amount} ({pay.status})</li>
            ))}
          </ul>
        </div>
        <div className="mt-2">
          <div className="font-semibold mb-1">Benefits & Allowances</div>
          <ul className="flex flex-wrap gap-2">
            {p.payroll.benefits.map((b, i) => (
              <li key={i} className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs font-medium">{b}</li>
            ))}
          </ul>
        </div>
      </Section>
      <Section
        icon={<FileCheck2 size={24} className="text-teal-500" />}
        title="Documents"
        description="Your important documents and their verification status."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
          <div className="flex items-center gap-2"><FileText size={16} /> Resume / CV: <span className={p.documents.resume ? "text-green-600" : "text-red-600"}>{p.documents.resume ? "Uploaded" : "Missing"}</span></div>
          <div className="flex items-center gap-2"><FileBadge size={16} /> Educational Certificates: <span className={p.documents.certificates ? "text-green-600" : "text-red-600"}>{p.documents.certificates ? "Uploaded" : "Missing"}</span></div>
          <div className="flex items-center gap-2"><FileLock size={16} /> ID Proof: <span className={p.documents.idProof ? "text-green-600" : "text-red-600"}>{p.documents.idProof ? "Uploaded" : "Missing"}</span></div>
          <div className="flex items-center gap-2"><FileTextIcon size={16} /> Employment Contract: <span className={p.documents.contract ? "text-green-600" : "text-red-600"}>{p.documents.contract ? "Uploaded" : "Missing"}</span></div>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <ShieldCheck size={18} className={p.documents.aiVerified ? "text-green-500" : "text-red-500"} />
          <span className={p.documents.aiVerified ? "text-green-700" : "text-red-700"}>
            AI Document Verification: {p.documents.aiVerified ? "Verified" : "Not Verified"}
          </span>
        </div>
      </Section>
      <Section
        icon={<Activity size={24} className="text-gray-500" />}
        title="System Activity"
        description="Your recent activity and communication logs."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
          <div>
            <div className="font-semibold mb-1">Login History</div>
            <ul className="list-disc ml-6 text-sm">
              {p.system.loginHistory.map((l, i) => (
                <li key={i}>{l.date} at {l.time}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-1">Last Profile Update</div>
            <div>{p.system.lastUpdate}</div>
          </div>
        </div>
        <div className="mt-2">
          <div className="font-semibold mb-1">Internal Communication Logs</div>
          <ul className="list-disc ml-6 text-sm">
            {p.system.communications.map((c, i) => (
              <li key={i}>{c.type} on {c.date}</li>
            ))}
          </ul>
        </div>
      </Section>
    </div>
  );
}
