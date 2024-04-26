import { configureStore } from '@reduxjs/toolkit';
import { contentApi } from '../../services/content';

export const store = configureStore({
  reducer: {
    [contentApi.reducerPath]: contentApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(contentApi.middleware),
})
