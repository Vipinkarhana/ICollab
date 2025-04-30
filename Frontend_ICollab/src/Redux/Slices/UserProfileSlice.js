import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserProfile } from '../../Services/profileService';

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

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState: {
    data: null,
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
        state.data = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const { clearUserProfile } = userProfileSlice.actions;

export default userProfileSlice.reducer;
