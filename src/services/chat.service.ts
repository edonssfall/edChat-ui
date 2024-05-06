import {IChat} from '../interfaces/chat.interface.ts';
import {environment} from './environment.ts';

/**
 * @name createIChat
 * @param name
 * @description This function is used to create a chat.
 */
export function createIChat(name: string): IChat {
    return {
        name: name,
        path: environment.BACKEND_WS_CHAT + name,
    }
}
