import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: false,
    chat: false,
    sign: false,
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openUsername: (state) => {
            state.username = true;
        },
        closeUsername: (state) => {
            state.username = false;
        },
        openChat: (state) => {
            state.chat = true;
        },
        closeChat: (state) => {
            state.chat = false;
        },
        openSign: (state) => {
            state.sign = true;
        },
        closeSign: (state) => {
            state.sign = false;
        },
    },
})

export const {openUsername, closeUsername, openChat, closeChat, openSign, closeSign} = modalSlice.actions;

export default modalSlice.reducer;
