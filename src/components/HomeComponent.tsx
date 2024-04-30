import {Center, Heading} from "@chakra-ui/react";
import {useAppSelector} from "../store/hooks.ts";
import ChatComponent from "./ChatComponent.tsx";
import React, {useEffect} from "react";

/**
 * @name MainChatComponent
 * @description component: MainChatComponent
 */
const MainChatComponent: React.FC = () => {
    const isLoggedIn = useAppSelector(state => state.user.isLoggedIn),
        username = useAppSelector(state => state.user.username);

    const wsUrl = 'ws://';
    const chat = false;

    useEffect(() => {
    }, [isLoggedIn]);

    return (
        <>
            <Center h={'100vh'}>
                {isLoggedIn ? (
                    !chat ? (
                        <Heading size={{lg: '3xl', md: 'xl'}} color={'blue.500'}>
                            {isLoggedIn ? `Welcome, ${username}!` : ''}
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
