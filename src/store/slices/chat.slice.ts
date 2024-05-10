import {createSlice} from "@reduxjs/toolkit";
import {IChatStore} from "../../interfaces/chat.interface.ts";

/**
 * @name initialState
 * @description Initial state for chat store
 */
const initialState: IChatStore= {
    selectedChat: null,
    chats: [],
};

/**
 * @name ChatSlice
 * @description Chat slice
 */
const ChatSlice = createSlice({
    name: 'chat',
    initialState: initialState,
    reducers: {
        setChat: (state, action) => {
            state.selectedChat = action.payload;
        },
        addChat: (state, action) => {
            state.chats.push(action.payload);
        },
        deleteChat: (state, action) => {
            state.chats = state.chats.filter((chat) => chat !== action.payload);
        }
    },
});

export const {
    setChat,
    addChat,
    deleteChat
} = ChatSlice.actions;

export default ChatSlice.reducer;
