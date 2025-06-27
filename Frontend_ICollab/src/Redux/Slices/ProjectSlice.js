import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  userProjects: [], 
  currentProject: null,
  loading: false,
  error: null,
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
     setCurrentProject: (state, action) => {
      state.currentProject = action.payload;
    },
    clearCurrentProject: (state) => {
      state.currentProject = null;
    }
  },
  // extraReducers: (builder) => {
  //   builder
  //     // .addCase(fetchUserProjectsData.pending, (state) => {
  //     //   state.loading = true;
  //     //   state.error = null;
  //     // })
  //     // .addCase(fetchUserProjectsData.fulfilled, (state, action) => {
  //     //   state.loading = false;
  //     //   state.userProjects = action.payload;
  //     // })
  //     // .addCase(fetchUserProjectsData.rejected, (state, action) => {
  //     //   state.loading = false;
  //     //   state.error = action.payload;
  //     // });
  // },
});

export const { setCurrentProject, clearCurrentProject } = projectSlice.actions;
export default projectSlice.reducer;
