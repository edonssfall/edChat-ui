import ChatComponent from './chat/ChatComponent.tsx';
import {Center, Heading} from '@chakra-ui/react';
import {useAppSelector} from '../store/hooks.ts';
import React, {useEffect} from 'react';

/**
 * @name MainChatComponent
 * @description component: MainChatComponent
 */
const MainChatComponent: React.FC = () => {
    const username = useAppSelector(state => state.user.username);

    const wsUrl = 'ws://';
    const chat = false;

    useEffect(() => {
    }, [username]);

    return (
        <>
            <Center h={'100vh'}>
                {username ? (
                    !chat ? (
                        <Heading size={{lg: '3xl', md: 'xl'}} color={'blue.500'}>
                            {username ? `Welcome, ${username}!` : ''}
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
