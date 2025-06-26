import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjectCard from "../../Common/ProjectCard";
import MoreProject from "../../Common/MoreProject";
import { useParams } from "react-router-dom";
import { fetchUserProjectsData } from "../../../Redux/Slices/UserProfileSlice"
import ProjectCardSkeleton from "../../Common/ProjectcardSkeleton";

function UserProjects() {
  const dispatch = useDispatch();

  const { projects: userProjects, loading, error } = useSelector((state) => state.userProfile);

  const projects = userProjects || [];
  const { username } = useParams();

  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current && username && projects.length === 0) {
      dispatch(fetchUserProjectsData(username));
    }
  }, [dispatch, username, projects.length]);


  const handleDeleteProject = () => {
    dispatch(fetchUserProjectsData(username));
  };

  if (error) return <div className="text-center text-red-500">{error}</div>;

  if (projects.length === 0) {
    return (
      <div className="w-full text-center text-gray-500 py-10 text-xl">
        No  projects yet.
      </div>
    );
  }



  console.log("User Projects Data:", projects);



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
                key={project.id}
                project={project}
                onDelete={handleDeleteProject}
              />
            ))}
          </div>
          <MoreProject />
        </>
      )}
    </div>
  );
}

export default UserProjects;