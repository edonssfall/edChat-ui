import {useWebSocketContext} from '../context/websocket.context.tsx';
import {IConnection} from '../interfaces/chat.interface.ts';
import {setTokens} from '../store/slices/token.slice.ts';
import {useDispatch} from 'react-redux';
import {useEffect} from 'react';

/**
 * @name NotificationComponent
 * @description component: NotificationComponent
 */
function NotificationComponent() {
  const dispatch = useDispatch(),
    {lastJsonMessage} = useWebSocketContext();

  /**
     * @name useEffect
     * @description This function is used to set the initial states.
     */
  useEffect(() => {
    if (lastJsonMessage && (lastJsonMessage as IConnection).access !== undefined && (lastJsonMessage as IConnection).refresh !== undefined) {
      const tokens = lastJsonMessage as IConnection;
      dispatch(setTokens({refreshToken: tokens.refresh, accessToken: tokens.access}));
    }
  }, [lastJsonMessage]);

  return (
    <>
    </>
  );
}

export default NotificationComponent;
