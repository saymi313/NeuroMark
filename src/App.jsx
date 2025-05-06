import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import HomePage from './Pages/Home'
import Analytics from './Pages/Analytics';
import Settings from './Pages/Settings';
import Users from './Pages/Users';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route index element={<HomePage />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
        <Route path="users" element={<Users/>} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
