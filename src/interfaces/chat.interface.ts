import {SendJsonMessage, WebSocketLike} from "react-use-websocket/dist/lib/types";
import {ReactNode} from "react";

/**
 * @name IChat
 * @description Interface for chat route object
 */
export interface IChat {
    message?: string;
    icon?: string;
    name: string;
    path: string;
}

/**
 * @name IChatStore
 * @description Interface for chat store object
 */
export interface IChatStore {
    selectedChat: IChat | null;
    chats: IChat[];
}

/**
 * @name IMessage
 * @description Interface for message object
 */
export interface IMessage {
    sender: string,
    message?: string,
    file?: string,
    status?: string,
}

/**
 * @name IChatProps
 * @description Interface for chat props
 */
export interface IChatProps {
    wsUrl: string;
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
    access: string;
    refresh: string;
}

/**
 * @name IProviderProps
 * @description Interface for websocket provider props
 */
export interface IProviderProps {
    children: ReactNode;
}

export interface IWebsocketContext {
    sendJsonMessage: SendJsonMessage;
    lastJsonMessage: IMessage | IConnection | unknown;
    getWebSocket: () => (WebSocketLike | null);
}
