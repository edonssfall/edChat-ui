import { environment } from "../../environments/environment";
import Cookie from "universal-cookie";

const refresh_token = environment.refresh_token;
const access_token = environment.access_token;
const user_data = environment.user;
const coockies = new Cookie();

export const refreshToken = coockies.get(refresh_token)
    ? coockies.get(refresh_token)
    : undefined;
export const accessToken = coockies.get(access_token)
    ? "Bearer " + coockies.get(access_token)
    : undefined;

export function setTokens(accessToken: string, refreshToken: string) {
    const accessTokenExpiration = new Date();
    accessTokenExpiration.setMinutes(accessTokenExpiration.getMinutes() + 15);
    const refreshTokenExpiration = new Date();
    refreshTokenExpiration.setDate(refreshTokenExpiration.getDate() + 2);
    coockies.set(access_token, accessToken, { expires: accessTokenExpiration });
    coockies.set(refresh_token, refreshToken, {
        expires: refreshTokenExpiration,
    });
}

export function deleteTokens() {
    localStorage.removeItem(user_data);
    coockies.remove(refresh_token);
    coockies.remove(access_token);
}
