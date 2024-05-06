import ChatComponent from './chat/ChatComponent.tsx';
import {Center, Heading} from '@chakra-ui/react';
import {useAppSelector} from '../store/hooks.ts';
import React, {useEffect} from 'react';
import {useTokens} from "../services/token.service.ts";

/**
 * @name MainChatComponent
 * @description component: MainChatComponent
 */
const MainChatComponent: React.FC = () => {
    const user = useAppSelector(state => state.user),
        {refreshToken} = useTokens();

    const wsUrl = 'ws://';
    const chat = false;

    useEffect(() => {
    }, [refreshToken]);

    return (
        <>
            <Center h={'100vh'}>
                {refreshToken ? (
                    !chat ? (
                        <Heading size={{lg: '3xl', md: 'xl'}} color={'blue.500'}>
                            Welcome, {user.username}!
                        </Heading>
                    ) : (
                        <ChatComponent wsUrl={wsUrl}/>
                    )) : (
                    <></>
                )}
            </Center>
        </>
    );
};

export default MainChatComponent;
