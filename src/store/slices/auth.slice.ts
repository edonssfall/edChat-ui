import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    isRoot: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state) => {
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.isLoggedIn = false;
        },
        clearAuth: () => initialState,
    },
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
