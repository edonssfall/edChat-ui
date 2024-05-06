import ModalForgotPassword from '../components/auth/password/modalForgotPasswordComponent.tsx';
import ModalResetPassword from '../components/auth/password/modalResetPassword.tsx';
import ModalSetPassword from '../components/auth/password/modalSetPassword.tsx';
import ModalAuthComponent from '../components/auth/modalAuthComponent.tsx';
import ModalUsername from '../components/auth/modalUsernameComponent.tsx';
import {useTokens} from '../services/token.service.ts';
import {useAppSelector} from '../store/hooks.ts';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

/**
 * @name ModalView
 * @description View: HomeView page
 */
function ModalView(): React.JSX.Element {
    const {username} = useAppSelector(state => state.user),
        {accessToken, refreshToken} = useTokens(),
        {uidb64, token} = useParams(),
        [modalType, setModalType] = useState<'auth' | 'password' | 'username' | 'password-reset' | 'forgot' | null>(null);

    useEffect(() => {
        if (!accessToken || !refreshToken && modalType === null) {
            setModalType('auth');
        } else if (accessToken && refreshToken && !username) {
            setModalType('username');
        }
    }, [username, modalType]);

    useState(() => {
        if (accessToken && refreshToken && !username) {
            setModalType(null);
        } else if (uidb64 && token) {
            setModalType('password-reset');
        } else if (!username) {
            setModalType('auth');
        }
    })

    return (
        <>
            <ModalForgotPassword modalType={modalType} setModalType={setModalType}/>
            <ModalResetPassword token={token!} uidb64={uidb64!} modalType={modalType} setModalType={setModalType}/>
            <ModalSetPassword modalType={modalType} setModalType={setModalType}/>
            <ModalUsername modalType={modalType} setModalType={setModalType}/>
            <ModalAuthComponent modalType={modalType} setModalType={setModalType}/>
        </>
    );
}

export default ModalView;
