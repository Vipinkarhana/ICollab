import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addPost } from "../../services/postService";

export const createPost = createAsyncThunk(
    "post/createPost",
    async (_, { rejectWithValue, getState }) => {
        try {
            console.log("createPost thunk");
            const state = getState();
            const content = state.post.post.content;
            const mediaFiles = state.post.post.mediaFiles;

            const response = await addPost({ content, mediaFiles });

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
        mediaFiles: [],
    },
    myPost: [],
    savePost: [],
};

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        addDraft: (state, action) => {
            const { content, mediaFiles } = action.payload;
            if (content !== undefined) {
                state.post.content = content;
            }
            if (mediaFiles !== undefined) {
                state.post.mediaFiles = mediaFiles;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createPost.fulfilled, (state, action) => {
            state.myPost.push(action.payload);
            state.post.content = "";
        });
    },
});

export const { addDraft } = postSlice.actions;
export default postSlice.reducer;
