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
        setChatListReloadState: (state, action: PayloadAction<boolean>) => {
            state.chatListReloadState = action.payload;
        },
    },
});

export const { setChatListReloadState } = chatListReloadSlice.actions;
export const chatListReloadReducer = chatListReloadSlice.reducer;
