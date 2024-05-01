import {deleteTokens, setCoockiesAccessToken, setCoockiesTokens} from "../../services/token.service.ts";
import {environment} from "../../environments/environment.ts";
import {IToken} from "../../interfaces/token.interface.ts";
import {createSlice} from "@reduxjs/toolkit";
import Cookie from "universal-cookie";

const refresh_token = environment.refresh_token;
const access_token = environment.access_token;
const coockies = new Cookie();

const initialState: IToken = {
    accessToken: coockies.get(access_token)
        ? 'Bearer ' + coockies.get(access_token)
        : undefined,
    refreshToken: coockies.get(refresh_token)
        ? '' + coockies.get(refresh_token)
        : undefined,
    save: localStorage.getItem(environment.saveToken) === 'true',
}

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
        clearToken: (state) => {
            state.accessToken = undefined;
            state.refreshToken = undefined;
            deleteTokens();
        },
        saveToken: (state) => {
            state.save = !state.save;
            localStorage.setItem(environment.saveToken, state.save.toString());
        }
    },
})

export const {setAccessToken, deleteAccessToken, setTokens, clearToken, saveToken} = tokenSlice.actions;

export default tokenSlice.reducer;
