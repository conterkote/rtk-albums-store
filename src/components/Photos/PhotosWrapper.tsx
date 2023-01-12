import React from 'react';
import {IPhotosWrapperProps} from "../../models";
import {useAddPhotoMutation, useFetchPhotosQuery} from "../../store/APIs/photosApi";
import PhotosList from "./PhotosList";
import Spinner from "../Spinner";
import CardSkeleton from "../Cards/CardSkeleton";

function PhotosWrapper({album}: IPhotosWrapperProps) {
  const {data, isFetching, status, error} = useFetchPhotosQuery(album)
  const [addPhoto, {isLoading}] = useAddPhotoMutation()
  const onAddClick = () => {
    addPhoto(album);
  }
  let content;
  if (isFetching) content = (
    <div className="grid grid-cols-3 gap-2">
      <CardSkeleton count={6} size={"l"} type="photo"/>
    </div>
  )
  else if (error) content = <p>Something went wrong</p>
  else if (data) content = <PhotosList photos={data}/>

  return (
    <div className="photos-wrapper">
      <div className="photos-header flex justify-between items-center my-2">
        <h3>Photos from "{album.name}"</h3>
        {isLoading ? <Spinner size={'s'}/>
          : <button onClick={onAddClick}
                    className="mb-0 border-slate-700 border-2 px-4 py-1 mb-3 transition hover:bg-green-400 rounded-lg">
            +
          </button>}
      </div>
      {content}
    </div>
  );
}

export default PhotosWrapper;