import { configureStore } from "@reduxjs/toolkit";
import chatReducer from './chatSlice';
import authenticationReducer from './authenticationSlice';

export const chatStore = configureStore({
  reducer: {
    chat: chatReducer,
    authentication: authenticationReducer,
  },
  devTools: process.env.NODE_ENV !== 'production', // Enable DevTools only in development
});
