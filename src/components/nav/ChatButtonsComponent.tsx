import {ISidebarProps} from "../../interfaces/sidebar.interface.ts";
import {Button, VStack} from "@chakra-ui/react";
import {useEffect} from "react";

function ChatButtonsComponent({chats, selectedChat}: ISidebarProps) {

    useEffect(() => {
    }, [selectedChat, chats]);

    return (
        <VStack spacing={2}>
            {chats.map((chat) => (
                <Button
                    key={chat.name}
                    variant={selectedChat.path === chat.path ? 'solid' : 'outline'}
                    colorScheme='teal'
                    onClick={() => console.log('open chat')}
                    w='100%'
                    textAlign='left'
                >
                    {chat.name}
                </Button>
            ))}
        </VStack>
    );
}

export default ChatButtonsComponent;
