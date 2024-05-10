import {createSlice} from "@reduxjs/toolkit";
import {IChatStore} from "../../interfaces/chat.interface.ts";

/**
 * @name initialState
 * @description Initial state for chat store
 */
const initialState: IChatStore= {
    chat_uuid: null,
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
        setChatUUID: (state, action) => {
            state.chat_uuid = action.payload;
        },
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
    setChatUUID,
    setChat,
    addChat,
    deleteChat
} = ChatSlice.actions;

export default ChatSlice.reducer;
