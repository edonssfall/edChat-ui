import { Center, Heading } from "@chakra-ui/react";
import { useAppSelector } from "../store/hooks.ts";
import React, {useEffect} from "react";
import Chat from "./Chat.tsx";

/**
 * @name HomeView
 * @description View: HomeView page
 */
const HomeView: React.FC = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn),
        chat = useAppSelector(state => state.user.chat),
        username = useAppSelector(state => state.user.username);

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
                        <Chat/>
                    )) : (
                    <></>
                )}
            </Center>
        </>
    );
};

export default HomeView;
