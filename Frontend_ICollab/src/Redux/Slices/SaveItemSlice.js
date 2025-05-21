import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getSavedPosts,
  getSavedProjects,
  toggleSaveItem,
} from '../../Services/saveItemService';

// Async thunks
export const fetchSavedPosts = createAsyncThunk('savedItem/fetchSavedPosts', async () => {
  const data = await getSavedPosts();
  return data;
});

export const fetchSavedProjects = createAsyncThunk('savedItem/fetchSavedProjects', async () => {
  const data = await getSavedProjects();
  return data;
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
    savedPosts: [],       // Array of full post objects
    savedProjects: [],    // Array of full project objects (optional)
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
        state.savedPosts = action.payload.data; // Full post objects
        state.loading = false;
      })
      .addCase(fetchSavedPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch Saved Projects
      .addCase(fetchSavedProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSavedProjects.fulfilled, (state, action) => {
        state.savedProjects = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchSavedProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
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
            state.savedProjects = state.savedProjects.filter(p => p._id !== itemId);
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

