import { IProviderProps } from '../interfaces/chat.interface.ts';
import { WebSocketProvider } from './websocket.context.tsx';
import { ModalTypeProvider } from './modal.context.tsx';
import React from 'react';


/**
 * @name AppProvider
 * @param children
 * @constructor
 * @description App provider component
 */
export const AppProvider: React.FC<IProviderProps> = ({ children }) => {
  return (
    <WebSocketProvider>
      <ModalTypeProvider>
        {children}
      </ModalTypeProvider>
    </WebSocketProvider>
  );
};
