import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addPost,
  getFeed,
  editPost,
  deletePost,
  likeAndUnlikePost,
} from "../../Services/postService";

export const createPost = createAsyncThunk(
  "post/createPost",
  async ({ mediaFiles }, { rejectWithValue, getState }) => {
    try {
      console.log("createPost thunk");
      console.log(mediaFiles);
      const state = getState();
      const content = state.post.post.content;
      console.log(content);

      const response = await addPost({ content, mediaFiles });
      if (response.status === "success") {
        return response.data;
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const toggleLike = createAsyncThunk(
  "post/toggleLike",
  async (postId, { rejectWithValue }) => {
    try {
      console.log("Reached post slice and about to hit the route");
      const response = await likeAndUnlikePost(postId);
      return { postId, ...response.data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePost = createAsyncThunk(
  "post/updatePost",
  async ({ mediaFiles }, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const post = state.post.post;

      const response = await editPost({ ...post, mediaFiles });
      if (response.status === "success") {
        return response.data;
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const removePost = createAsyncThunk(
  "post/removePost",
  async ({ postid }, { rejectWithValue }) => {
    try {
      console.log("In Redux: ", postid);
      const response = await deletePost(postid);
      if (response.status === "success") {
        return response.message;
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchFeed = createAsyncThunk(
  "post/fetchFeed",
  async (timestamp, { rejectWithValue }) => {
    try {
      const response = await getFeed(timestamp);
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

const initialState = {
  post: {
    content: "",
    tags: [],
    hashtags: [],
    media: [],
  },
  feed: {
    timestamp: new Date().getTime(),
    posts: [],
  },
  isStartPostModalOpen: false,
  error: null,
  loading: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addDraft: (state, action) => {
      const { content, tags, hashtags, media, id } = action.payload;
      state.post.content = content;
      state.post.tags = tags;
      state.post.hashtags = hashtags;
      state.post.media = media;
      state.post.id = id;
    },
    openPostModal: (state, action) => {
      state.isStartPostModalOpen = action.payload;
    },
    setTimestamp: (state, action) => {
      state.feed.timestamp = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.feed.posts = [action.payload, ...state.feed.posts];
      state.post = initialState.post;
    });
    builder.addCase(toggleLike.fulfilled, (state, action) => {
      const { postId, liked } = action.payload;
      // Update feed posts
      state.feed.posts = state.feed.posts.map(post => {
        if (post._id === postId) {
          return { 
            ...post,
            likes: liked ? post.likes + 1 : post.likes - 1,
            isLiked: liked 
          };
        }
        return post;
      });
  
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(fetchFeed.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchFeed.fulfilled, (state, action) => {
      state.feed.posts = [...state.feed.posts, ...action.payload];
      state.loading = false;
    });
    builder.addCase(fetchFeed.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(updatePost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.feed.posts = [action.payload, ...state.feed.posts];
      state.loading = false;
    });
    builder.addCase(updatePost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { addDraft, openPostModal } = postSlice.actions;
export default postSlice.reducer;
