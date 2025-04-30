import React, { useEffect, useState } from 'react'
import ProjectCard from "../Common/ProjectCard"
import { getProjectFeed } from '../../Services/projectService';
import { useNavigate } from 'react-router-dom';


function MoreProject({ currentProjectId }) {

  const navigate = useNavigate();
   const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'N/A';
      return date.toLocaleDateString('en-GB', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit'
      });
    } catch {
      return 'N/A';
    }
  };

  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndFilterProjects  = async () => {
      try {
        const response = await getProjectFeed();
        const allProjects = [
          ...(response.data.ongoing || []),
          ...(response.data.finished || [])
        ];
        const filtered = allProjects
          .filter(project => project._id !== currentProjectId && (                        // keep if either…
                    project.isOngoing               //  • still ongoing
                    || project.endDate              //  • or has a (truthy) endDate
                  ))
          .slice(0, 4);

        // Take first 4 projects from the feed
        setFilteredProjects(filtered);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAndFilterProjects();
  }, [currentProjectId]);

  if (loading) return <div>Loading related projects...</div>;
  if (error) return <div>Error loading projects: {error}</div>;


  return (
    <div className='flex w-full justify-start items-center flex-col gap-4 py-3 sm:px-4'>
      <div className="flex px-1 flex-row  justify-between items-center w-full sm:gap-2 gap-9">
        <h1 className='text-lg sm:text-3xl font-semibold tracking-tight'>People Also Viewed</h1>
        <button  onClick={() => navigate('/project')} className='bg-blue-500 hover:bg-blue-600 sm:px-4 sm:py-2 px-1 py-2 rounded-md text-white flex items-center gap-2 self-start sm:self-auto'>
          See more projects
          <span>{">"}</span>
        </button>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6">
      {filteredProjects.length > 0 ? (
          filteredProjects.map(project => (
            <ProjectCard
            key={project._id}
            project={project}
            />
          ))
        ) : (
          <p className="text-gray-500">No projects found</p>
        )}
      </div>
    </div>
  )
}

export default MoreProject
