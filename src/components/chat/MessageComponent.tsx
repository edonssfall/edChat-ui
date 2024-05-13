import {Box, Heading, useColorModeValue, Text} from '@chakra-ui/react';
import {IMessageProps} from '../../interfaces/chat.interface.ts';
import {useProfile} from "../../services/user.service.ts";

/**
 * @name MessageComponent
 * @param message
 * @param index
 * @constructor
 * @description This component is used to display the message.
 */
function MessageComponent({ message, index }: IMessageProps) {
    const { profile } = useProfile(),
        messageBgColor = message.sender === profile.username ? 'blue.500' : 'green.500',
        messageColor = useColorModeValue('white', 'gray.800');

    return (
        <Box
            key={index}
            display="flex"
            flexDirection={message.sender === profile.username ? "row-reverse" : "row"}
            alignItems="center"
            mb={2}
        >
            <Box
                bg={messageBgColor}
                textColor={messageColor}
                borderRadius="md"
                px={4}
                py={2}
                maxWidth="70%"
            >
                <Heading size="sm" mb={1}>
                    {message.sender}
                </Heading>
                <Text>{message.content}</Text>
            </Box>
            <Text
                ml={2}
                fontSize="sm"
                color={useColorModeValue('gray.500', 'gray.400')}
            >
                {message.timestamp}
            </Text>
        </Box>
    );
}

export default MessageComponent;
