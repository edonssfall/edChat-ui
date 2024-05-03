/**
 * Interface for ModalLogin
 * @param setModalType - Set the modal type
 */
export interface IModalLogin {
    setModalType: (modalType: 'auth' | 'password' | null) => void;
}

/**
 * Interface for Modal
 * @param modalType - The modal type
 */
export interface IModal extends IModalLogin {
    modalType: string | null;
}

/**
 * Interface for ModalPassword
 * @param token - The token
 * @param uidb64 - The uidb64
 */
export interface IModalPassword extends IModal {
    token?: string;
    uidb64?: string;
}

