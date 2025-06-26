// Sidebar.js
import React from "react";
import { Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

const SidebarHeader = () => {
  return (
    <aside className="fixed top-0 left-0 w-64 bg-white shadow-md min-h-screen mt-16 p-6">
      <Link
        to="/"
        className="flex items-center gap-2 text-2xl font-semibold text-blue-600 mb-8"
      >
        <Lightbulb />
        <span>IncubatorHub</span>
      </Link>

      <nav className="flex flex-col gap-4 text-gray-700">
        <Link to="/" className="text-blue-600 font-medium">
          Home
        </Link>
        <Link to="/startup">Startups</Link>
        <Link to="/programs">Programs</Link>
        <Link to="/resources">Resources</Link>
        <Link to="/events">Events</Link>
      </nav>
    </aside>
  );
};

export default SidebarHeader;
