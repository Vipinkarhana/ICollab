import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; 
import { persistReducer, persistStore } from "redux-persist";
import indexedDBStorageAdapter from "./IndexedDBStorageAdapter";
import userReducer from "./Slices/UserSlice";
import postReducer from "./Slices/PostSlice";
import projectReducer from "./Slices/ProjectSlice";
import userProfileReducer from "./Slices/UserProfileSlice"
import saveItemReducer from "../Redux/Slices/SaveItemSlice";

const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["userData", "profileData"],
};

const postPersistConfig = {
  key: "post",
  storage: indexedDBStorageAdapter,
  whitelist: ["savePost"],
};

const projectPersistConfig = {
  key: "projects",
  storage,
  whitelist: ["userProjects", "ongoingProjects", "finishedProjects"],
};


const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  post: persistReducer(postPersistConfig, postReducer),
  project: persistReducer(projectPersistConfig, projectReducer),
  userProfile: userProfileReducer,
  savedItem: saveItemReducer,
});


export const store = configureStore({
  reducer: rootReducer,
  projects: projectReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
