import {clearTokens, setAccessToken} from '../store/slices/token.slice.ts';
import axios, {AxiosInstance, InternalAxiosRequestConfig} from 'axios';
import {useAppDispatch} from '../store/hooks.ts';
import {environment} from './environment.ts';
import {useTokens} from './token.service.ts';

const refresh_token_api = environment.api.refresh_token;
const backend_api_url = environment.BACKEND_URL_AUTH;
const logout = environment.api.logout;

/**
 * @name AxiosService
 * @description This function is used to create an axios instance.
 */
export const AxiosService = () => {
    const {accessToken, refreshToken} = useTokens(),
        dispatch = useAppDispatch();

    /**
     * @name axiosInstance
     * @description This function is used to create an axios instance.
     */
    const axiosInstance: AxiosInstance = axios.create({
        baseURL: backend_api_url,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    /**
     * @name refreshTokenHandler
     * @param config
     * @description This function is used to handle the refresh token.
     */
    const refreshTokenHandler = async (config: InternalAxiosRequestConfig) => {
        if (!accessToken) {
            if (refreshToken) {
                const response = await axios.post(`${backend_api_url}/${refresh_token_api}`, {
                    refresh: refreshToken,
                });
                if (response.status === 200) {
                    config.headers.Authorization = `Bearer ${response.data.access}`;
                    dispatch(setAccessToken(response.data.access));
                } else {
                    await axios.post(`${backend_api_url}/${logout}`, {
                        refresh: refreshToken,
                    });
                    if (response.status === 200) {dispatch(clearTokens());
                    }
                }
            }
        }
        return config;
    };

    axiosInstance.interceptors.request.use(refreshTokenHandler);

    return axiosInstance;
};
