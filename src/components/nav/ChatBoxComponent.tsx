import {ISidebarProps} from '../../interfaces/sidebar.interface.ts';
import {Box, Text, Avatar, Link} from '@chakra-ui/react';
import {setChat} from "../../store/slices/chat.slice.ts";
import {useDispatch} from "react-redux";

/**
 * @name ChatBoxComponent
 * @param chat
 * @constructor
 * @description This component is used to display the chat box.
 */
function ChatBoxComponent({chat}: ISidebarProps) {
    const dispatch = useDispatch(),
        user = chat.users[0];

    return (
        <>
            <Link onClick={() => dispatch(setChat(chat.uuid))}>
                <Box
                    display='flex'
                    alignItems='center'
                    bg='gray.100'
                    borderRadius='md'
                    p={3}
                    mb={4}
                >
                    <Avatar size='sm' src={user.avatar ? user.avatar : ''} mr={3}/>
                    <Box>
                        <Text fontWeight='bold' fontSize='sm'>
                            {user.username}
                        </Text>
                        <Text fontSize='xs' color='gray.500'>
                            {chat.last_message}
                        </Text>
                        <Text fontSize='xs' color='gray.500'>
                            {chat.timestamp}
                        </Text>
                    </Box>
                </Box>
            </Link>
        </>
    );
}

export default ChatBoxComponent;
