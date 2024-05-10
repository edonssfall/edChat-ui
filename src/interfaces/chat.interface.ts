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
    chat_uuid: string | null;
    selectedChat: IChat | null;
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

/**
 * @name IWebsocketContext
 * @description Interface for websocket context
 */
export interface IWebsocketContext {
    sendJsonMessage: SendJsonMessage;
    lastJsonMessage: IMessage | IConnection | unknown;
    getWebSocket: () => (WebSocketLike | null);
}
