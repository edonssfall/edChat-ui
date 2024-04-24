import { createIChat } from "../../utils/helpers/chat.helpers.ts";
import { IChat } from "../../interfaces/chat.interface.ts";
import { IUser } from "../../interfaces/user.interface.ts";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IUser= {
    username: '',
    avatar: '',
    chats: [],
    chat: {} as IChat,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setChat: (state, action) => {
            state.chat = createIChat(action.payload);
        },
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setAvatar: (state, action) => {
            state.avatar = action.payload;
        },
        setChats: (state, action) => {
            state.chats = [...state.chats, createIChat(action.payload)];
        },
        clearUser: () => initialState,
    },
})

export const {setChat, setUsername, setAvatar, setChats, clearUser } = authSlice.actions;

export default authSlice.reducer;
