/**
 * Interface for Modal
 */
export interface IModal {
    modal: boolean;
    setModal: (modal: boolean) => void;
}

export interface IModalPassword extends IModal {
    setModalAuth: (modal: boolean) => void;
}

export interface IModalAuth extends IModal {
    setModalPassword: (modal: boolean) => void;
}

export interface IModalLogin {
    setModalAuth: (modal: boolean) => void;
    setModalPassword: (modal: boolean) => void;
}