import React, { useState, useEffect, useRef } from 'react';
import ProfileCard from "../HomePage/LeftDiv/ProfileCard";
import SearchBar from "./SearchBar";
import ProjectCard from "./ProjectCard";
// import { Plus } from 'lucide-react';
import TaskCard from './TaskCard';
import { OngoingTasks, SavedTasks } from './TaskData';

function ProjectsPage() {
  // State for managing visibility of task cards
  const [taskCardsToShow, setTaskCardsToShow] = useState(6);
  const [modalData, setModalData] = useState([]);
  const [showMore, setShowMore] = useState(false);

  const ongoingTasks = OngoingTasks();
  const savedTasks = SavedTasks();

  // To access the div height dynamically
  const taskContainerRef = useRef(null);

  // Calculate how many task cards should be shown based on the container height
  useEffect(() => {
    const containerHeight = taskContainerRef.current.clientHeight;
    const cardHeight = 150; // Approximate height of each TaskCard
    const cardsVisible = Math.floor(containerHeight / cardHeight); // Calculate how many cards fit
    setTaskCardsToShow(cardsVisible > 3 ? cardsVisible : 3); // Show a minimum of 6 cards
  }, []);

  // Handle "See More" button click
  const handleSeeMoreClick = (tasks) => {
    setModalData(tasks);
    setShowMore(true);
  };

  return (
    <div className="w-[100svw] mt-14 flex justify-evenly p-2">
      {/* Left Sidebar for Profile */}
      <div className="w-[20%] h-[100%] flex flex-col justify-start items-center gap-2">
        <ProfileCard otherUser={null} />
        <div
          ref={taskContainerRef} // Reference to measure height dynamically
          className="w-[100%] h-[88svh] bg-white py-2 rounded-lg relative flex flex-col justify-start items-center border border-gray-300"
        >
          <div className="flex justify-between items-center w-full border-b border-gray-300 px-2 py-1 m-4">
            <h2 className="font-semibold text-lg">Ongoing Projects</h2>
            {/* <button className="text-2xl font-bold text-gray-500 cursor-pointer">
              <Plus />
            </button> */}
          </div>
          <div className="w-full flex flex-col overflow-hidden">
            {/* Render Ongoing Task Cards */}
            {ongoingTasks.slice(0, taskCardsToShow).map((task, index) => (
              <TaskCard
                key={index}
                priority={task.priority}
                title={task.title}
                users={task.users}
                comments={task.comments}
              />
            ))}
            {/* See More Link for Ongoing Projects */}
            {ongoingTasks.length > taskCardsToShow && (
              <button
                className="absolute top-8 ml-48 text-blue-500 hover:underline"
                onClick={() => handleSeeMoreClick(ongoingTasks)}
              >
                See More
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Center Section with Project Cards */}
      <div className="w-[50%] h-auto flex flex-col justify-start items-center gap-2 py-1">
        <SearchBar />
        <div className="grid grid-cols-2 gap-4 h-auto w-[80%] items-center">
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

      {/* Right Sidebar for Saved Projects */}
      <div className="w-[20%] h-[88svh] bg-white border border-gray-300 rounded-md flex flex-col justify-start items-center ">
        <div className="py-1 w-[100%] text-xl font-semibold px-2 flex items-center justify-start border-b border-gray-300 m-4">
          <p>Saved Projects</p>
        </div>
        {/* Render Saved Task Cards */}
        {savedTasks.slice(0, taskCardsToShow).map((task, index) => (
          <TaskCard
            key={index}
            priority={task.priority}
            title={task.title}
            users={task.users}
            comments={task.comments}
          />
        ))}
        {/* See More Link for Saved Projects */}
        {savedTasks.length > taskCardsToShow && (
          <button
            className="absolute mt-6 ml-44 text-blue-500 hover:underline"
            onClick={() => handleSeeMoreClick(savedTasks)}
          >
            See More
          </button>
        )}
      </div>

      {/* Expanded task cards view */}
      {showMore && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-3/4 h-3/4 overflow-auto">
            <h2 className="text-2xl font-semibold mb-4">All Projects</h2>
            <div className="grid grid-cols-3 gap-4">
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
