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
import EmployeeAttendance from "./portals/employee/pages/Attendance";
import Profile from "./portals/employee/pages/Profile";
import Reports from "./portals/employee/pages/Reports";
import Schedule from "./portals/employee/pages/Schedule";
import Chat from "./portals/employee/pages/Chat";

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
          <Route path="attendance" element={<EmployeeAttendance />} />
          <Route path="leave-request" element={<LeaveRequest />} />
          <Route path="chat" element={<Chat />} />
          <Route path="profile" element={<Profile />} />
          <Route path="reports" element={<Reports />} />
          <Route path="schedule" element={<Schedule />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
