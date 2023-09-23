import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedChat: null,
    myChats: [],
    isNewChatCreated: false
};

export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        updateIsNewChatCreatedStatus: (state, action) => {
            state.isNewChatCreated = action.payload
        },
        fillMyChats: (state, action) => {
            state.myChats = action.payload;
        }
    },
});

export const { 
    updateIsNewChatCreatedStatus, 
    fillMyChats 
} = chatSlice.actions