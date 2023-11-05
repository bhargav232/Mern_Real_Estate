import { configureStore } from '@reduxjs/toolkit'
import  useReducer from './user/userSlice';

export const store =   configureStore({
  reducer: {user: useReducer},
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck : false,
  }),
});

// we add middleware to avoid serialization error between modules