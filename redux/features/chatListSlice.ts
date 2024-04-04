import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from "@reduxjs/toolkit";
export interface ChatListReloadState {
    chatListReloadState: boolean;
}

const initialState: ChatListReloadState = {
    chatListReloadState: true,
};

const chatListReloadSlice = createSlice({
    name: 'chatList',
    initialState,
    reducers: {
        toggleChatListReload: (state) => {
            state.chatListReloadState = !state.chatListReloadState;
        },
    },
});

export const { toggleChatListReload } = chatListReloadSlice.actions;
export const chatListReloadReducer = chatListReloadSlice.reducer;