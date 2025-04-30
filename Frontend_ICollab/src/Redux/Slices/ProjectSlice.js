import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserProjects } from '../../Services/projectService';

export const fetchUserProjectsData = createAsyncThunk(
  'projects/fetchUserProjects',
  async (username, { rejectWithValue }) => {
    try {
      const data = await fetchUserProjects(username); 
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const initialState = {
  userProjects: [], 
  loading: false,
  error: null,
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProjectsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProjectsData.fulfilled, (state, action) => {
        state.loading = false;
        state.userProjects = action.payload;
      })
      .addCase(fetchUserProjectsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default projectSlice.reducer;
