import { combineReducers } from "redux";
import { apiSlice } from "../../api/apiSlice";
import authSlice from "../../features/auth/authSlice";
import usersSlice from "../../features/Users/usersSlice";

const rootReducer = combineReducers({
  [apiSlice.reducerPath] : apiSlice.reducer,
  auth: authSlice,
  users: usersSlice,
})

export default rootReducer;