
import LoginForm from './Components/Login/LoginForm';
import SignUpForm from './Components/Signup/SignupForm';
import Dashboard from './Components/Dashboard/Dashboard';
import HomePage from './Pages/Home'
import Settings from './Pages/Settings';
import { Routes, Route, Navigate } from 'react-router-dom';
import Analytics from './Pages/Anaytics';
function App() {
  return (
<div>
  <Routes>
<Route path="/" element= { <SignUpForm/>}/>
 <Route path='/Login' element={ <LoginForm/>}/>
 <Route path="/Dashboard" element={<Dashboard/>}>
 <Route index element={<HomePage />} />
 <Route path="stats" element={<Analytics />} />
<Route path="settings" element={<Settings />} />
</Route>
<Route path="*" element={<Navigate to="/" replace />} /> 
  </Routes>
 </div>
    );
}

export default App;
