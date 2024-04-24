import { Button, VStack } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { setChat } from "../../store/slices/user.slice.ts";
import {useEffect} from "react";

function ChatButtons() {
    const chats = useAppSelector((state) => state.user.chats),
        selectedChat = useAppSelector((state) => state.user.chat),
        dispatch = useAppDispatch();

    useEffect(() => {
    }, [selectedChat, chats]);

    return (
        <VStack spacing={2}>
            {chats.map((chat) => (
                <Button
                    key={chat.name}
                    variant={selectedChat.path === chat.path ? "solid" : "outline"}
                    colorScheme="teal"
                    onClick={() => dispatch(setChat(chat.name))}
                    w="100%"
                    textAlign="left"
                >
                    {chat.name}
                </Button>
            ))}
        </VStack>
    );
}

export default ChatButtons;
