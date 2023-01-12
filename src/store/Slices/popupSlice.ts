import {Action, createSlice, PayloadAction, PrepareAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {IPopupPreparedPayload, IPopupProperties} from "../../models";
import {albumsAPI} from "../APIs/albumsAPI";
import {act} from "react-dom/test-utils";

const initialState : IPopupProperties = {
  offsetTop : null,
  offsetLeft : null,
  display : 'none',
  currentValue : null,
  selectedItem : null,
  target : null
}

const popupSlice = createSlice({
  initialState,
  name : 'popup',
  reducers : {
    openPopup : {
      reducer : (state, action: PayloadAction<IPopupPreparedPayload>) => {
        return action.payload
      },
      prepare : (payload) => {
        return {
          payload : {
            ...payload,
            display : 'flex'
          }
        }
      }
    },
    closePopup : (state) => {
      return {
        display : 'none',
        offsetLeft : null,
        offsetTop : null,
        currentValue : null,
        selectedItem : null,
        target : null
      }
    },
    changeCurrentValue : (state, action : PayloadAction<string>) => {
      state.currentValue = action.payload
      return state
    }
  },
})

export const selectPopupProperties = (state: RootState) => state.popup;

export const { openPopup, closePopup, changeCurrentValue } = popupSlice.actions

export default popupSlice.reducer;