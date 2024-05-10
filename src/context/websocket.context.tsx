import {IWebsocketContext, IProviderProps} from "../interfaces/chat.interface.ts";
import React, {createContext, FC} from "react";
import useWebSocket from "react-use-websocket";
import {environment} from "../services/environment.ts";
import {useProfile} from "../services/user.service.ts";

/**
 * @name WebSocketContext
 * @description WebSocket context
 */
const WebSocketContext = createContext<IWebsocketContext | null>(null);

/**
 * @name WebSocketProvider
 * @param children
 * @constructor
 * @description WebSocket provider component
 */
const WebSocketProvider: FC<IProviderProps> = ({children}) => {
    const {profile} = useProfile();
    const {lastJsonMessage, sendJsonMessage, getWebSocket} = useWebSocket(
        `${environment.BACKEND_WS_CHAT}/${profile.username}`,
        {
            share: false,
            shouldReconnect: () => true,
        }
    );

    const contextValue: IWebsocketContext = {
        lastJsonMessage,
        sendJsonMessage,
        getWebSocket,
    };

    return (
        <WebSocketContext.Provider value={contextValue}>
            {children}
        </WebSocketContext.Provider>
    );
};

/**
 * @name useWebSocketContext
 * @description Hook to use websocket context
 */
const useWebSocketContext = () => {
    const context = React.useContext(WebSocketContext);
    if (!context) {
        console.warn("useWebSocketContext must be used within a WebSocketProvider");
        return {} as IWebsocketContext;
    }
    return context;
};

export {WebSocketProvider, WebSocketContext, useWebSocketContext};
