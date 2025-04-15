import React, { useState } from "react";
import { Plus, PinOff } from "lucide-react";

const initialProjects = [
  {
    id: 1,
    name: "CareTrack",
    tagline: "Navigating Your Health Journey with Care and Precision!",
    description:
      "CareTrack enhances healthcare efficiency by streamlining appointment scheduling, reducing administrative workload, optimizing resource allocation, and offering data-driven insights. It minimizes delays, improves patient flow, and enhances overall patient care.",
    images: ["/LandingImage.png", "/LandingImage.png"],
    logo: "/Avatarman1.png",
  },
  {
    id: 2,
    name: "EduFlow",
    tagline: "Redefining the Flow of Learning in a Digital Era!",
    description:
      "EduFlow is a smart learning management platform that helps institutes, teachers, and students streamline their education journey. Features include class scheduling, assignment tracking, progress analytics, and seamless virtual classrooms.",
    images: ["/LandingImage.png", "/LandingImage.png"],
    logo: "/Avatarman1.png",
  },
];

const ProjectDisplay = ({activeTab,setActiveTab}) => {
  const [projects, setProjects] = useState(initialProjects);
  const topProjects = projects.slice(0, 3);
  const [selectedProject, setSelectedProject] = useState(
    topProjects[0] || null
  );

  

  const handleUnpinProject = (projectId) => {
    const updated = projects.filter((proj) => proj.id !== projectId);
    setProjects(updated);
    if (selectedProject?.id === projectId) {
      setSelectedProject(updated[0] || null);
    }
  };

  return (
    <div className="flex bg-white p-4 rounded-xl shadow-lg w-[80%]">
      {/* Sidebar */}
      <div className="w-1/4 border-r pr-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-gray-700 font-semibold text-2xl">Top Projects</h2>
          {topProjects.length < 3 && (
            <button
              onClick={() => setActiveTab("Projects")}
              className="text-green-600 hover:text-green-800"
              title="Add Top Project"
            >
              <Plus />
            </button>
          )}
        </div>

        <div className="flex flex-col gap-4">
          {topProjects.map((project) => (
            <div
              key={project.id}
              className={`relative cursor-pointer flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 ${
                selectedProject?.id === project.id ? "bg-gray-50" : ""
              }`}
              onClick={() => setSelectedProject(project)}
            >
              <img
                src={project.logo}
                alt="Logo"
                className="w-10 h-10 object-contain"
              />
              <span className="font-medium">{project.name}</span>

              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering select
                  handleUnpinProject(project.id);
                }}
                className="absolute right-2 text-red-500 hover:bg-gray-200 p-2 rounded-full"
                title="Unpin Project"
              >
                <PinOff size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Info Panel */}
      <div className="w-3/4 pl-6">
        {selectedProject ? (
          <>
            <h3 className="text-3xl font-bold">{selectedProject.name}</h3>
            <p className="text-gray-600 italic">{selectedProject.tagline}</p>
            <p className="mt-2 text-gray-700">{selectedProject.description}</p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {selectedProject.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Screenshot ${idx + 1}`}
                  className="rounded-md border shadow"
                />
              ))}
            </div>
          </>
        ) : (
          <p className="text-gray-500 min-h-20 flex flex-col justify-center items-center">No project selected.</p>
        )}
      </div>
    </div>
  );
};

export default ProjectDisplay;
