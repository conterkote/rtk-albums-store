import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {IUser, IUserWithNewValue} from "../../models";

export const putUser = createAsyncThunk('users/put', async ({user, newValue} : IUserWithNewValue) => {
  const response = await axios.put<IUser>(`http://localhost:3001/users/${user.id}`, {
    name : newValue
  });
  console.log(response.data);
  return response.data;
})