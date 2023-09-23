import { configureStore } from "@reduxjs/toolkit";
import { chatSlice } from './slices/chat-slice.js'

const store = configureStore({
  reducer: {
    chat: chatSlice.reducer,
  },
});

export default store;