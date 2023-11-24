import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";
import { AppState } from "../../store/store";
import { TAccessToken } from "./auth.types";

const initialState:TAccessToken = {
  accessToken: null
}

export const authSlice  = createSlice({
  name: 'auth_slice',
  initialState: initialState,
  reducers: {
    getCredentials: (state:TAccessToken) => {
      console.log('state.posts', state)
    },
    //to set the access token
    setCredentials: (state:TAccessToken, action:PayloadAction<TAccessToken>) => {
      state.accessToken = action?.payload?.accessToken ?? null;
      localStorage.setItem("authToken", JSON.stringify(state.accessToken));
      console.log('Next State ', current(state))
    },
    logOut: (state:TAccessToken) => {
			state.accessToken = null;
      localStorage.removeItem("authToken");
		},
  }
});

/*  NOTE:
  createSlice creates 'action creator/s' automatically as given below
  setCredentials is an action creator  - a function which returns an object with 'type' and 'payload'

  console.log(authSlice.actions.setCredentials({accessToken: 'regrh'}));
  {type : "auth_slice/setCredentials", payload : {accessToken: 'regrh'}}
*/  

export const selectCurrentToken = (state:AppState) => state.auth.accessToken;
export const {getCredentials, setCredentials, logOut} = authSlice.actions;
export default authSlice.reducer;

