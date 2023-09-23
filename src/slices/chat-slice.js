import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedChat: null,
    myChats: [],
    chatsUpdateFlag: false
};

export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        changeChatsUpdateFlagStatus: (state, action) => {
            state.chatsUpdateFlag = action.payload
        },
        fillMyChats: (state, action) => {
            state.myChats = action.payload;
        }
    },
});

export const { 
    changeChatsUpdateFlagStatus, 
    fillMyChats 
} = chatSlice.actions