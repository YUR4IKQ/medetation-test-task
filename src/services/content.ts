import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IArticle } from '../types/article';
import { IApiResponse } from '../types/apiResponse';
import { IAudio } from '../types/audio';

export const contentApi = createApi({
  reducerPath: 'articlesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://astrodev.space/api/affirmations/test' }),
  endpoints: (builder) => ({
    getAudio: builder.query<IAudio[], void>({
      query: () => '',
      transformResponse: (response: IApiResponse) => response.audio,
    }),
    getArticles: builder.query<IArticle[], void>({
      query: () => '',
      transformResponse: (response: IApiResponse) => response.articles,
    }),
  }),
})

export const { useGetAudioQuery, useGetArticlesQuery } = contentApi;
