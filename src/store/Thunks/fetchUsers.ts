import axios from "axios";
import {IUser} from "../../models";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const response = await axios.get<IUser[]>('http://localhost:3001/users', {
    data: {}
  });
  return response.data;
})