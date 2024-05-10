import {clearUser, clearUserName} from '../store/slices/user.slice.ts';
import {IUser, IUserChat} from '../interfaces/user.interface.ts';
import {useAppDispatch} from '../store/hooks.ts';
import {createSelector} from '@reduxjs/toolkit';
import {environment} from './environment.ts';
import {RootState} from '../store/store.ts';
import {useSelector} from 'react-redux';

const user_data = environment.user;
const username_data = environment.username;

/**
 * @name setUserLocal
 * @param user
 * @description This function is used to set the user in the local storage.
 */
export function setUserLocal(user: string) {
    localStorage.setItem(user_data, JSON.stringify(user))
}

/**
 * @name deleteUserLocal
 * @description This function is used to delete the user from the local storage.
 */
export function deleteUserLocal() {
    localStorage.removeItem(user_data)
}

/**
 * @name getUserLocal
 * @description This function is used to get the user from the local storage.
 */
export function getUserLocal(): IUser | null {
    const user = localStorage.getItem(user_data)
    if (user) {
        return JSON.parse(user)
    }
    return null
}

/**
 * @name setUsernameLocal
 * @param username
 * @description This function is used to get the username from the local storage.
 */
export function setUsernameLocal(username: string) {
    localStorage.setItem(username_data, username)
}

export function getUsernameLocal(): string | null {
    return localStorage.getItem(username_data)
}

/**
 * @name deleteUsernameLocal
 * @description This function is used to get the username from the local storage.
 */
export function deleteUsernameLocal() {
    localStorage.removeItem(username_data)
}

// User interface
const selectProfile = (state: RootState) => state.user;

/**
 * @name selectProfileMemoized
 * @description This function is used to get the user from the store.
 */
const selectProfileMemoized = createSelector(
    [selectProfile],
    (profile: IUserChat) => {
        return {
            username: profile?.username,
            user: profile?.user,
        };
    }
);

/**
 * @name useProfile
 * @description This function is used to get the user from the store.
 */
export const useProfile = () => {
    const profile = useSelector(selectProfileMemoized),
        dispatch = useAppDispatch();

    /**
     * @name storageEventListener
     * @description This function is used to listen to the storage event.
     */
    window.addEventListener('storage', (event) => {
        console.log(event.key, event.newValue)
        switch (event.key) {
            case user_data:
                if (event.newValue === null) {
                    dispatch(clearUser());
                }
                break;
            case username_data:
                if (event.newValue === null) {
                    dispatch(clearUserName());
                }
                break;
        }
    });
    return { profile };
};
