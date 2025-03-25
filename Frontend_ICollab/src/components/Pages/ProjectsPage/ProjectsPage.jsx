import React, { useState, useEffect, useRef } from 'react';
import ProfileCard from "../HomePage/LeftDiv/ProfileCard";
import SearchBar from "./SearchBar";
import ProjectCard from "./ProjectCard";
import { Plus } from 'lucide-react';
import TaskCard from './TaskCard';
import { OngoingTasks, SavedTasks } from './TaskData';

function ProjectsPage() {
  const [ongoingTaskCardsToShow, setOngoingTaskCardsToShow] = useState(6);
  const [savedTaskCardsToShow, setSavedTaskCardsToShow] = useState(6);
  const [modalData, setModalData] = useState([]);
  const [showMore, setShowMore] = useState(false);

  const ongoingTasks = OngoingTasks();
  const savedTasks = SavedTasks();

 
  const ongoingTaskContainerRef = useRef(null);
  const savedTaskContainerRef = useRef(null);

  useEffect(() => {
  
    const ongoingContainerHeight = ongoingTaskContainerRef.current.clientHeight;
    const cardHeight = 150; 
    const ongoingCardsVisible = Math.floor(ongoingContainerHeight / cardHeight);
    setOngoingTaskCardsToShow(ongoingCardsVisible > 3 ? ongoingCardsVisible : 3); 

   
    const savedContainerHeight = savedTaskContainerRef.current.clientHeight;
    const savedCardsVisible = Math.floor(savedContainerHeight / cardHeight);
    setSavedTaskCardsToShow(savedCardsVisible > 3 ? savedCardsVisible : 3); 
  }, []);

  const handleSeeMoreClick = (tasks) => {
    setModalData(tasks);
    setShowMore(true);
  };

  return (
    <div className="w-[100svw] mt-14 flex justify-evenly p-2">
      <div className="w-[20%] h-[100%] flex flex-col justify-start items-center gap-2">
        <ProfileCard otherUser={null} />
        <div
          ref={ongoingTaskContainerRef}
          className="w-[100%] h-[88svh] bg-white py-2 rounded-lg relative flex flex-col justify-start items-center border border-gray-300"
        >
          <div className="flex justify-between items-center w-full border-b border-gray-300 px-2 py-1 h-auto">
            <h2 className="font-semibold text-xl">Ongoing Projects</h2>
            <button
              className="text-blue-500 hover:underline text-xl font-semibold"
              onClick={() => handleSeeMoreClick(ongoingTasks)}
            >
              See All
            </button>
          </div>
          <div className='flex items-start justify-center w-[80%] '>
          <button className=" w-40 h-10 flex items-center justify-center gap-4  px-6 py-3 my-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 shadow-md">
          <Plus size={20} />
        <span className="text-lg font-medium">Add New</span>
        </button>
          </div>
          <div className="w-full h-[100%] flex items-center justify-evenly flex-col overflow-hidden">
            {ongoingTasks.slice(0, ongoingTaskCardsToShow).map((task, index) => (
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

      <div className="w-[20%] h-[80%] bg-white border border-gray-300 rounded-md flex flex-col justify-start items-center">
        <div className="py-2 w-[100%] text-xl font-semibold px-2 flex items-center justify-between border-b border-gray-300">
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
          className="w-full h-auto flex items-center justify-evenly flex-col overflow-hidden gap-4 p-2"
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
