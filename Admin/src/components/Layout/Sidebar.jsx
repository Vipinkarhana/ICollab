import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaChartBar,
  FaBell,
  FaFileAlt,
  FaCog,
  FaTachometerAlt,
  FaBars,
  FaTimes,
  FaAccusoft,
  FaAddressBook,
} from "react-icons/fa";
import logo from "../../assets/ICollab.png";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative min-h-screen">
      {/* Fixed Top Section with Logo and Hamburger */}
      <div className="fixed top-0 left-0 w-full bg-white shadow-md flex items-center p-3 z-50">
        <img src={logo} alt="logo" className="h-12 w-auto ml-4" />
        {!isOpen ? <button
            className="md:hidden ml-auto mr-4 p-2 bg-gray-900 text-white rounded-md"
            onClick={() => setIsOpen(true)}
          >
            <FaBars size={20} />
          </button> : 
          <button
            className="md:hidden ml-auto mr-4 p-2 bg-gray-900 text-white rounded-md"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes size={20} />
          </button>}
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-gray-900 text-white p-4 transition-transform duration-300 z-40 sidebar-container ${
          isOpen ? "translate-x-0 w-2/3 sm:w-1/3" : "-translate-x-full"
        } md:translate-x-0 md:w-1/5`}
      >
        <nav className="flex flex-col space-y-4 mt-16">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 ${
                isActive ? "bg-gray-500" : ""
              }`
            }
          >
            <FaTachometerAlt /> Dashboard
          </NavLink>
          <NavLink
            to="/notification"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 ${
                isActive ? "bg-gray-500" : ""
              }`
            }
          >
            <FaBell /> Notification
          </NavLink>
          <NavLink
            to="/report"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 ${
                isActive ? "bg-gray-500" : ""
              }`
            }
          >
            <FaFileAlt /> Reports
          </NavLink>
          <NavLink
            to="/manage-posts"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 ${
                isActive ? "bg-gray-500" : ""
              }`
            }
          >
            <FaAddressBook /> Manage Posts
          </NavLink>
          <NavLink
            to="/analytic"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 ${
                isActive ? "bg-gray-500" : ""
              }`
            }
          >
            <FaChartBar /> Analytics
          </NavLink>
          <NavLink
            to="/setting"
            onClick={() => setIsOpen(false)}
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
    </div>
  );
};

export default Sidebar;
