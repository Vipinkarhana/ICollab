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
    console.log("Project service response: ", response.data);
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