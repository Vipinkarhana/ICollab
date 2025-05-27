import privateAxios from "./apiService";

export const addProject = async (projectData) => {
    try{
    console.log("Reached project service");
    const response = await privateAxios.post('/project/addproject', projectData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        //'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
}
catch (err) {
    return err.response?.data || { error: "Project creation failed" };
}
  };


  export const getCollaboratorSuggestions = async (query) => {
    try{
    const response = await privateAxios.get(`/project/collaboratorsuggestions?qer=${query}`);
    return response;
}
catch (err) {
    return err.response?.data || { error: "Project creation failed" };
}
  };

  export const fetchUserProjects = async (username) => {
    try {
      const response = await privateAxios.get(`/project/userprojects/${username}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error fetching user projects');
    }
  };


  // projectService.js
export const getProjectFeed = async () => {
  try {
    const response = await privateAxios.get('/project/projectfeed');
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getOngoingProjects = async (timestamp) => {
  try {
    const response = await privateAxios.get('/project/ongoingfeed', { 
      params: { timestamp } 
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getFinishedProjects = async (timestamp) => {
  try {
    const response = await privateAxios.get('/project/finishedfeed', { 
      params: { timestamp } 
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getProjectDetails = async (projectId) => {
  try{
    console.log("projectId in project service: ", projectId);
  return await privateAxios.get(`/project/${projectId}`);
  } catch(err){
    next(err);
  }
};

export const updatePinnedProjects = async (projectIds) => {
  try {
    const response = await privateAxios.put("/project/topprojects", {
      topProjectIds: projectIds, 
    });
    return response.data;
  } catch (error) {
    console.error("Failed to update pinned projects:", error);
    throw error;
  }
};

// import privateAxios from '../api/privateAxios'; // must include Authorization headers

// export const updatePinnedProjects = async (projectIds) => {
//   console.log(projectIds);
//   const response = await privateAxios.put('/project/topprojects', {
//     topProjectIds: projectIds,
//   });
//   return response.data;
// };



export const deleteProject = async (projectid) => {
  try{
    return await privateAxios.post("/project/deleteproject", {projectid});
  }catch (err){
    next(err);
  }
};


export const updateProject = async (projectData) => {
  try {
    console.log("-----------------------------------------------------------------------------------------------------------------------------------------Project Data:"+Array.from(projectData.entries()));
    const response = await privateAxios.put('/project/editproject', projectData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    return response.data;
  } catch (err) {
    throw err.response?.data || { error: "Project update failed" };
  }
};