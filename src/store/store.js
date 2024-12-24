import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default: localStorage
import authReducer from "../features/AuthSlice/authSlice"; // Auth slice for managing authentication
import { apiSlice } from "../services/apiService";

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer, // Auth slice to be persisted
  [apiSlice.reducerPath]: apiSlice.reducer, // RTK Query API slice
});

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Persist only the auth slice
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for Redux Persist
    }).concat(apiSlice.middleware), // Add RTK Query middleware
});

// Create the persistor
export const persistor = persistStore(store);

export default store;
