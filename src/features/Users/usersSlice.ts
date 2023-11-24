import { createSlice, current } from "@reduxjs/toolkit";
import { AppState } from "../../store/store";

const usersInitialState = {
  users: []
}

export const usersSlice  = createSlice({
  name: 'users_slice',
  initialState: usersInitialState,
  reducers: {
    getUsers: (state) => {
      console.log('state.users', state)
    },
    //to set the access token
    setUsers: (state, action) => {
      // state.accessToken = action?.payload?.accessToken ?? null;
      // localStorage.setItem("authToken", JSON.stringify(state.accessToken));
      console.log('Next State of Users ', current(state))
    }
  }
});

/*  NOTE:
  createSlice creates 'action creator/s' automatically as given below
  setUsers is an action creator  - a function which returns an object with 'type' and 'payload'

  console.log(users_slice.actions.setUsers({accessToken: 'regrh'}));
  {type : "users_slice/setUsers", payload : {accessToken: 'regrh'}}
*/  

export const selectUsers = (state:AppState) => state.users.users;
export const {getUsers, setUsers} = usersSlice.actions;
export default usersSlice.reducer;

