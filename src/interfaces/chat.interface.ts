import {SendJsonMessage, WebSocketLike} from 'react-use-websocket/dist/lib/types';
import {IUserChatResponse} from './user.interface.ts';
import {ReactNode} from 'react';

/**
 * @name IChat
 * @description Interface for chat route object
 */
export interface IChat {
    uuid: string;
    last_message?: string;
    description?: string;
    timestamp?: string;
    users: IUserChatResponse[];
}

/**
 * @name IChatStore
 * @description Interface for chat store object
 */
export interface IChatStore {
    selectedChat: string | null;
    chats: IChat[];
}

/**
 * @name IMessage
 * @description Interface for message object
 */
export interface IMessage {
    type: string,
    sender: string,
    content?: string,
    timestamp?: string,
    file?: string,
    status?: string,
    messages?: IMessage[],
}

/**
 * @name IMessageProps
 * @description Interface for message props
 */
export interface IMessageProps {
    message: IMessage;
    index: number;
}

/**
 * @name IConnection
 * @description Interface for connection object
 */
export interface IConnection {
    access?: string;
    refresh?: string;
    error?: string;
    username?: string;
}

/**
 * @name IProviderProps
 * @description Interface for websocket provider props
 */
export interface IProviderProps {
    children: ReactNode;
}

/**
 * @name IWebsocketContext
 * @description Interface for websocket context
 */
export interface IWebsocketContext {
    sendJsonMessage: SendJsonMessage;
    lastJsonMessage: IMessage | IConnection | unknown;
    getWebSocket: () => (WebSocketLike | null);
}

export interface IChatsResponse {
    chats: IChat[];
}