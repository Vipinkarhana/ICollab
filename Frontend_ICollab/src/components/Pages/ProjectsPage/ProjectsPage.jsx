import React, { useState, useEffect, useRef } from "react";
import ProfileCard from "../HomePage/LeftDiv/ProfileCard";
import SearchBar from "./SearchBar";
import ProjectCard from "../../Common/ProjectCard";
import { Plus } from "lucide-react";
import TaskCard from "./TaskCard";
import { OngoingTasks, SavedTasks } from "./TaskData";
import ProjectForm from "./ProjectForm";

function ProjectsPage() {
  const [ongoingTaskCardsToShow, setOngoingTaskCardsToShow] = useState(6);
  const [savedTaskCardsToShow, setSavedTaskCardsToShow] = useState(6);
  const [modalData, setModalData] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const ongoingTasks = OngoingTasks();
  const savedTasks = SavedTasks();

  const ongoingTaskContainerRef = useRef(null);
  const savedTaskContainerRef = useRef(null);

  useEffect(() => {
    const ongoingContainerHeight = ongoingTaskContainerRef.current.clientHeight;
    const cardHeight = 150;
    const ongoingCardsVisible = Math.floor(ongoingContainerHeight / cardHeight);
    setOngoingTaskCardsToShow(
      ongoingCardsVisible > 3 ? ongoingCardsVisible : 3
    );

    const savedContainerHeight = savedTaskContainerRef.current.clientHeight;
    const savedCardsVisible = Math.floor(savedContainerHeight / cardHeight);
    setSavedTaskCardsToShow(savedCardsVisible > 3 ? savedCardsVisible : 3);
  }, []);

  const handleSeeMoreClick = (tasks) => {
    setModalData(tasks);
    setShowMore(true);
  };

  const handleAddNewClick = () => {
    setShowForm(true);
  };

  const handleSaveDraft = (formData) => {
    console.log("Draft saved:", formData);
    setShowForm(false);
  };

  const handleCreateProject = (formData) => {
    console.log("Project created:", formData);
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div className="w-full mt-16 p-2 flex flex-wrap justify-evenly gap-4">
      {/* Profile and task containers */}
      <div className="w-full md:w-1/5 h-full flex-col justify-start items-center gap-2 m-4 hidden lg:flex">
        <ProfileCard otherUser={null} />
        <div
          ref={ongoingTaskContainerRef}
          className="w-full h-88 bg-white py-2 rounded-lg flex flex-col justify-start items-center border border-gray-300"
        >
          <div className="py-2 w-full text-xl font-semibold px-2 flex items-center justify-between border-b border-gray-300 m-4">
            <h2 className="font-semibold text-xl">Ongoing Projects</h2>
            <button
              className="text-blue-500 hover:underline text-xl font-semibold"
              onClick={() => handleSeeMoreClick(ongoingTasks)}
            >
              See All
            </button>
          </div>
          <div className="flex items-start justify-center w-full">
            <button
              className="w-full sm:w-[80%] h-10 flex items-center justify-center gap-4 px-6 py-3 m-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 shadow-md"
              onClick={handleAddNewClick}
            >
              <Plus size={20} />
              <span className="text-lg font-medium">Add New</span>
            </button>
          </div>
          <div className="w-full h-full flex items-center justify-evenly flex-col overflow-hidden gap-4">
            {ongoingTasks
              .slice(0, ongoingTaskCardsToShow)
              .map((task, index) => (
                <TaskCard
                  key={index}
                  priority={task.priority}
                  title={task.title}
                  users={task.users}
                  comments={task.comments}
                />
              ))}
          </div>
        </div>
      </div>

      {/* Project cards and search */}
      <div className="w-full sm:w-1/2 md:w-[80%] lg:w-2/5 h-auto flex flex-col justify-start items-center gap-2 py-1 m-2">
        <SearchBar />
        <div className="flex flex-col gap-4 items-center justify-center">
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </div>
      </div>

      {/* Saved Tasks */}
      <div className="w-full md:w-1/5 h-[90%]  bg-white border border-gray-300 rounded-md flex-col justify-start items-center p-2 m-4 hidden lg:flex">
        <div className="py-2 w-full text-xl font-semibold px-2 flex items-center justify-between border-b border-gray-300 m-4">
          <p>Saved Projects</p>
          <button
            className="text-blue-500 hover:underline"
            onClick={() => handleSeeMoreClick(savedTasks)}
          >
            See All
          </button>
        </div>
        <div
          ref={savedTaskContainerRef}
          className="w-full h-auto flex items-center justify-evenly flex-col overflow-hidden gap-4"
        >
          {savedTasks.slice(0, savedTaskCardsToShow).map((task, index) => (
            <TaskCard
              key={index}
              priority={task.priority}
              title={task.title}
              users={task.users}
              comments={task.comments}
            />
          ))}
        </div>
      </div>

      {/* Conditional Rendering for the Form */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full sm:w-3/4 md:w-2/3 lg:w-1/2 h-3/4 overflow-auto">
            <ProjectForm
              onSaveDraft={handleSaveDraft}
              onCreateProject={handleCreateProject}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}

      {showMore && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full sm:w-3/4 md:w-2/3 h-3/4 overflow-auto">
            <h2 className="text-2xl font-semibold mb-4">All Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {modalData.map((task, index) => (
                <TaskCard
                  key={index}
                  priority={task.priority}
                  title={task.title}
                  users={task.users}
                  comments={task.comments}
                />
              ))}
            </div>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-full"
              onClick={() => setShowMore(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectsPage;
