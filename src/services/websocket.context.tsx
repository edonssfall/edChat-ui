import {IWebsocketContext, IProviderProps} from "../interfaces/chat.interface";
import React, {createContext, FC} from "react";
import useWebSocket from "react-use-websocket";
import {environment} from "./environment.ts";
import {useProfile} from "./user.service.ts";

const WebSocketContext = createContext<IWebsocketContext | null>(null);

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

const useWebSocketContext = () => {
    const context = React.useContext(WebSocketContext);
    if (!context) {
        console.warn("useWebSocketContext must be used within a WebSocketProvider");
        return {} as IWebsocketContext;
    }
    return context;
};

export {WebSocketProvider, WebSocketContext, useWebSocketContext};
