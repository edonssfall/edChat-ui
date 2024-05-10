import {Button, Flex, FormControl, Heading, Input, Spacer} from '@chakra-ui/react';
import {IChatProps, IMessage} from '../../interfaces/chat.interface.ts';
import MessageComponent from './MessageComponent.tsx';
import React, {useEffect, useState} from 'react';
import useWebSocket from 'react-use-websocket';
import {useProfile} from "../../services/user.service.ts";

/**
 * @name ChatComponent
 * @description component: ChatComponent
 * @constructor
 */
function ChatComponent({wsUrl}: IChatProps) {
    const [sender, setSender] = useState<string>(''),
        [message, setMessage] = useState<string>(''),
        [messageHistory, setMessageHistory] = useState<IMessage[]>([]),
        {profile} = useProfile(),
        [status, setStatus] = useState<string>(''),
        {sendJsonMessage, lastJsonMessage} = useWebSocket(
            wsUrl,
            {
                share: false,
                shouldReconnect: () => true,
            },
        );

    /**
     * @name useEffect
     * @description This function is used to set the initial states.
     */
    useEffect(() => {
        if (lastJsonMessage) {
            const message = lastJsonMessage as IMessage;
            if (message.sender !== profile.username) {
                setSender(message.sender);
            }
            if (message.message) {
                setMessageHistory((prev) => [...prev, message]);
            } else if (message.status && message.sender === sender) {
                setStatus(message.status);
            }
        }
    }, [lastJsonMessage, sender, profile.username]);

    /**
     * @name onWriteMessage
     * @param e
     * @description This function is used to handle the key down event.
     */
    function onWriteMessage(e: React.ChangeEvent<HTMLInputElement>) {
        setMessage(e.target.value);
        sendJsonMessage({type: 'chat.status', status: 'typing...', sender: profile.username})

        setTimeout(() => {
            sendJsonMessage({type: 'chat.status', status: 'online', sender: profile.username});
        }, 2000);
    }

    /**
     * @name handleSubmit
     * @description This function is used to handle the submit event.
     */
    function handleSubmit() {
        sendJsonMessage({type: 'chat.message', message, sender: profile.username});
        setMessage('');
    }

    return (
        <Flex direction={'column'} h={'full'} w={'full'} mr={2} ml={2}>
            {!!sender || !!status ?
                <Heading fontSize='xl' mb={4}>{sender}: {status}</Heading>
                :
                <></>
            }
            <Flex direction='column' mb={4} h='full' overflowY='auto'>
                {messageHistory.map((message, index) => (
                    <MessageComponent message={message} index={index}/>
                ))}
            </Flex>
            <Spacer/>
            <Flex>
                <FormControl flex='1' mr={2} mb={2}>
                    <Input
                        value={message}
                        type='text'
                        placeholder='Enter your message'
                        onChange={onWriteMessage}
                    />
                </FormControl>
                <Button
                    colorScheme='blue'
                    onClick={handleSubmit}
                    disabled={!message.trim()}
                >
                    Send
                </Button>
            </Flex>
        </Flex>
    );
}

export default ChatComponent;
