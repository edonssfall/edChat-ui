import ModalForgotPassword from '../components/auth/password/modalForgotPasswordComponent.tsx';
import ModalResetPassword from '../components/auth/password/modalResetPassword.tsx';
import ModalAuthComponent from '../components/auth/modalAuthComponent.tsx';
import ModalUsername from '../components/auth/modalUsernameComponent.tsx';
import {useTokens} from '../services/token.service.ts';
import {useAppSelector} from '../store/hooks.ts';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

/**
 * @name AuthView
 * @description View: HomeView page
 */
function AuthView(): React.JSX.Element {
    const {username} = useAppSelector(state => state.user),
        {refreshToken} = useTokens(),
        {uidb64, token} = useParams(),
        [modalType, setModalType] = useState<'auth' | 'password' | 'username' | 'password-reset' | 'forgot' | null>(null);

    useEffect(() => {
        if (!refreshToken && modalType === null) {
            setModalType('auth');
        } else if (refreshToken && !username) {
            setModalType('username');
        }
    }, [username, modalType, refreshToken]);

    useState(() => {
        if (uidb64 && token) {
            setModalType('password-reset');
        } else if (!refreshToken) {
            setModalType('auth');
        } else if (!username) {
            setModalType('username');
        }
    })

    return (
        <>
            <ModalForgotPassword modalType={modalType} setModalType={setModalType}/>
            <ModalResetPassword token={token!} uidb64={uidb64!} modalType={modalType} setModalType={setModalType}/>
            <ModalUsername modalType={modalType} setModalType={setModalType}/>
            <ModalAuthComponent modalType={modalType} setModalType={setModalType}/>
        </>
    );
}

export default AuthView;
