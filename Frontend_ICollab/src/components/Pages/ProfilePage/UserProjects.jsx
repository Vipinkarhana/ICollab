import React from "react";
import ProjectCard from "../../Common/ProjectCard";
import { Plus, Folder } from "lucide-react";
import { Link } from "react-router-dom";
import CreateProjectButton from "../../Common/CreateProjectButton";
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
      <CreateProjectButton/>
    </div>
  );
}

export default UserProjects;
