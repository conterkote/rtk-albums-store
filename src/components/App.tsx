import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {fetchUsers} from "../store/Thunks/fetchUsers";
import {useAppDispatch} from "../store/store";
import {selectAllUsers} from "../store/Slices/usersSlice";
import {
  SerializedError
} from "@reduxjs/toolkit";
import CardWrapper from "./Cards/CardWrapper";
import Control from "./Control";
import Popup from "./Popup";
import {closePopup, selectPopupProperties} from "../store/Slices/popupSlice";

function App() {
  const dispatch = useAppDispatch();
  const users = useSelector(selectAllUsers)
  const popupProperties = useSelector(selectPopupProperties);
  const [isLoadingUsers, setIsLoadingUsers] = useState<boolean>(false);
  const [usersLoadingError, setUsersLoadingError] = useState<null | SerializedError>(null);
  const [postSkeletonsCount, setPostSkeletonsCount] = useState<number>(0);

  useEffect(() => {
    setIsLoadingUsers(true);
    dispatch(fetchUsers())
      .unwrap()
      .catch((e) => setUsersLoadingError(e))
      .finally(() => setIsLoadingUsers(false))
  }, [dispatch]);

  window.addEventListener('mousedown', (e : MouseEvent) => {
    if (popupProperties.display === 'flex' && !(
      (e.target as HTMLElement).classList.contains('popup-activator') ||
      (e.target as HTMLElement).classList.contains('popup-item'))
    ) {
      dispatch(closePopup())
    }
  })

  return (
    <div className="container mx-auto w-1/2">
      <Control setPostSkeletonsCount={setPostSkeletonsCount} />
      {popupProperties.display === 'flex' && <Popup
          display={popupProperties.display}
          offsetTop={popupProperties.offsetTop}
          offsetLeft={popupProperties.offsetLeft}
          currentValue={popupProperties.currentValue}
          selectedItem={popupProperties.selectedItem}
          target={popupProperties.target}
      />}
      { usersLoadingError && <p>{usersLoadingError.message}</p> }
      <CardWrapper users = {users}
                   isLoadingUsers={isLoadingUsers}
                   postSkeletonsCount={postSkeletonsCount}/>
    </div>
  )
}

export default App