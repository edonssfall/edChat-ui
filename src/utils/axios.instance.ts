import {
    refreshToken,
    accessToken,
    setTokens,
    deleteTokens,
} from "./helpers/token.helpers.ts";
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { environment } from "../environments/environment";

const refresh_token_api = environment.api.refresh_token;
const backend_api_url = environment.BACKEND_URL_AUTH;
const logout = environment.api.logout;

const axiosInstance: AxiosInstance = axios.create({
    baseURL: backend_api_url,
    headers: {
        Authorization: accessToken,
    },
});

const refreshTokenHandler = async (config: InternalAxiosRequestConfig) => {
    if (!accessToken) {
        if (refreshToken) {
            const response = await axios.post(`${backend_api_url}/${refresh_token_api}`, {
                refresh: refreshToken,
            });

            if (response.status === 200) {
                const accessToken = response.data.access;
                setTokens(accessToken, refreshToken);
                config.headers.Authorization = `Bearer ${accessToken}`;
            } else {
                await axios.post(`${backend_api_url}/${logout}`, {
                    refresh: refreshToken,
                });

                if (response.status === 200) {
                    deleteTokens();
                }
            }
        }
    }
    return config;
};

axiosInstance.interceptors.request.use(refreshTokenHandler);

export default axiosInstance;
