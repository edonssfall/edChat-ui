import React from 'react';

/**
 * Interface for ModalState
 */
export interface IModalState {
    state: 'auth' | 'password' | 'username' | 'password-reset' | 'forgot' | null;
}

/**
 * Interface for ModalTypeContextType
 */
export interface IModalTypeContextType {
    modalState: IModalState;
    setModalState: React.Dispatch<React.SetStateAction<IModalState>>;
}

/**
 * Interface for ModalForgotPassword
 * @param modalType - The modal type
 */
export interface IModalResetPassword {
    token: string;
    uidb64: string;
}

/**
 * Interface for ModalForgotPasswordResponse
 * @param message - The message
 */
export interface IModalResetPasswordResponse {
    message: string;
    data: {
        link: string;
        email: string;
    }
}

/**
 * Interface for validation function
 */
export interface IValidationRule {
    condition: (val: string) => boolean;
    errorMsg: string;
}

export interface ISignupProps {
    setIndexTab: React.Dispatch<React.SetStateAction<number>>;
}
