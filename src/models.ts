import React from "react";

export interface ICardWrapperProps {
  users: IUser[];
  isLoadingUsers : boolean,
  postSkeletonsCount : number
}

export interface IControlProps {
  setPostSkeletonsCount : React.Dispatch<React.SetStateAction<number>>
}

export interface IPhotosWrapperProps {
  album : IAlbum
}

export interface IPhotosListProps {
  photos : IPhoto[]
}
export interface IPhotoProps {
  photo : IPhoto
}

export interface ICardSkeletonProps {
  count : number;
  size? : 's' | 'm' | 'l'
  type? : 'photo' | 'card'
}

export type albumTag = {type : 'Album', id : string}
export type usersAlbumsTag = {type : 'UsersAlbums', id : string}

export type IPopupProperties = {
  offsetTop : number | null,
  offsetLeft : number | null,
  display : 'none' | 'flex',
  currentValue : string | null,
  selectedItem : IUser | IAlbum | IPhoto | null,
  target : string | null
}

export type IPopupPayload = {
  offsetTop : number,
  offsetLeft : number,
  currentValue : string,
  selectedItem : IUser | IAlbum | IPhoto | null,
  target : string
}

export type IPopupPreparedPayload = {
  offsetTop : number,
  offsetLeft : number,
  currentValue : string,
  selectedItem : IUser | IAlbum | IPhoto | null,
  display : 'none' | 'flex'
  target : string
}

export interface ICardProps {
  user : IUser
}

export interface IUser {
  "id" : string,
  "name" : string
}

export interface IAlbum {
  "id" : string,
  "name" : string,
  "userId" : number
}

export type IAlbumWithNewValue = {
  album : IAlbum,
  newValue : string
}

export type IUserWithNewValue = {
  user : IUser,
  newValue : string
}

export interface IPhoto {
  "id" : string,
  "url" : string,
  "albumId" : number
}

export type ThunkState = 'idle' | 'pending' | 'fulfilled' | 'rejected'