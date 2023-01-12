import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {IUser} from "../../models";

export const deleteUser = createAsyncThunk('users/delete', async (id: string) => {
  await axios.delete<IUser>(`http://localhost:3001/users/${id}`)
  return id
})