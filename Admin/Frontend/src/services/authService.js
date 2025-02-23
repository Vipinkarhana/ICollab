import { publicAxios } from './apiService';
import privateAxios from './apiService';

// Login function
export const login = async ({email, password}) => {
  try {
    const response = await publicAxios.post('/auth/login', { email, password });
    const { accessToken } = response.data;
    // Store access token
    localStorage.setItem('accessToken', accessToken);
    return response.data;
  } catch (error) {
    return error.response?.data || 'Login failed';
  }
};
// Register function
export const register = async (userData) => {
  try {
    const response = await publicAxios.post('/auth/register', userData);
    // const { accessToken } = response.data;
    // localStorage.setItem('accessToken', accessToken);
    return response.data;
  } catch (error) {
    return error.response?.data || 'Registration failed';
  }
};

export const googleAuth = async ({credential}) => {
    try {
      const res = await publicAxios.post("/auth/google", { credential });

      // Save access token to local storage
      localStorage.setItem("accessToken", res.data.accessToken);
      return res.data;
    } catch (error) {
      return error.response?.data || 'Google authentication failed';
    }
};

export const linkedinAuth = async () => {
  window.location.href= `${import.meta.env.VITE_BACKEND_DOMAIN}/api/auth/linkedin`
};

export const test = async () => {
  try {
    const response = await privateAxios.get(`${import.meta.env.VITE_BACKEND_DOMAIN}/test`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error.response?.data || 'Test failed';
  }
};

// Logout function
export const logout = async () => {
  try {
    const response = await publicAxios.post('/auth/logout');

    // Clear access token from localStorage
    localStorage.removeItem('accessToken');
    return response.data;
  } catch (error) {
    return error.response?.data || 'Logout failed';
  }
};

export const getUserByUsername = async (username) => {
  try {
    console.log("Fetching user data for:", username);
    const response = await privateAxios.get(`/profile/${username}`); // FIXED
    console.log("User data received:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching user:",
      error.response?.data || error.message
    );
    return { message: "Failed to fetch user data" };
  }
};