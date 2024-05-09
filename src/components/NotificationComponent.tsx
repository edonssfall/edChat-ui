import {useWebSocketContext} from "../services/websocket.context.tsx";
import {IConnection} from '../interfaces/chat.interface.ts';
import {setTokens} from '../store/slices/token.slice.ts';
import {useDispatch} from 'react-redux';
import {useEffect} from 'react';

function NotificationComponent() {
    const dispatch = useDispatch();

    const {lastJsonMessage} = useWebSocketContext();

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
