import React from 'react';
import {IPhotosListProps} from "../../models";
import Photo from "./Photo";

function PhotosList({ photos } : IPhotosListProps) {
  let photosRendered = photos.map(photo => (<Photo key={photo.id} photo={photo}/>))
  return (
    <div className="grid grid-cols-3 gap-2">
      {photosRendered}
    </div>
  );
}

export default PhotosList;