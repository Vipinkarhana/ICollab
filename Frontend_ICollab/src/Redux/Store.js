import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // Uses localStorage
import { persistReducer, persistStore } from "redux-persist";
import indexedDBStorageAdapter from "./IndexedDBStorageAdapter";
import userReducer from "./Slices/UserSlice";
import postReducer from "./Slices/PostSlice";

const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["userData", "profileData"],
};

const postPersistConfig = {
  key: "post",
  storage: indexedDBStorageAdapter,
  whitelist: [],
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  post: persistReducer(postPersistConfig, postReducer),
});

// Create store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
