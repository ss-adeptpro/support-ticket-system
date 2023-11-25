import {Reducer, configureStore} from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import { apiSlice } from "../api/apiSlice";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
// import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import autoMergeLevel1 from "redux-persist/lib/stateReconciler/autoMergeLevel1";

//clear entire storage
const rootReducerExtended:Reducer = (state: AppState, action: any) => {
  if (action.type === 'auth_slice/logOut') {    
    // this applies to all keys defined in persistConfig(s)
    storage.removeItem('persist:root')
    state = {} as AppState
  }
  return rootReducer(state, action)
}

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel1,
  blacklist: [apiSlice.reducerPath],    //dont persist api
}
const persistedReducer = persistReducer(persistConfig, rootReducerExtended)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      //Adding the api middleware enables caching, invalidation, polling, and other useful features of `rtk-query`.
      /*NOTE: serializableCheck is mandatory othwerwise we get below error - 
        A non-serializable value was detected in an action, in the path: `register`
      */
      getDefaultMiddleware({serializableCheck: false}).concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production'
})

export const persistor = persistStore(store)

// Infer the `AppState` and `AppDispatch` types from the store itself
export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
