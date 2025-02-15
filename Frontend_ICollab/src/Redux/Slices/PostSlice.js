import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addPost, getFeed, getMyPost } from "../../services/postService";

export const createPost = createAsyncThunk(
    "post/createPost",
    async ({mediaFiles}, { rejectWithValue, getState }) => {
        try {
            console.log("createPost thunk");
            console.log(mediaFiles);
            const state = getState();
            const content = state.post.post.content;

            const response = await addPost({ content, mediaFiles });
            if(response.status === 'success') {
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

export const fetchFeed = createAsyncThunk(
    "post/fetchFeed",
    async (timestamp, { rejectWithValue}) => {
        try {
            // const state = getState();
            // const timestamp = state.post.feed.timestamp;
            const response = await getFeed(timestamp);
            if(response.status === 'success') {
                return response.data;
            } else {
                return rejectWithValue(response.message);
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchMyPosts = createAsyncThunk(
    "post/fetchMyPosts",
    async (_, { rejectWithValue}) => {
        try {
            const response = await getMyPost();
            if(response.status === 'success') {
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
    },
    feed: {
        timestamp: new Date().getTime(),
        posts: [],
    },
    myPost: [],
    savePost: [],
    error: null,
    loading: false,
};

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        addDraft: (state, action) => {
            const { content, tags, hashtags } = action.payload;
            state.post.content = content;
            state.post.tags = tags;
            state.post.hashtags = hashtags;
        },
        setTimestamp: (state, action) => {
            state.feed.timestamp = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createPost.fulfilled, (state, action) => {
            state.myPost = [action.payload, ...state.myPost];
            state.feed.posts = [action.payload, ...state.feed.posts];
            state.post.content = "";
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
        builder.addCase(fetchMyPosts.fulfilled, (state, action) => {
            state.myPost = [...action.payload]; // Get All My Posts
            state.loading = false;
        });
        builder.addCase(fetchMyPosts.rejected, (state, action) => {
            state.error = action.payload;
        });
    },
});

export const { addDraft } = postSlice.actions;
export default postSlice.reducer;
