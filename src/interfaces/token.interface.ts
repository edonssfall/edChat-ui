/**
 * Interface for token
 * @interface ITokenStore
 */
export interface ITokenStore {
    accessToken: string | undefined;
    refreshToken: string | undefined;
    save: boolean;
}
