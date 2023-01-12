import {createSlice, SerializedError} from "@reduxjs/toolkit";
import {fetchUsers} from "../Thunks/fetchUsers";
import {IUser, ThunkState} from "../../models";
import {RootState} from "../store";
import {addUser} from "../Thunks/addUser";
import {putUser} from "../Thunks/putUser";
import {deleteUser} from "../Thunks/deleteUser";

export interface IUsersData {
  data : IUser[];
  status : ThunkState,
  error : SerializedError | null
}

const initialState: IUsersData = {
  data : [],
  status : 'idle', // pending, fulfilled, rejected
  error: null
}

const usersSlice = createSlice({
  initialState,
  name : "users",
  reducers : {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.data = action.payload;
    })
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.data.push(action.payload)
    })
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.data = state.data.filter(user => user.id !== action.payload)
    })
    builder.addCase(putUser.fulfilled, (state, action) => {
      const currentUser: IUser | undefined = state.data.find(user => user.id === action.payload.id)
      if (currentUser) currentUser.name = action.payload.name
      else console.warn('what the huynya')
    })
  }
})

export const selectAllUsers = (state : RootState) => state.users.data

export const usersReducer = usersSlice.reducer;