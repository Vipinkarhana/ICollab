import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjectCard from "../../Common/ProjectCard";
import MoreProject from "../../Common/MoreProject";
import { useParams } from "react-router-dom";
import CreateProjectButton from "../../Common/CreateProjectButton";
import { fetchUserProjectsData } from "../../../Redux/Slices/ProjectSlice";
import ProjectCardSkeleton from "../../Common/ProjectcardSkeleton";

function UserProjects() {
  const dispatch = useDispatch();

  const { userProjects, loading, error } = useSelector((state) => state.project);
  
  const projects = userProjects || [];
   const { username } = useParams();

   useEffect(() => {
     dispatch(fetchUserProjectsData(username));
   }, [dispatch, username]);

   const handleDeleteProject = () => {
    dispatch(fetchUserProjectsData(username)); // Refresh list after delete
  };

  if (error) return <div className="text-center text-red-500">{error}</div>;

  if (projects.length === 0) {
    return (
      <div className="w-full text-center text-gray-500 py-10 text-xl">
        No  projects yet.
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-between gap-12 w-full h-full sm:px-6">
      {/* Skeleton Loading State */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {Array.from({ length: 4 }).map((_, idx) => (
            <ProjectCardSkeleton key={idx} />
          ))}
        </div>
      ) : projects.length === 0 ? (
        // Empty State
        <div className="w-full text-center text-gray-500 py-10 text-xl">
          No projects yet.
        </div>
      ) : (
        // Loaded State
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {projects.map((project) => (
              <ProjectCard 
                key={project._id} 
                project={project} 
                onDelete={handleDeleteProject}
              />
            ))}
          </div>
          <CreateProjectButton />
          <MoreProject />
        </>
      )}
    </div>
  );
}

export default UserProjects;