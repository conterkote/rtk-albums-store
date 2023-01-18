import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { IAlbum, IAlbumWithNewValue, IUser } from "../../models";
import {faker} from "@faker-js/faker";

const commitTest = 'Hello world haha merge it!'
const commitTest3 = 'Hello world haha merge it!'
const commitTest2 = 'Hello world haha merge it!'

const albumsAPI = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001',

  }),
  tagTypes: ['Album', 'UsersAlbums'],
  endpoints: (builder) => {
    return {
      changeAlbum: builder.mutation<IAlbumWithNewValue, IAlbumWithNewValue>({
        invalidatesTags: (result, error, arg) => {
          return [{type: 'Album', id: arg.album.id}]
        },
        query({album, newValue}: IAlbumWithNewValue) {
          return {
            url: `/albums/${album.id}`,
            method: 'PUT',
            body: {
              userId: album.userId,
              name: newValue
            }
          }
        }
      }),
      removeAlbum: builder.mutation<IAlbum, IAlbum>({
        invalidatesTags: (result, error, album) => {
          return [{type: 'Album', id: album.id}]
        },
        query: (album) => {
          return {
            url: `/albums/${album.id}`,
            method: 'DELETE',
          }
        }
      }),
      createAlbum: builder.mutation<IAlbum, IUser>({
        invalidatesTags: (result, error, user) => {
          return [{type: 'UsersAlbums', id: user.id}]
        },
        query: (user) => {
          return {
            url: '/albums',
            method: 'POST',
            body: {
              userId: user.id,
              name: faker.commerce.productName()
            }
          }
        }
      }),
      fetchAlbums: builder.query<IAlbum[], IUser>({
        providesTags: (result, error, user) => {
          return result ?
            [
              ...result.map(album => ({type: 'Album' as const, id: album.id})),
              {type: 'UsersAlbums', id: user.id}
            ]
            : [{type: 'UsersAlbums', id: user.id}]
        },
        query: (user) => {
          return {
            url: 'albums',
            method: 'GET',
            params: {
              userId: user.id
            },
          }
        }
      })
    }
  }
})

export const {useFetchAlbumsQuery, useCreateAlbumMutation, useRemoveAlbumMutation, useChangeAlbumMutation} = albumsAPI
export {albumsAPI}