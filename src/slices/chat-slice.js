import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedChat: null,
    myChats: [],
    chatsUpdateFlag: false,
    messages: [],
    messagesUpdateFlag: false
};

export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        changeChatsUpdateFlagStatus: (state, action) => {
            state.chatsUpdateFlag = action.payload
        },
        changeMessagesUpdateFlagStatus: (state) => {
            state.messagesUpdateFlag = !state.messagesUpdateFlag
        },
        fillMyChats: (state, action) => {
            state.myChats = action.payload;
            if (state.selectedChat) {
                state.selectedChat = state.myChats.find((chat) => chat._id === state.selectedChat._id)
            }
        },
        fillMessages: (state, action) => {
            state.messages = action.payload;
        },
        updateSelectedChat: (state, action) => {
            state.selectedChat = action.payload;
        },
        updateMessagesAfterMessageUpdate: (state, action) => {
            const { _id: messageId, content } = action.payload
            state.messages = state.messages.forEach((message) => {
                if (message._id === messageId) {
                    message.content = content
                }
            })
        }
    },
});

export const { 
    changeChatsUpdateFlagStatus, 
    changeMessagesUpdateFlagStatus,
    updateMessagesAfterMessageUpdate,
    fillMyChats,
    fillMessages,
    updateSelectedChat 
} = chatSlice.actions