import privateAxios from "./apiService";
// Save item (post or project)
export const toggleSaveItem = async (itemId, itemType) => {
  const response = await privateAxios.post('/saveitems/toggle', { itemId, itemType });
  return response.data;
};

// Get saved posts
export const getSavedPosts = async () => {
  const response = await privateAxios.get('/saveitems/posts');
  console.log(response.data);
  return response.data;
};

// Get saved projects
export const getSavedProjects = async () => {
  const response = await privateAxios.get('/saveitems/projects');
  console.log(response.data);
  return response.data;
};
