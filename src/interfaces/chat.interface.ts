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

export interface IChatProps {
    wsUrl: string;
}
