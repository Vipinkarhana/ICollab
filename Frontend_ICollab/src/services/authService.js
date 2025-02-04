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
    throw new Error(error.response?.data?.error?.message || 'Login failed');
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
    throw new Error(error.response?.data?.error?.message || 'Registration failed');
  }
};

export const googleAuth = async ({credential}) => {
    try {
      const res = await publicAxios.post("/auth/google", { credential });

      // Save access token to local storage
      localStorage.setItem("accessToken", res.data.accessToken);
      return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.error?.message || 'Google authentication failed');
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
    throw new Error('Test failed');
  }
};

// Logout function
export const logout = async () => {
  try {
    await publicAxios.post('/auth/logout');

    // Clear access token from localStorage
    localStorage.removeItem('accessToken');
  } catch (error) {
    throw new Error('Logout failed');
  }
};
