import {IModalState, IModalTypeContextType} from "../interfaces/modal.interface.ts";
import {IProviderProps} from "../interfaces/chat.interface.ts";
import React, {createContext, FC, useState} from 'react';

const ModalTypeContext = createContext<IModalTypeContextType | undefined>(undefined);

const ModalTypeProvider: FC<IProviderProps> = ({ children }) => {
    const [modalState, setModalState] = useState<IModalState>({ state: null });

    const contextValue: IModalTypeContextType = {
        modalState,
        setModalState,
    };

    return (
        <ModalTypeContext.Provider value={contextValue}>
            {children}
        </ModalTypeContext.Provider>
    );
};

const useModalTypeContext = () => {
    const context = React.useContext(ModalTypeContext);
    if (!context) {
        throw new Error('useModalTypeContext must be used within a ModalTypeProvider');
    }
    return context;
};

export { ModalTypeContext, ModalTypeProvider, useModalTypeContext}
