import React, {useEffect, useState} from 'react';
import {IUser} from "../../models";
import {useCreateAlbumMutation, useFetchAlbumsQuery, useRemoveAlbumMutation} from "../../store/APIs/albumsAPI";
import Spinner from "../Spinner";
import Album from "./Album";
import CardSkeleton from "../Cards/CardSkeleton";

export interface IAlbumWrapperProps {
  user: IUser
}

function AlbumWrapper({user}: IAlbumWrapperProps) {
  const {data, error, isLoading, isSuccess, status} = useFetchAlbumsQuery(user)
  const [createAlbum, { status : createAlbumStatus }] = useCreateAlbumMutation();
  const [skeletonCount, setSkeletonCount] = useState(0);
  const [requestStep, setRequestStep] = useState(0);

  const handleCreateAlbum = () => {
    setSkeletonCount(skeletonCount + 1)
    createAlbum(user)
  }

  useEffect(() => {
    if (!isLoading) {
      if (requestStep === 0 && status === 'pending' && createAlbumStatus === 'fulfilled') {
        setRequestStep(requestStep + 1)
      } else if (requestStep === 1 && (createAlbumStatus === 'fulfilled' && status === 'fulfilled')) {
        setSkeletonCount(0);
        setRequestStep(0);
      }
    }
  }, [status, createAlbumStatus]);

  let content
  if (isLoading) {
    content = <CardSkeleton count={4} />
  } else if (error) {
    content = <p>Something went wrong</p>
  } else if (isSuccess) {
    content = data.map(album => <Album
          key={album.id}
          album={album} />
    )
  }
  return (
    <>
      <div className="flex items-center justify-between my-2 mb-4">
        <h3>{user.name}'s albums</h3>
        <button onClick={handleCreateAlbum}
                className="mb-0 border-slate-700 border-2 px-4 py-1 mb-3 transition hover:bg-green-400 rounded-lg">
          Add album
        </button>
      </div>
      {content}
      <CardSkeleton count={skeletonCount}/>
    </>
  );
}

export default AlbumWrapper;