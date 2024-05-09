import {useTokens} from "../../services/token.service.ts";
import {useProfile} from "../../services/user.service.ts";
import {Center, Heading} from '@chakra-ui/react';
import ChatComponent from './ChatComponent.tsx';
import React from 'react';

/**
 * @name MainChatComponent
 * @description component: MainChatComponent
 */
const MainChatComponent: React.FC = () => {
    const {profile} = useProfile(),
        {refreshToken} = useTokens();

    const wsUrl = 'ws://';
    const chat = false;

    return (
        <>
            <Center h={'100vh'}>
                {refreshToken && profile.username ? (
                    !chat ? (
                        <Heading size={{lg: '3xl', md: 'xl'}} color={'blue.500'}>
                            Welcome, {profile.username}!
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