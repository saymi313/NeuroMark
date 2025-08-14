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

import "./App.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<OnboardingPage />} />
        <Route path="/SignUp" element={<SignUpForm />} />
        <Route path="/Login" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<HomePage />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
          <Route path="users" element={<Users />} />
          <Route path="attendance" element={<Attendance />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
