import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/UserSlice";
import postReducer from "./Slices/PostSlice"; // Ensure this path is correct

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer, // Ensure this name matches `name: "post"` in postSlice
  },
});

export default store;
