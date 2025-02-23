import { NavLink } from "react-router-dom";
import {
  FaChartBar,
  FaBell,
  FaFileAlt,
  FaCog,
  FaTachometerAlt,
} from "react-icons/fa";
import logo from "../../assets/ICollab_Logo.png";

const Sidebar = () => {
  return (
    <div className="h-screen w-1/5 bg-gray-900 text-white flex flex-col p-4">

      <div className="bg-white mb-8 mt-2">
        <img src={logo} alt="logo" className="w-2/3 h-16"/>
      </div>

      <nav className="flex flex-col space-y-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 ${
              isActive ? "bg-gray-500" : ""
            }`
          }
        >
          <FaTachometerAlt /> Dashboard
        </NavLink>
        <NavLink
          to="/admin/notification"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 ${
              isActive ? "bg-gray-500" : ""
            }`
          }
        >
          <FaBell /> Notification
        </NavLink>
        <NavLink
          to="/admin/report"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 ${
              isActive ? "bg-gray-500" : ""
            }`
          }
        >
          <FaFileAlt /> Reports
        </NavLink>
        <NavLink
          to="/admin/analytic"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 ${
              isActive ? "bg-gray-500" : ""
            }`
          }
        >
          <FaChartBar /> Analytics
        </NavLink>
        <NavLink
          to="/admin/setting"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 ${
              isActive ? "bg-gray-500" : ""
            }`
          }
        >
          <FaCog /> Settings
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
