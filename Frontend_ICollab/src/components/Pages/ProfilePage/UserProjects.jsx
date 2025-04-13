import React from 'react'
import ProjectCard from '../ProjectsPage/ProjectCard'
import { Plus,Folder } from 'lucide-react'
import { Link } from 'react-router-dom';
function UserProjects() {
  const savedProjects = [
    {
      _id: "p1",
      title: "MitraPay Wallet",
      description: "A secure digital wallet for smooth transactions.",
    },
    {
      _id: "p2",
      title: "CakeHeavens",
      description: "An eCommerce platform for rural cake shops.",
    },
    {
      _id: "p3",
      title: "HabitLoop",
      description: "Track and maintain your daily habits easily.",
    },
    {
      _id: "p4",
      title: "Emergency Ambulance Booking",
      description: "Real-time ambulance tracking and AI hospital suggestions.",
    },
  ];

  if (savedProjects.length === 0) {
    return (
      <div className="w-full text-center text-gray-500 py-10 text-xl">
        No saved projects yet.
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full h-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-2">
        {savedProjects.map((project) => (
          <ProjectCard />
        ))}
      </div>
      <Link to={"/project/create"} className="w-60 h-80 bg-white rounded-2xl shadow-lg flex flex-col items-center justify-between p-4 transition hover:shadow-2xl cursor-pointer">
        {/* Top placeholder */}
        <div className="w-full h-10 bg-gray-200 rounded-md" />

        {/* Middle placeholder with plus button */}
        <div className="w-full h-28 bg-gray-200 rounded-md flex items-center justify-center">
          <div className="bg-blue-500 text-white p-3 rounded-full">
            <Plus size={24} />
          </div>
        </div>

        {/* Toggle buttons (mock) */}
        <div className="flex gap-2">
          <div className="w-4 h-2 bg-gray-300 rounded-full" />
          <div className="w-2 h-2 bg-gray-300 rounded-full" />
        </div>

        {/* New Project button */}
        <div className="w-full">
          <button className="w-full border rounded-lg py-2 flex items-center justify-center gap-2 text-sm font-medium">
            <Folder size={20} />
            New project
          </button>
        </div>

        {/* Bottom text */}
        <p className="text-xs text-gray-400 mt-2">Start a brand new project</p>
      </Link>
    </div>
  );
}

export default UserProjects
