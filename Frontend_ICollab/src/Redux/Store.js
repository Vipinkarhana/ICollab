import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/UserSlice"; 

export const store = configureStore({
  reducer: {
    user: userReducer, 
  },
});

export default store;
