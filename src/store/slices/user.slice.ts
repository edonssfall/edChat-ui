import {
    deleteUserLocal,
    deleteUsernameLocal,
    getUserLocal, getUsernameLocal,
    setUserLocal,
    setUsernameLocal
} from '../../services/user.service.ts';
import {IUserChat} from '../../interfaces/user.interface.ts';
import {createSlice} from '@reduxjs/toolkit';

/**
 * @name initialState
 */
const initialState: IUserChat = {
    username: getUsernameLocal(),
    user: getUserLocal(),
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
            setUsernameLocal(action.payload);
        },
        setUser: (state, action) => {
            state.user = action.payload;
            setUserLocal(action.payload);
        },
        clearUser: (state) => {
            state.user = null;
            deleteUserLocal();
        },
        clearUserName: (state) => {
            state.username = '';
            deleteUsernameLocal();
        },
        clearUserStore: (state) => {
            state.user = null;
            state.username = '';
            deleteUserLocal();
            deleteUsernameLocal();
        },
    },
})

export const {
    setUsername,
    setUser,
    clearUser,
    clearUserName,
    clearUserStore,
} = userSlice.actions;

export default userSlice.reducer;
