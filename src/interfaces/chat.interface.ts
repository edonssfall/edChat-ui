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
