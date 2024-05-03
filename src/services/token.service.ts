import {deleteAccessToken, clearToken} from "../store/slices/token.slice.ts";
import {useAppDispatch, useAppSelector} from "../store/hooks.ts";
import {clearUser} from "../store/slices/user.slice.ts";
import {createSelector} from "@reduxjs/toolkit";
import {environment} from "./environment.ts";
import {RootState} from "../store/store.ts";
import Cookie from "universal-cookie";

const refresh_token = environment.refresh_token;
const access_token = environment.access_token;
const coockies = new Cookie();

const selectTokens = (state: RootState) => state.token;

const selectedTokensMemoized = createSelector(
    [selectTokens],
    (token) => ({
        refreshToken: token.refreshToken,
        accessToken: token.accessToken,
    })
);

export const useTokens = () => {
    const {refreshToken, accessToken} = useAppSelector(selectedTokensMemoized);

    const dispatch = useAppDispatch();

    window.addEventListener('storage', (event) => {
        switch (event.key) {
            case refresh_token:
                if (event.newValue === null) {
                    dispatch(clearToken());
                    dispatch(clearUser());
                }
                break;
            case access_token:
                if (event.newValue === null) {
                    dispatch(deleteAccessToken());
                }
                break;
        }
    });

    return {refreshToken, accessToken};
};

export function setCoockiesAccessToken(accessToken: string) {
    const accessTokenExpiration = new Date();
    accessTokenExpiration.setMinutes(accessTokenExpiration.getMinutes() + environment.accessTokenLive);
    coockies.set(access_token, accessToken, {expires: accessTokenExpiration});
}

export function setCoockiesRefreshToken(refreshToken: string) {
    const refreshTokenExpiration = new Date();
    refreshTokenExpiration.setDate(refreshTokenExpiration.getDate() + environment.accessTokenLive);
    coockies.set(refresh_token, refreshToken, {
        expires: refreshTokenExpiration,
    });
}

export function setCoockiesTokens(accessToken: string, refreshToken: string) {
    setCoockiesAccessToken(accessToken);
    setCoockiesRefreshToken(refreshToken);
}

export function deleteTokens() {
    coockies.remove(refresh_token);
    coockies.remove(access_token);
}
