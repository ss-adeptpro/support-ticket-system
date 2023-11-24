import { combineReducers } from "redux";
import { apiSlice } from "../../api/apiSlice";
import authSlice from "../../features/auth/authSlice";

const rootReducer = combineReducers({
  [apiSlice.reducerPath] : apiSlice.reducer,
  auth: authSlice
})

export default rootReducer;