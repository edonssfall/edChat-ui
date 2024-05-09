import {environment} from "../services/environment.ts";
import {useAppSelector} from "../store/hooks.ts";
import useWebSocket from 'react-use-websocket';
import {useEffect} from "react";

function NotificationComponent() {
    const username = useAppSelector(state => state.user.username);

    const {sendJsonMessage, lastJsonMessage, getWebSocket} = useWebSocket(
        `${environment.BACKEND_WS_CHAT}/${username}`,
        {
            share: false,
            shouldReconnect: () => true,
        },
    )

    useEffect(() => {
    }, [sendJsonMessage, lastJsonMessage, getWebSocket]);

    return (
        <>
        </>
    );
}

export default NotificationComponent;
