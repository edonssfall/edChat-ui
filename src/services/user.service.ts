import {environment} from './environment.ts';

/**
 * @name setUserLocal
 * @param user
 * @description This function is used to set the user in the local storage.
 */
export function setUserLocal(user: string) {
    localStorage.setItem(environment.user, JSON.stringify(user))
}

/**
 * @name deleteUserLocal
 * @description This function is used to delete the user from the local storage.
 */
export function deleteUserLocal() {
    localStorage.removeItem(environment.user)
}

/**
 * @name getUserLocal
 * @description This function is used to get the user from the local storage.
 */
export function getUserLocal() {
    return JSON.parse(localStorage.getItem(environment.user) || '{}')
}

/**
 * @name setUsernameLocal
 * @param username
 * @description This function is used to get the username from the local storage.
 */
export function setUsernameLocal(username: string) {
    localStorage.setItem(environment.username, username)
}

/**
 * @name deleteUsernameLocal
 * @description This function is used to get the username from the local storage.
 */
export function deleteUsernameLocal() {
    localStorage.removeItem(environment.username)
}
