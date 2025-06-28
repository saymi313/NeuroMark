import LoginForm from "./Components/Login/LoginForm";
import SignUpForm from "./Components/Signup/SignupForm";
import Dashboard from "./Components/Dashboard/Dashboard";
import HomePage from "./Pages/Home";
import Settings from "./Pages/Settings";
import { Routes, Route, Navigate } from "react-router-dom";
import OnboardingPage from "./Components/Onboarding";
import Analytics from "./Pages/Analytics/index";
import Users from "./Pages/Users";
import Attendance from "./Pages/Attendance";
// import SignUp from './Components/Signup/SignupForm';
// import Login from './Components/Login/LoginForm';

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
