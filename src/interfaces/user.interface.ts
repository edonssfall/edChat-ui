/**
 * @name IUser
 * @description Interface for user object
 */
export interface IUser {
    username: string;
    avatar: string;
    isLoggedIn: boolean;
}

/**
 * @name IUserSlice
 * @description Interface for user slice
 */
export interface IUserSlice {
    name: string;
    initialState: IUser;
    reducers: {
        setUsername: (state: IUser, action: {payload: string}) => void;
        setAvatar: (state: IUser, action: {payload: string}) => void;
        login: (state: IUser) => void;
        logout: (state: IUser) => void;
        clearUser: () => IUser;
    };
}
