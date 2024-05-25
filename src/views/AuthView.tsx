import ModalForgotPassword from '../components/auth/password/modalForgotPasswordComponent.tsx';
import ModalResetPassword from '../components/auth/password/modalResetPassword.tsx';
import ModalAuthComponent from '../components/auth/modalAuthComponent.tsx';
import ModalUsername from '../components/auth/modalUsernameComponent.tsx';
import {useModalTypeContext} from "../context/modal.context.tsx";
import {useTokens} from '../services/token.service.ts';
import {useProfile} from "../services/user.service.ts";
import {useParams} from 'react-router-dom';
import React, {useEffect} from 'react';

/**
 * @name AuthView
 * @description View: HomeView page
 */
function AuthView(): React.JSX.Element {
    const {profile} = useProfile(),
        {refreshToken} = useTokens(),
        {uidb64, token} = useParams(),
        {modalState, setModalState} = useModalTypeContext();

    /**
     * @name useEffect
     * @description This hook is used to set the modal state.
     */
    useEffect(() => {
        if (uidb64 && token) {
            setModalState({state: 'password-reset'});
        } else if (!refreshToken) {
            setModalState({state: 'auth'});
        } else if (!profile.username) {
            setModalState({state: 'username'});
        }
    }, [profile.username, modalState, refreshToken]);

    return (
        <>
            <ModalForgotPassword/>
            <ModalResetPassword token={token!} uidb64={uidb64!}/>
            <ModalUsername/>
            <ModalAuthComponent/>
        </>
    );
}

export default AuthView;
