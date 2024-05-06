import {getUserLocal, setUsernameLocal} from '../../services/user.service.ts';
import {IUserChat} from '../../interfaces/user.interface.ts';
import {createSlice} from '@reduxjs/toolkit';

/**
 * @name initialState
 */
const initialState: IUserChat = {
    username: '',
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
            setUsernameLocal(action.payload.username);
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: () => initialState,
    },
})

export const {setUsername, setUser,  clearUser} = userSlice.actions;

export default userSlice.reducer;
