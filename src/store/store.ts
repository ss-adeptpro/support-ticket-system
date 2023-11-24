import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import { apiSlice } from "../api/apiSlice";

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      //Adding the api middleware enables caching, invalidation, polling, and other useful features of `rtk-query`.
      getDefaultMiddleware().concat(apiSlice.middleware),
      devTools: process.env.NODE_ENV !== 'production'
})

// Infer the `AppState` and `AppDispatch` types from the store itself
export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
