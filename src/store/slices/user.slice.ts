import {IUser} from "../../interfaces/user.interface.ts";
import {createSlice} from "@reduxjs/toolkit";

const initialState: IUser = {
    username: '',
    avatar: '',
    isLoggedIn: false,
}

/**
 * Slice for user data
 * @type
 * @name userSlice
 */
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setAvatar: (state, action) => {
            state.avatar = action.payload;
        },
        login: (state) => {
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.isLoggedIn = false;
        },
        clearUser: () => initialState,
    },
})

export const {setUsername, setAvatar, clearUser, login, logout} = userSlice.actions;

export default userSlice.reducer;
