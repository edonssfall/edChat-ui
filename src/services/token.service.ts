import {useAppDispatch, useAppSelector} from '../store/hooks.ts';
import {clearTokens} from '../store/slices/token.slice.ts';
import {clearUser} from '../store/slices/user.slice.ts';
import {createSelector} from '@reduxjs/toolkit';
import {environment} from './environment.ts';
import {RootState} from '../store/store.ts';
import Cookie from 'universal-cookie';


export const refresh_token = environment.refresh_token;
export const access_token = environment.access_token;
export const coockies = new Cookie();

/**
 * @name getAccessTokenLocal
 * @description This function is used to get the access token from the coockies.
 */
export function getAccessTokenLocal(): string | undefined {
    return coockies.get(access_token) ? 'Bearer ' + coockies.get(access_token) : undefined;
}

/**
 * @name getRefreshTokenLocal
 * @description This function is used to get the refresh token from the coockies.
 */
export function getRefreshTokenLocal(): string | undefined {
    return coockies.get(refresh_token) ? '' + coockies.get(refresh_token) : undefined;
}

/**
 * @name setCoockiesAccessToken
 * @param accessToken
 * @description This function is used to set the access token in the coockies.
 */
export function setCoockiesAccessToken(accessToken: string) {
    const accessTokenExpiration = new Date();
    accessTokenExpiration.setMinutes(accessTokenExpiration.getMinutes() + environment.accessTokenLive);
    coockies.set(access_token, accessToken, {expires: accessTokenExpiration});
}

/**
 * @name setCoockiesRefreshToken
 * @param refreshToken
 * @description This function is used to set the refresh token in the coockies.
 */
export function setCoockiesRefreshToken(refreshToken: string) {
    const refreshTokenExpiration = new Date();
    refreshTokenExpiration.setDate(refreshTokenExpiration.getDate() + environment.refreshTokenLive);
    coockies.set(refresh_token, refreshToken, {
        expires: refreshTokenExpiration,
    });
}

/**
 * @name setCoockiesTokens
 * @param accessToken
 * @param refreshToken
 * @description This function is used to set the tokens in the coockies.
 */
export function setCoockiesTokens(accessToken: string, refreshToken: string) {
    setCoockiesAccessToken(accessToken);
    setCoockiesRefreshToken(refreshToken);
}

/**
 * @name deleteTokens
 * @description This function is used to delete the tokens from the coockies.
 */
export function deleteTokens() {
    coockies.remove(refresh_token, {path: '/'});
    coockies.remove(access_token, {path: '/'});
}

// Token interface
const selectTokens = (state: RootState) => state.token;

/**
 * @name selectedTokensMemoized
 * @description This function is used to get the tokens from the store.
 */
const selectedTokensMemoized = createSelector(
    [selectTokens],
    (token) => ({
        refreshToken: token.refreshToken,
        accessToken: token.accessToken,
    })
);

/**
 * @name useTokens
 * @description This function is used to get the tokens from the store.
 */
export const useTokens = () => {
    const {refreshToken, accessToken} = useAppSelector(selectedTokensMemoized),
        dispatch = useAppDispatch();

    window.addEventListener('storage', (event) => {
        switch (event.key) {
            case refresh_token:
                if (event.newValue === refresh_token) {
                    dispatch(clearTokens());
                    dispatch(clearUser());
                }
                break;
        }
    });

    return {refreshToken, accessToken};
};
