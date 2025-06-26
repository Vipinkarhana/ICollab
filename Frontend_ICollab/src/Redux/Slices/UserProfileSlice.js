import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserProfile } from '../../Services/profileService';
import { updatePinnedProjects } from '../../Services/projectService';
import { fetchUserProjects } from '../../Services/projectService';
import { fetchUserPost } from '../../Services/postService';

export const updateTopProjects = createAsyncThunk(
  'userProfile/updateTopProjects',
  async ({ topProjects }, thunkAPI) => {
    try {
      // Extract project IDs from full project objects
      const projectIds = topProjects?.map((proj) => proj?.id);

      // Send only IDs to backend
      const data = await updatePinnedProjects(projectIds);

      return topProjects;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const fetchUserProfile = createAsyncThunk(
  'userProfile/fetchUserProfile',
  async (username, thunkAPI) => {
    try {
      const data = await getUserProfile(username);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchUserProjectsData = createAsyncThunk(
  'projects/fetchUserProjects',
  async (username, { rejectWithValue }) => {
    try {
      const response = await fetchUserProjects(username);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserPostsData = createAsyncThunk(
  "post/fetchUserPostsData",
  async (username, { rejectWithValue }) => {
    try {
      const response = await fetchUserPost(username);
      if (response.status === "success") {
        return response.data;
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState: {
    user: null,
    stats: null,
    projects: [],
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearUserProfile: (state) => {
      state.data = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.stats = action.payload.stats;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      })
      .addCase(fetchUserProjectsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProjectsData.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchUserProjectsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserPostsData.pending, (state, action) =>{
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPostsData.fulfilled, (state, action) => {
        state.posts = [...action.payload];
        state.loading = false;
      })
      .addCase(fetchUserPostsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTopProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
    .addCase(updateTopProjects.fulfilled, (state, action) => {
      state.loading = false;
      if (state.data?.user?.profile) {
        state.data.user.profile.topProjects = action.payload;
      }
    })
    .addCase(updateTopProjects.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to update top projects';
    });
},
});

export const { clearUserProfile } = userProfileSlice.actions;

export default userProfileSlice.reducer;
