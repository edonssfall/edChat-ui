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
    type: string,
    sender: string,
    message: string,
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
