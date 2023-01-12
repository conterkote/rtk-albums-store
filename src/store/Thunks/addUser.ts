import {createAsyncThunk, nanoid} from "@reduxjs/toolkit";
import axios from "axios";
import {IUser} from "../../models";
import {faker} from "@faker-js/faker";

export const addUser = createAsyncThunk('users/add', async () => {
  const newUser = {
    name : faker.name.firstName()
  }
  const response = await axios.post<IUser>('http://localhost:3001/users', newUser);
  return response.data
})