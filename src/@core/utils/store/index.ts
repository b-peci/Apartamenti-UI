// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'
import posts from '../postStore'
import chat from "../chatStore";

export const store = configureStore({
  reducer: {
    posts,
    chat
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})


export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
