import ModalForgotPassword from '../components/auth/password/modalForgotPasswordComponent.tsx';
import ModalResetPassword from '../components/auth/password/modalResetPassword.tsx';
import ModalAuthComponent from '../components/auth/modalAuthComponent.tsx';
import ModalUsername from '../components/auth/modalUsernameComponent.tsx';
import { useWebSocketContext } from '../context/websocket.context.tsx';
import { useModalTypeContext } from '../context/modal.context.tsx';
import { IConnection } from '../interfaces/chat.interface.ts';
import { setUsername } from '../store/slices/user.slice.ts';
import { useTokens } from '../services/token.service.ts';
import { useProfile } from '../services/user.service.ts';
import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';


/**
 * @name AuthView
 * @description View: HomeView page
 */
function AuthView(): React.JSX.Element {
  const { profile } = useProfile(),
    { refreshToken } = useTokens(),
    { uidb64, token } = useParams(),
    { modalState, setModalState } = useModalTypeContext(),
    { lastJsonMessage } = useWebSocketContext(),
    dispatch = useDispatch();

  /**
     * @name useEffect
     * @description This hook is used to set the modal state.
     */
  useEffect(() => {
    if (!refreshToken && modalState.state === null) {
      setModalState({ state: 'auth' });
    } else if (uidb64 && token) {
      setModalState({ state: 'password-reset' });
    } else if (refreshToken && !profile.username) {
      if (lastJsonMessage) {
        const jsonResponse = lastJsonMessage as IConnection;
        if (jsonResponse.error) {
          setModalState({ state: 'username' });
        } else if (jsonResponse.username) {
          dispatch(setUsername(jsonResponse.username));
          setModalState({ state: null });
        }
      } else if (!profile.username) {
        setModalState({ state: 'username' });
      }
    }
  }, [profile.username, modalState, refreshToken, lastJsonMessage, uidb64, token]);

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
