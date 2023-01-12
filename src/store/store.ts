import {configureStore, createSlice} from "@reduxjs/toolkit";
import {usersReducer} from "./Slices/usersSlice";
import {useDispatch} from "react-redux";
import {setupListeners} from "@reduxjs/toolkit/query";
import {albumsAPI} from "./APIs/albumsAPI";
import popupSlice from "./Slices/popupSlice";
import {photosApi} from "./APIs/photosApi";

const store = configureStore({
  reducer : {
    users : usersReducer,
    popup : popupSlice,
    albums : albumsAPI.reducer,
    [photosApi.reducerPath] : photosApi.reducer,
  },
  middleware : (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      albumsAPI.middleware
    ).concat(photosApi.middleware)
  }
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
