/**
 * Interface for token
 * @interface IToken
 */
export interface IToken {
    accessToken: string | undefined;
    refreshToken: string | undefined;
    save: boolean;
}
