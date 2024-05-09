import {IConnection} from '../interfaces/chat.interface.ts';
import {setTokens} from '../store/slices/token.slice.ts';
import {environment} from '../services/environment.ts';
import {useProfile} from '../services/user.service.ts';
import useWebSocket from 'react-use-websocket';
import {useDispatch} from 'react-redux';
import {useEffect} from 'react';

function NotificationComponent() {
    const {profile} = useProfile(),
        dispatch = useDispatch();

    const {lastJsonMessage} = useWebSocket(
        `${environment.BACKEND_WS_CHAT}/user/${profile.username}`,
        {
            share: false,
            shouldReconnect: () => true,
        },
    )

    // useState(() => dispatch(setTokens({refreshToken: lastJsonMessage, accessToken: true}));
    useEffect(() => {
        if (lastJsonMessage) {
            const tokens = lastJsonMessage as IConnection;
            dispatch(setTokens({refreshToken: tokens.refresh, accessToken: tokens.access}));
        }
    }, [dispatch, lastJsonMessage]);

    return (
        <>
        </>
    );
}

export default NotificationComponent;
