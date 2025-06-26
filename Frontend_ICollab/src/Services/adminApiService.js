import axios from 'axios';

// Create an axios instance
export const publicAxios = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_DOMAIN}/admin/`,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

const privateAxios = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_DOMAIN}/api/`, 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

// Function to refresh the access token
const refreshAccessToken = async () => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_DOMAIN}/api/auth/refresh`, {}, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    const { accessToken } = response.data;

    // Store new access token in localStorage
    localStorage.setItem('accessToken', accessToken);
    return accessToken;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    localStorage.removeItem('accessToken');
    throw error;
  }
};

// Request interceptor to add the access token to headers
privateAxios.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors and refresh token if needed
privateAxios.interceptors.response.use(
  (response) => response, 
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return privateAxios(originalRequest); // Retry the original request with the new token
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        throw new Error("Please login again to continue");
      }
    }
    console.error('Refresh Request failed:', error);

    throw new Error("Please login again to continue");
  }
);

export default privateAxios;