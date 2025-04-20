import React, { useState } from "react";
import { Plus, PinOff, X } from "lucide-react";
import ProjectCard from "../../Common/ProjectCard";

const initialProjects = [
  {
    id: 1,
    name: "CareTrack",
    tagline: "Navigating Your Health Journey with Care and Precision!",
    description:
      "CareTrack enhances healthcare efficiency by streamlining appointment scheduling, reducing administrative workload, optimizing resource allocation, and offering data-driven insights. It minimizes delays, improves patient flow, and enhances overall patient care.",
    images: ["/LandingImage.png", "/LandingImage.png"],
    logo: "/Avatarman1.png",
    pinned: true,
  },
  {
    id: 2,
    name: "EduFlow",
    tagline: "Redefining the Flow of Learning in a Digital Era!",
    description:
      "EduFlow is a smart learning management platform that helps institutes, teachers, and students streamline their education journey. Features include class scheduling, assignment tracking, progress analytics, and seamless virtual classrooms.",
    images: ["/LandingImage.png", "/LandingImage.png"],
    logo: "/Avatarman1.png",
    pinned: true,
  },
  {
    id: 3,
    name: "AgroLink",
    tagline: "Empowering Farmers with Modern Agri Solutions!",
    description:
      "AgroLink bridges the gap between farmers and agri-experts using digital advisory tools, weather insights, and crop recommendations. It helps increase yield and efficiency for farmers across the country.",
    images: ["/LandingImage.png", "/LandingImage.png"],
    logo: "/Avatarman1.png",
    pinned: false,
  },
];

const ProjectDisplay = ({ activeTab, setActiveTab }) => {
  const [projects, setProjects] = useState(initialProjects);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCards, setSelectedCards] = useState([]); // State for selected cards
  const [showModal, setShowModal] = useState(false);

  const topProjects = projects.filter((proj) => proj.pinned).slice(0, 3);

  React.useEffect(() => {
    if (!selectedProject || !selectedProject.pinned) {
      setSelectedProject(topProjects[0] || null);
    }
  }, [projects]);

  const handleUnpinProject = (projectId) => {
    const updated = projects.map((proj) =>
      proj.id === projectId ? { ...proj, pinned: false } : proj
    );
    setProjects(updated);
    if (selectedProject?.id === projectId) {
      const newTop = updated.filter((proj) => proj.pinned);
      setSelectedProject(newTop[0] || null);
    }
  };

  const handlePinProject = (projectId) => {
    const currentTop = projects.filter((proj) => proj.pinned);
    if (currentTop.length >= 3) return;
    const updated = projects.map((proj) =>
      proj.id === projectId ? { ...proj, pinned: true } : proj
    );
    setProjects(updated);
    setShowModal(false);
    setSelectedProject(updated.find((proj) => proj.id === projectId));
  };

  const handleSelectProject = () => {
    // Pin all selected projects
    const updatedProjects = projects.map((proj) =>
      selectedCards.includes(proj.id)
        ? { ...proj, pinned: true }
        : proj
    );
    setProjects(updatedProjects);
    setShowModal(false);
    setSelectedCards([]); // Clear the selected cards after pinning
  };

  // Handle card selection inside modal
  const handleCardSelection = (projectId) => {
    setSelectedCards((prevSelected) =>
      prevSelected.includes(projectId)
        ? prevSelected.filter((id) => id !== projectId)
        : [...prevSelected, projectId]
    );
  };

  return (
    <>
      <div className="flex flex-wrap md:flex-nowrap bg-white p-4 rounded-xl shadow-lg w-full md:w-[80%]">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 border-r pr-4 mb-4 md:mb-0">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-gray-700 font-semibold text-2xl">Top Projects</h2>
            {topProjects.length < 3 && (
              <button
                onClick={() => setShowModal(true)}
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
                className={`relative cursor-pointer flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 ${selectedProject?.id === project.id ? "bg-gray-50" : ""
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
                    e.stopPropagation();
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
        <div className="w-full md:w-3/4 sm:pl-6">
          {selectedProject ? (
            <>
              <h3 className="text-3xl font-bold">{selectedProject.name}</h3>
              <p className="text-gray-600 italic">{selectedProject.tagline}</p>
              <p className="mt-2 text-gray-700 text-justify">{selectedProject.description}</p>
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
            <p className="text-gray-500 min-h-72 flex flex-col justify-center items-center">
              No project selected.
            </p>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-[90%] max-h-[80vh] overflow-y-auto relative shadow-xl">
            <button
              onClick={() => {
                setShowModal(false);
                setSelectedCards([]); 
              }}
              className="absolute top-4 right-4 text-gray-600 hover:text-black"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-semibold mb-4">Select a Project to Pin</h2>

            {/* Wrapping each ProjectCard inside a div and adding onClick */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects
  .filter((project) => !project.pinned)
  .map((project) => {
    const isSelected = selectedCards.includes(project.id);
    const selectionNumber = selectedCards.indexOf(project.id) + 1;

    return isSelected ? (
      <div
        key={project.id}
        onClick={() => handleCardSelection(project.id)}
        className="relative cursor-pointer transition-all duration-200 ease-in-out rounded-lg overflow-hidden ring-2 ring-blue-500"
      >
        {/* Selection number badge */}
        <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-md z-10">
          {selectionNumber}
        </div>

        <ProjectCard project={project} />
      </div>
    ) : (
      <div key={project.id} onClick={() => handleCardSelection(project.id)}>
        <ProjectCard project={project} />
      </div>
    );
  })}

            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={handleSelectProject}
                disabled={selectedCards.length === 0}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:bg-gray-300"
              >
                Select
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectDisplay;
