import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addPost } from "../../services/postService";

export const createPost = createAsyncThunk(
    "post/createPost",
    async ({mediaFiles}, { rejectWithValue, getState }) => {
        try {
            console.log("createPost thunk");
            console.log(mediaFiles);
            const state = getState();
            const content = state.post.post.content;

            const response = await addPost({ content, mediaFiles });

            return response.data;
        } catch (error) {
            console.log(error);
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
    myPost: [],
    savePost: [],
    error: null,
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
    },
    extraReducers: (builder) => {
        builder.addCase(createPost.fulfilled, (state, action) => {
            console.log("Post created successfully");
            console.log("Redux Action Post:",action.payload);
            state.myPost.push(action.payload);
            state.post.content = "";
        });
        builder.addCase(createPost.rejected, (state, action) => {
            state.error = action.payload;
        });
    },
});

export const { addDraft } = postSlice.actions;
export default postSlice.reducer;
