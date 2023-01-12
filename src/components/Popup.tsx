import React, {CSSProperties, useEffect, useState} from 'react';
import {IAlbum, IAlbumWithNewValue, IPopupProperties, IUser} from "../models";
import {useChangeAlbumMutation, useRemoveAlbumMutation} from "../store/APIs/albumsAPI";
import {deleteUser} from "../store/Thunks/deleteUser";
import {useAppDispatch} from "../store/store";
import Spinner from "./Spinner";
import {changeCurrentValue, closePopup} from "../store/Slices/popupSlice";
import {putUser} from "../store/Thunks/putUser";

function Popup({offsetLeft, offsetTop, display, selectedItem, currentValue, target}: IPopupProperties) {
  const height = 14 * 4 - 10;
  let currentPopupInput = ''
  const [removeAlbum] = useRemoveAlbumMutation()
  const [changeAlbum, changeAlbumResults] = useChangeAlbumMutation()
  const dispatch = useAppDispatch()
  const [isDeleting, setIsDeleting] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  console.log(offsetTop)

  const stopDeletingSpinner = () => {
    setIsDeleting(false)
    dispatch(closePopup())
  }

  const onValueChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    dispatch(changeCurrentValue(e.currentTarget.value))
  }

  const onCloseButton = () => {
    dispatch(closePopup())
  }

  const onDeleteButton = async (e: React.SyntheticEvent) => {
    switch (target) {
      case 'user' : {
        setIsDeleting(true);
        dispatch(deleteUser((selectedItem as IUser).id))
          .unwrap()
          .finally(() => {
            stopDeletingSpinner()
          });
        break;
      }
      case 'album' : {
        setIsDeleting(true)
        removeAlbum(selectedItem as IAlbum).then(() => {
          stopDeletingSpinner()
        })
      }
    }
  }

  const onSubmitHandle = (e: React.SyntheticEvent) => {
    setIsChanging(true)
    switch (target) {
      case 'user' : {
        const albumWithNewValue: IAlbumWithNewValue = {
          album: selectedItem as IAlbum,
          newValue: currentValue as string
        }
        dispatch(putUser({
          user: selectedItem as IUser,
          newValue: currentValue as string
        })).then(() => setIsChanging(false))
        break;
      }
      case 'album' : {
        const albumWithNewValue: IAlbumWithNewValue = {
          album: selectedItem as IAlbum,
          newValue: currentValue as string
        }
        changeAlbum(albumWithNewValue).then(() => setIsChanging(false))
        break;
      }
    }
    e.preventDefault()
  }

  let style;
  if (offsetLeft && offsetTop) {
    style = {
      position: 'absolute',
      left: `${offsetLeft}px`,
      top: `${offsetTop - height}px`,
      display: display,
    } as CSSProperties
  }
  return (
    <div style={style}
         className="popup-item z-[1] w-96 bg-white border-2 flex box-border border-slate-700 rounded h-14 items-center justify-around">
      <form
        className="popup-item w-2/3 box-border"
        onSubmit={onSubmitHandle}>
        <input
          value={currentValue as string}
          onChange={onValueChange}
          name="card-popup-name"
          className="popup-item w-full px-2 border-slate-700 border-2" type={"text"}/>
      </form>
      <span className="popup-item ml-1 cursor-pointer"
            onClick={onDeleteButton}>Del</span>
      <span className="popup-item cursor-pointer"
            onClick={onCloseButton}>X</span>
      {
        (isChanging || isDeleting) && <Spinner size={'s'}/>
      }
    </div>
  );
}

export default Popup;