import React, { useState, useEffect } from "react";
import ProjectCard from "../../Common/ProjectCard"; // Adjust path if needed
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CreateProjectButton from "../../Common/CreateProjectButton";
import * as projectService from "../../../Services/projectService";

const ProjectsPage = () => {
  const currentUser = useSelector((state) => state.user.userData);
  const username = currentUser?.username;

  // State for slider projects
  const [sliderOngoing, setSliderOngoing] = useState([]);
  const [sliderFinished, setSliderFinished] = useState([]);

  // State for ongoing projects
  const [ongoingProjects, setOngoingProjects] = useState([]);
  const [lastOngoingTS, setLastOngoingTS] = useState(Date.now());
  const [hasMoreOngoing, setHasMoreOngoing] = useState(true);
  const [loadingOngoing, setLoadingOngoing] = useState(false);

  // State for finished projects
  const [finishedProjects, setFinishedProjects] = useState([]);
  const [lastFinishedTS, setLastFinishedTS] = useState(Date.now());
  const [hasMoreFinished, setHasMoreFinished] = useState(true);
  const [loadingFinished, setLoadingFinished] = useState(false);




  // Fetch initial slider data
  useEffect(() => {
    const fetchSliderData = async () => {
      try {
        const response = await projectService.getProjectFeed();
        setSliderOngoing(response.data.data.ongoing);
        setSliderFinished(response.data.data.finished);
      } catch (error) {
        console.error("Error fetching slider data:", error);
      }
    };
    fetchSliderData();
  }, []);



  // Fetch initial ongoing projects
  useEffect(() => {
    const fetchInitialOngoing = async () => {
      try {
        const response = await projectService.getOngoingProjects(Date.now());
        setOngoingProjects(response.data);
        updateOngoingPagination(response.data);
      } catch (error) {
        console.error("Error fetching ongoing projects:", error);
      }
    };
    fetchInitialOngoing();
  }, []);



  // Fetch initial finished projects
  useEffect(() => {
    const fetchInitialFinished = async () => {
      try {
        const response = await projectService.getFinishedProjects(Date.now());
        setFinishedProjects(response.data);
        updateFinishedPagination(response.data);
      } catch (error) {
        console.error("Error fetching finished projects:", error);
      }
    };
    fetchInitialFinished();
  }, []);


  const handleProjectSave = (projectId, isSaved) => {
    const updateProjectInList = (projects) => 
      projects.map(proj => 
        proj._id === projectId ? { ...proj, isSaved } : proj
      );
  
    setSliderOngoing(prev => updateProjectInList(prev));
    setSliderFinished(prev => updateProjectInList(prev));
    setOngoingProjects(prev => updateProjectInList(prev));
    setFinishedProjects(prev => updateProjectInList(prev));
  };

  const updateOngoingPagination = (newProjects) => {
    if (newProjects.length > 0) {
      const lastProject = newProjects[newProjects.length - 1];
      setLastOngoingTS(new Date(lastProject.createdAt).getTime());
      setHasMoreOngoing(newProjects.length === 10);
    } else {
      setHasMoreOngoing(false);
    }
  };

  const updateFinishedPagination = (newProjects) => {
    if (newProjects.length > 0) {
      const lastProject = newProjects[newProjects.length - 1];
      setLastFinishedTS(new Date(lastProject.createdAt).getTime());
      setHasMoreFinished(newProjects.length === 10);
    } else {
      setHasMoreFinished(false);
    }
  };

  const handleLoadMoreOngoing = async () => {
    if (!hasMoreOngoing || loadingOngoing) return;
    setLoadingOngoing(true);
    try {
      const response = await projectService.getOngoingProjects(lastOngoingTS);
      setOngoingProjects(prev => [...prev, ...response.data]);
      updateOngoingPagination(response.data);
    } catch (error) {
      console.error("Error loading more ongoing:", error);
    } finally {
      setLoadingOngoing(false);
    }
  };

  const handleLoadMoreFinished = async () => {
    if (!hasMoreFinished || loadingFinished) return;
    setLoadingFinished(true);
    try {
      const response = await projectService.getFinishedProjects(lastFinishedTS);
      setFinishedProjects(prev => [...prev, ...response.data]);
      updateFinishedPagination(response.data);
    } catch (error) {
      console.error("Error loading more finished:", error);
    } finally {
      setLoadingFinished(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear().toString().slice(-2)}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex flex-col  items-center w-full py-6 bg-gray-100  mt-16">
      <div className="max-w-6xl mx-auto">
       {/* Search + Button */}
<div className="flex justify-center items-center w-full">
  <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6 w-full sm:w-[90%] px-4">
    
    {/* Search bar */}
    <div className="sm:w-[80%] w-full">
      <SearchBar />
    </div>

    {/* Button - visible from md screens onwards */}
    <div className="sm:w-[20%] w-full flex sm:items-start items-center justify-center sm:justify-end">
      <Link
        to={`/profile/${username}`}
        state={{
          from: "projects",
        }}
        className="bg-blue-300 w-44 h-12 text-xl text-white px-4 py-2 rounded-full hover:bg-blue-400 
        hidden md:flex items-center justify-center gap-1 mt-5"
      >
        Your Project <span>{">"}</span>
      </Link>
    </div>

  </div>
</div>



{/* Slider Section */}
<div className="mt-6 flex justify-center gap-6 flex-wrap">
          {sliderOngoing.map((project) => (
            <div key={project._id} className="flex-shrink-0 w-full sm:w-[48%]">
              <ProjectCard
                project = {project}
                onSave={handleProjectSave}
              />
            </div>
          ))}
        </div>

         {/* Ongoing Projects Section */}
         <div className="mt-6 flex items-center justify-between">
          <p className="text-2xl text-gray-800">Ongoing</p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 justify-center">
          {ongoingProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project = {project}
              onSave={handleProjectSave}
            />
          ))}
        </div>

        {hasMoreOngoing && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleLoadMoreOngoing}
              disabled={loadingOngoing}
              className="bg-blue-300 w-40 h-12 text-white rounded-md hover:bg-blue-400"
            >
              {loadingOngoing ? 'Loading...' : 'Load More >'}
            </button>
          </div>
        )}

 {/* Finished Projects Section */}
 <div className="mt-6 flex items-center justify-between">
          <p className="text-2xl text-gray-800">Finished</p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 justify-center">
          {finishedProjects.map((project) => (
            <ProjectCard
              key={project._id}
              project = {project}
              onSave={handleProjectSave}
            />
          ))}
        </div>

        {hasMoreFinished && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleLoadMoreFinished}
              disabled={loadingFinished}
              className="bg-blue-300 w-40 h-12 text-white rounded-md hover:bg-blue-400"
            >
              {loadingFinished ? 'Loading...' : 'Load More >'}
            </button>
          </div>
        )}
      </div>
      <CreateProjectButton />
    </div>
  );
};

export default ProjectsPage;
