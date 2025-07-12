import { publicAxios } from './apiService';
import privateAxios from './apiService';


export const submitIncubatorApplication = async (formData) => {
  try {
    const response = await privateAxios.post('/incubator/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};


export const getCurrentIncubator = async () => {
  try {
    const response = await privateAxios.get('/incubator/myincubatordetails');
    console.log("Response to service:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching incubator data:', {
      error: error.response?.data || error.message
    });
    throw error;
  }
};

export const getProgramsCount = async () => {
  try {
    const response = await privateAxios.get('/incubator/programs/count');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Add this function
export const getMyPrograms = async () => {
  try {
    const response = await privateAxios.get('/incubator/myprograms');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};