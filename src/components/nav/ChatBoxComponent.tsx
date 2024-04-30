import {ISidebarProps} from "../../interfaces/sidebar.interface.ts";
import {Box, Text, Avatar, Link} from '@chakra-ui/react';
import {useEffect} from "react";

function ChatBoxComponent({chat, setSelectedChat}: ISidebarProps) {

    useEffect(() => {
    }, [chat]);

    return (
        <>
            <Link onClick={() => setSelectedChat(chat)}>
                <Box
                    display="flex"
                    alignItems="center"
                    bg="gray.100"
                    borderRadius="md"
                    p={3}
                    mb={4}
                >
                    <Avatar size="sm" src={'as'} mr={3}/>
                    <Box>
                        <Text fontWeight="bold" fontSize="sm">
                            {chat.name}
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                            {chat.message}
                        </Text>
                    </Box>
                </Box>
            </Link>
        </>
    );
}

export default ChatBoxComponent;
