import LoginForm from "./portals/admin/components/Login/LoginForm";
import SignUpForm from "./portals/admin/components/Signup/SignupForm";
import Dashboard from "./portals/admin/components/Dashboard/Dashboard";
import HomePage from "./portals/admin/pages/Home";
import Settings from "./portals/admin/pages/Settings";
import { Routes, Route, Navigate } from "react-router-dom";
import OnboardingPage from "./portals/admin/components/Onboarding";
import Analytics from "./portals/admin/pages/Analytics/index";
import Users from "./portals/admin/pages/Users";
import Attendance from "./portals/admin/pages/Attendance";
import LeaveManagement from "./portals/admin/pages/LeaveManagement";

// Employee Portal Components
import EmployeeDashboard from "./portals/employee/components/Dashboard/Dashboard";
import EmployeeHome from "./portals/employee/pages/Home";
import LeaveRequest from "./portals/employee/pages/LeaveRequest";

import "./App.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<OnboardingPage />} />
        <Route path="/SignUp" element={<SignUpForm />} />
        <Route path="/Login" element={<LoginForm />} />
        
        {/* Admin Portal Routes */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<HomePage />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
          <Route path="users" element={<Users />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="leave-management" element={<LeaveManagement />} />
        </Route>

        {/* Employee Portal Routes */}
        <Route path="/employee" element={<EmployeeDashboard />}>
          <Route index element={<EmployeeHome />} />
          <Route path="attendance" element={<div className="p-6"><h2 className="text-2xl font-bold">My Attendance</h2><p>Employee attendance page coming soon...</p></div>} />
          <Route path="leave-request" element={<LeaveRequest />} />
          <Route path="profile" element={<div className="p-6"><h2 className="text-2xl font-bold">My Profile</h2><p>Employee profile page coming soon...</p></div>} />
          <Route path="reports" element={<div className="p-6"><h2 className="text-2xl font-bold">Reports</h2><p>Employee reports page coming soon...</p></div>} />
          <Route path="schedule" element={<div className="p-6"><h2 className="text-2xl font-bold">Schedule</h2><p>Employee schedule page coming soon...</p></div>} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
