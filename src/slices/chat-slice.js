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
            if (state.selectedChat) {
                state.selectedChat = state.myChats.find((chat) => chat._id === state.selectedChat._id)
            }
        },
        updateSelectedChat: (state, action) => {
            state.selectedChat = action.payload;
        }
    },
});

export const { 
    changeChatsUpdateFlagStatus, 
    fillMyChats,
    updateSelectedChat 
} = chatSlice.actions