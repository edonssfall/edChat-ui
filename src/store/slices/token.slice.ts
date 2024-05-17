import {
  setCoockiesAccessToken,
  getRefreshTokenLocal,
  getAccessTokenLocal,
  setCoockiesTokens,
  deleteTokens,
} from '../../services/token.service.ts';
import { ITokenStore } from '../../interfaces/token.interface.ts';
import { environment } from '../../services/environment.ts';
import { createSlice } from '@reduxjs/toolkit';


/**
 * @name initialState
 * @description This constant is used to define the initial state of the token.
 */
const initialState: ITokenStore = {
  accessToken: getAccessTokenLocal(),
  refreshToken: getRefreshTokenLocal(),
  save: localStorage.getItem(environment.saveToken) === 'true',
};

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
    clearTokens: (state) => {
      deleteTokens();
      state.accessToken = undefined;
      state.refreshToken = undefined;
    },
  },
});

export const {
  setAccessToken,
  setTokens,
  clearTokens,
  saveToken,
} = tokenSlice.actions;

export default tokenSlice.reducer;
