import {IUserChat} from "../../interfaces/user.interface.ts";
import {environment} from "../../services/environment.ts";
import {createSlice} from "@reduxjs/toolkit";

/**
 * @name initialState
 */
const initialState: IUserChat = {
    username: '',
    user: JSON.parse(localStorage.getItem(environment.user) || '{}'),
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
        clearUser: () => initialState,
    },
})

export const {setUsername, clearUser} = userSlice.actions;

export default userSlice.reducer;
