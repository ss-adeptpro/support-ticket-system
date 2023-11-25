import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_DEAFULT_TIMEOUT } from './api.types';
import { AppState } from '../store/store';

//Creates an api service to use in the application
export const apiSlice = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({
      baseUrl: `${import.meta.env.VITE_API_BASE_URL}`,
      /*
        Set a timeout for the api otherwise api requests will stay pending
        until your api resolves the request(s) or it reaches the browser's default timeout
      */
      timeout: API_DEAFULT_TIMEOUT,  // Set a default timeout in milisec
      prepareHeaders: (headers, {getState}) => {
        const appState = getState() as AppState;
        const token = appState.auth.accessToken;
        if (token) {
          //set headers to be 'Bearer token'
          headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
      }      
    }),
    //  tagTypes: ["Ticket", "User"], //invalidate the cache at the injectEendpoint time
    endpoints: () => ({})
})