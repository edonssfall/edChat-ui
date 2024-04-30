import {IChat} from "./chat.interface.ts";

export interface ISidebarProps {
    chats: IChat[];
    selectedChat: IChat;
}