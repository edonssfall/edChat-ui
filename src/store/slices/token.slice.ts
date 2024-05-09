import {
    setCoockiesAccessToken,
    getRefreshTokenLocal,
    getAccessTokenLocal,
    setCoockiesTokens,
    deleteTokens,
    access_token, 
    coockies,
} from '../../services/token.service.ts';
import {IToken} from '../../interfaces/token.interface.ts';
import {environment} from '../../services/environment.ts';
import {createSlice} from '@reduxjs/toolkit';

/**
 * @name initialState
 * @description This constant is used to define the initial state of the token.
 */
const initialState: IToken = {
    accessToken: getAccessTokenLocal(),
    refreshToken: getRefreshTokenLocal(),
    save: localStorage.getItem(environment.saveToken) === 'true',
}

/**
 * @name tokenSlice
 * @description This slice is used to manage the token.
 */
const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload.accessToken;
            if (state.save && action.payload.accessToken) {
                setCoockiesAccessToken(action.payload.accessToken);
            }
        },
        deleteAccessToken: (state) => {
            state.accessToken = undefined;
            coockies.remove(access_token);
        },
        setTokens: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            if (state.save && action.payload.accessToken && action.payload.refreshToken) {
                setCoockiesTokens(action.payload.accessToken, action.payload.refreshToken);
            }
        },
        saveToken: (state) => {
            state.save = !state.save;
            localStorage.setItem(environment.saveToken, state.save.toString());
        },
        clearToken: (state) => {
            deleteTokens();
            state.accessToken = undefined;
            state.refreshToken = undefined;
        },
    },
});

export const {
    setAccessToken,
    deleteAccessToken,
    setTokens,
    clearToken,
    saveToken,
} = tokenSlice.actions;

export default tokenSlice.reducer;
