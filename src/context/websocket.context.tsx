import {IWebsocketContext, IProviderProps} from '../interfaces/chat.interface.ts';
import React, {createContext, FC, useEffect, useState} from 'react';
import {environment} from '../services/environment.ts';
import {useProfile} from '../services/user.service.ts';
import {useTokens} from '../services/token.service.ts';
import useWebSocket from 'react-use-websocket';

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
  const {profile} = useProfile(),
    {refreshToken} = useTokens(),
    [socketUrl, setSocketUrl] = useState<string | null>(null);

  const { lastJsonMessage, sendJsonMessage, getWebSocket } = useWebSocket(socketUrl ?? '', {
    share: false,
    shouldReconnect: () => true,
  });

  /**
     * @name useEffect
     * @description This hook is used to set the socket url.
     */
  useEffect(() => {
    if (profile && refreshToken) {
      setSocketUrl(`${environment.BACKEND_WS_CHAT}/${profile.username ? profile.username : ''}`);
    }
  }, [profile, refreshToken]);

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
    console.warn('useWebSocketContext must be used within a WebSocketProvider');
    return {} as IWebsocketContext;
  }
  return context;
};

export {WebSocketProvider, WebSocketContext, useWebSocketContext};
