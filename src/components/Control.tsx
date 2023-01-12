import React from 'react';
import {addUser} from "../store/Thunks/addUser";
import {useAppDispatch} from "../store/store";
import {IControlProps} from "../models";

function Control({setPostSkeletonsCount}: IControlProps) {
  const dispatch = useAppDispatch();
  const onClickHandler = () => {
    setPostSkeletonsCount((prev) => prev + 1);
    dispatch(addUser())
      .unwrap()
      .catch()
      .finally(() => setPostSkeletonsCount(prevState => prevState - 1));
  }
  return (
    <div className="py-4 flex items-center justify-between px-2.5 w-full">
      <h1 className="">Users list</h1>
      <button onClick={onClickHandler}
              className="border-slate-700 border-2 px-4 py-1 transition hover:bg-green-400 rounded-lg">
        Add user
      </button>
    </div>
  );
}

export default Control;