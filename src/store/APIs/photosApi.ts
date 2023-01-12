import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IAlbum, IPhoto} from "../../models";
import {faker} from "@faker-js/faker";

const photosApi = createApi({
  reducerPath: 'photos',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001',
  }),
  tagTypes : ['Photo', 'AlbumsPhotos'],
  endpoints(builder) {
    return {
      fetchPhotos : builder.query<IPhoto[], IAlbum>({
        providesTags : (result, error, album) => {
          return result ?
            [
              ...result.map(photo => ({type : 'Photo' as const, id : photo.id})),
              {type : 'AlbumsPhotos', id : album.id}
            ] :
            [{type : 'AlbumsPhotos', id : album.id}]
        },
        query : (album) => {
          return {
            url : '/photos',
            method : 'GET',
            params : {
              albumId : album.id
            }
          }
        }
      }),
      addPhoto : builder.mutation<IPhoto[], IAlbum>({
        invalidatesTags : (result, error, album) => {
          return [{type : 'AlbumsPhotos', id : album.id}]
        },
        query : (album) => {
          const fakeUrl = faker.image.imageUrl(640, 480, 'cats', true)
          return {
            url : '/photos',
            method : 'POST',
            body : {
              albumId : album.id,
              url : fakeUrl,
            }
          }
        }
      }),
      removePhoto : builder.mutation<IPhoto, IPhoto>({
        invalidatesTags : (result, error, photo) => {
          return [{type : 'Photo', id : photo.id}]
        },
        query : (photo) => {
          return {
            url : `/photos/${photo.id}`,
            method : 'DELETE'
          }
        }
      })
    }
}})

export const { useFetchPhotosQuery, useAddPhotoMutation, useRemovePhotoMutation } = photosApi
export {photosApi}