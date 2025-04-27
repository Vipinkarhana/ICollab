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