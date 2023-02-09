import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { apiSlice } from "./reducers/api";

// modify the 'storage' key to use a different storage engine
// add whitelist or blacklist keys to persist only a subset of the state
const persistConfig = {
  key: "root",
  storage,
};

// this is a persisted version of the rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// this includes thunk middleware by default.
export const store = configureStore({
  reducer: persistedReducer,
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

//this is a persisted version of the store that rehydrates the state on app start
//our store is saved in local storage and will remain after browser refresh
export const persistor = persistStore(store);
