// SidebarHeader.js
import React from "react";
import {
  Lightbulb,
  Home,
  Rocket,
  BookOpen,
  Calendar,
  Layers
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { label: "Home", icon: <Home size={18} />, path: "/" },
  { label: "Startups", icon: <Rocket size={18} />, path: "/startup" },
  { label: "Programs", icon: <Layers size={18} />, path: "/programs" },
  { label: "Resources", icon: <BookOpen size={18} />, path: "/resources" },
  { label: "Events", icon: <Calendar size={18} />, path: "/events" },
];

const SidebarHeader = () => {
  const location = useLocation();

  return (
    <aside className="fixed top-0 left-0 w-64 bg-white border-r border-gray-200 min-h-screen mt-16 p-6 z-50 shadow-sm">
      {/* Logo Section */}
      <Link
        to="/"
        className="flex items-center gap-2 text-2xl font-bold text-blue-600 mb-10"
      >
        <Lightbulb size={24} />
        <span>IncubatorHub</span>
      </Link>

      {/* Navigation */}
      <nav className="flex flex-col space-y-3">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
              location.pathname === item.path
                ? "bg-blue-100 text-blue-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default SidebarHeader;
