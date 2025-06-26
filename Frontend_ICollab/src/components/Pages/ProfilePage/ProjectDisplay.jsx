import React, { useState, useEffect } from "react";
import { Plus, PinOff, X } from "lucide-react";
import ProjectCard from "../../Common/ProjectCard";
import { useSelector, useDispatch } from 'react-redux';
import { updateTopProjects } from '../../../Redux/Slices/UserProfileSlice';

const ProjectDisplay = ({ username, isCurrentUser }) => {
  const topProjects = useSelector((state) => state?.userProfile?.user?.profile?.topProjects);
  const dispatch = useDispatch();
  const { userProjects, loading, error } = useSelector((state) => state.project);
  const { data: profileData } = useSelector((state) => state.userProfile);

  useEffect(() => {
    console.log("topProjects:", topProjects);
  }, [topProjects]);

  const originalProjects = userProjects;
  const [projects, setProjects] = useState(originalProjects);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCards, setSelectedCards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    console.log("selectedCards:", selectedCards);
  }, [selectedCards])

  const selectedProjects = projects.filter((proj) => proj.pinned).slice(0, 3);

  useEffect(() => {
    if (!selectedProject || !selectedProject.pinned) {
      setSelectedProject(selectedProjects[0] || null);
    }
  }, [projects]);

  const handleUnpinProject = (projectId) => {
    const updated = projects.map((proj) =>
      proj.id === projectId ? { ...proj, pinned: false } : proj
    );
    setProjects(updated);
    if (selectedProject?.id === projectId) {
      const newTop = updated?.filter((proj) => proj?.pinned);
      setSelectedProject(newTop[0] || null);
    }

    const updatedPinnedProjects = updated?.filter((proj) => proj?.pinned);
    dispatch(updateTopProjects({ topProjects: updatedPinnedProjects, username }));
  };

  const handleSelectProject = () => {
    console.log("Selected crds", selectedCards)
    const updatedProjects = projects?.map((proj) =>
      selectedCards.some(card => card.id === proj?.id)
        ? { ...proj, pinned: true }
        : proj
    );

    setProjects(updatedProjects);
    setShowModal(false);
    setSelectedCards([]);
    console.log("updted projects:", updatedProjects)

    const updatedPinnedProjects = updatedProjects?.filter((proj) => proj.pinned);
    console.log("pinned project", updatedPinnedProjects)
    dispatch(updateTopProjects({ topProjects: updatedPinnedProjects, username }));
  };

  const handleCardSelection = (project) => {
    setSelectedCards((prevSelected) =>
      prevSelected.includes(project)
        ? prevSelected.filter((preProject) => preProject.id !== project.id)
        : [...prevSelected, project]
    );
  };

  return (
    <>
      <div className="flex flex-wrap md:flex-nowrap bg-white p-4 rounded-xl shadow-lg w-full md:w-[80%]">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 border-r pr-4 mb-4 md:mb-0">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-gray-700 font-semibold text-2xl">Top Projects</h2>
            {topProjects?.length < 3 && isCurrentUser && (
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
            {topProjects?.map((project) => (
              <div
                key={project?.id}
                className={`relative cursor-pointer flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 ${selectedProject?.id === project.id ? "bg-gray-50" : ""
                  }`}
                onClick={() => setSelectedProject(project)}
              >
                <img
                  src={`https://test.ircollab.com/${project?.logo}`}
                  alt="Logo"
                  className="w-10 h-10 object-contain"
                />
                <span className="font-medium">{project?.name}</span>
                {isCurrentUser && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUnpinProject(project?.id);
                    }}
                    className="absolute right-2 text-red-500 hover:bg-gray-200 p-2 rounded-full"
                    title="Unpin Project"
                  >
                    <PinOff size={20} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Info Panel */}
        <div className="w-full md:w-3/4 sm:pl-6">
          {selectedProject ? (
            <>
              <h3 className="text-3xl font-bold">{selectedProject?.name}</h3>
              <p className="text-gray-600 italic">{selectedProject?.tagline}</p>
              <p className="mt-2 text-gray-700 text-justify">{selectedProject?.description}</p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                {selectedProject?.media?.map((img, idx) => (
                  <img
                    key={idx}
                    src={`https://test.ircollab.com/${img}`}
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
            <h2 className="text-2xl font-semibold mb-4">
              Select a Project to Pin ({topProjects?.length + selectedCards?.length}/3)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects
                .filter((project) => !project.pinned)
                .map((project) => {
                  const isSelected = selectedCards.some(card => card.id === project.id);
                  const selectionNumber = selectedCards.findIndex(card => card.id === project.id) + 1;
                  const canSelectMore = topProjects.length + selectedCards.length < 3;

                  return (
                    <div
                      key={project?.id}
                      onClick={() => {
                        if (isSelected) {
                          handleCardSelection(project);
                        } else if (canSelectMore) {
                          handleCardSelection(project);
                        }
                      }}
                      className={`relative cursor-pointer transition-all duration-200 ease-in-out rounded-lg overflow-hidden ${isSelected ? "ring-2 ring-blue-500" : "shadow-lg border"
                        }`}
                    >
                      {isSelected && (
                        <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-md z-10">
                          {selectionNumber}
                        </div>
                      )}
                      <ProjectCard key={project?.id} project={project} />
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
