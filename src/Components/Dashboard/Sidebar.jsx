import { NavLink } from 'react-router-dom';
import { Home, BarChart2, Settings } from 'lucide-react';

const Sidebar = () => {
  return (
    <>
    <NavLink to="/">
      <h2 className="text-2xl font-bold mb-8 font-azonix text-white p-4">NeuroMark</h2>
      </NavLink>
      <nav className="flex flex-col gap-4 px-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded text-white ${isActive ? 'bg-gray-600' : 'hover:bg-gray-700'}`
          }
        >
          <Home size={18} />
          Home
        </NavLink>
        <NavLink
          to="/stats"
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded text-white ${isActive ? 'bg-gray-600' : 'hover:bg-gray-700'}`
          }
        >
          <BarChart2 size={18} />
          Statistics
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded text-white ${isActive ? 'bg-gray-600' : 'hover:bg-gray-700'}`
          }
        >
          <Settings size={18} />
          Settings
        </NavLink>
      </nav>
    </>
  );
};

export default Sidebar;
