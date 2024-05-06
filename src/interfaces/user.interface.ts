/**
 * @name IUser
 * @description Interface for user object
 */
export interface IUser {
    id: number;
    first_name: string;
    last_name: string;
    avatar: string;
    email: string;
    groups: string[];
}

/**
 * @name IUserChat
 * @description Interface for user object
 */
export interface IUserChat {
    username: string;
    user: IUser;
}

/**
 * @name ILogin
 * @description Interface for login object
 */
export interface ILogin {
    email: string;
    password: string;
}

export interface IRegister {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    repeat_password: string;
}

/**
 * @name ILoginResponse
 * @description Interface for login object
 */
export interface ILoginResponse {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}

/**
 * @name ISetPassword
 * @description Interface for login object
 */
export interface ISetPassword {
    password: string;
    new_password: string;
    repeat_new_password: string;
}


/**
 * @name IResetPassword
 * @description Interface for login object
 */
export interface IResetPassword {
    password: string;
    confirm_password: string;
    uidb64: string;
    token: string;
}

/**
 * @name IPasswordIconProps
 * @description Interface for password icon props
 */
export interface IPasswordIconProps {
    showPassword: boolean;
    setShowPassword: () => void;
}