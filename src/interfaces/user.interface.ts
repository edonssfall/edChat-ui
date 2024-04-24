import { IChat } from "./chat.interface.ts";

/**
 * @name IUser
 * @description Interface for user object
 */
export interface IUser {
    username: string;
    avatar: string;
    chats: IChat[];
    chat: IChat;
}
