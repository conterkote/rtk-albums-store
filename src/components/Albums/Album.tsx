import React from 'react';
import {IAlbum} from "../../models";
import ExpandablePanel from "../ExpandablePanel";
import PhotosWrapper from "../Photos/PhotosWrapper";

export interface IAlbumProps {
  album: IAlbum
}

function Album({album}: IAlbumProps) {
  return (
    <div>
      <ExpandablePanel
        key={album.id}
        header={album.name}
        value={album.name}
        selectedItem={album}
        target={'album'}
      >
        <PhotosWrapper album={album}/>
      </ExpandablePanel>
    </div>)
}

export default Album;