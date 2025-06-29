import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getSavedPosts,
  getSavedProjects,
  toggleSaveItem,
} from '../../Services/saveItemService';

// Async thunks
export const fetchSavedPosts = createAsyncThunk(
  'savedItem/fetchSavedPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getSavedPosts();
      if (response.status === "success") {
        return response.data;
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },{
    condition: (_, { getState }) => {
      const state = getState();
      const { savedPosts } = state?.savedItem;
      return savedPosts == null;
    }
});

export const fetchSavedProjects = createAsyncThunk(
  'savedItem/fetchSavedProjects',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getSavedProjects();
      if (response.status == "success") {
        return response.data;
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },{
    condition: (_, { getState }) => {
      const state = getState();
      const { savedProjects } = state?.savedItem;
      return savedProjects == null;
    }
});

// Toggle Save/Unsave Item thunk
export const toggleSaveItemThunk = createAsyncThunk(
  'savedItem/toggleSaveItem',
  async ({ itemId, itemType, item }) => {
    const data = await toggleSaveItem(itemId, itemType);
    return {
      itemId,
      itemType,
      message: data.message,
      actionType: data.actionType,
      item,
    };
  }
);

const savedItemSlice = createSlice({
  name: 'savedItem',
  initialState: {
    savedPosts: null,
    savedProjects: null,
    loading: false,
    error: null,
    message: '',
  },
  reducers: {
    clearSavedItemMessage(state) {
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Saved Posts
      .addCase(fetchSavedPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSavedPosts.fulfilled, (state, action) => {
        state.savedPosts = action.payload;
        state.loading = false;
      })
      .addCase(fetchSavedPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })

      // Fetch Saved Projects
      .addCase(fetchSavedProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSavedProjects.fulfilled, (state, action) => {
        state.savedProjects = action.payload;
        state.loading = false;
      })
      .addCase(fetchSavedProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })

      // Toggle Save/Unsave Item
      .addCase(toggleSaveItemThunk.fulfilled, (state, action) => {
        // state.message = action.payload.message;
        const { itemId, itemType, actionType, item } = action.payload;
        if (itemType === 'posts') {
          if (actionType === 'saved') {
            const exists = state.savedPosts.some(p => p._id === itemId);
            if (!exists && item) {
              state.savedPosts.push(item);
            }
          } else if (actionType === 'unsaved') {
            state.savedPosts = state.savedPosts.filter(p => p._id !== itemId);
          }
        }

        if (itemType === 'projects') {
          if (actionType === 'saved') {
            const exists = state.savedProjects.some(p => p._id === itemId);
            if (!exists && item) {
              state.savedProjects.push(item); // Optional: update to full object if available
            }
          } else if (actionType === 'unsaved') {
            state.savedProjects = state.savedProjects.filter(p => p.id !== itemId);
          }
        }
      })
      .addCase(toggleSaveItemThunk.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { clearSavedItemMessage } = savedItemSlice.actions;
export default savedItemSlice.reducer;

