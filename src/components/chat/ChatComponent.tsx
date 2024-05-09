import {Button, Flex, FormControl, Heading, Input, Spacer} from '@chakra-ui/react';
import {IChatProps, IMessage} from '../../interfaces/chat.interface.ts';
import MessageComponent from './MessageComponent.tsx';
import {useAppSelector} from '../../store/hooks.ts';
import React, {useEffect, useState} from 'react';
import useWebSocket from 'react-use-websocket';

function ChatComponent({wsUrl}: IChatProps) {
    const username = useAppSelector(state => state.user.username);

    const [sender, setSender] = useState<string>(''),
        [message, setMessage] = useState<string>(''),
        [messageHistory, setMessageHistory] = useState<IMessage[]>([]),
        [status, setStatus] = useState<string>('');

    const {sendJsonMessage, lastJsonMessage} = useWebSocket(
        wsUrl,
        {
            share: false,
            shouldReconnect: () => true,
        },
    )

    useEffect(() => {
        if (lastJsonMessage) {
            const message = lastJsonMessage as IMessage;
            if (message.sender !== username) {
                setSender(message.sender);
            }
            if (message.message) {
                setMessageHistory((prev) => [...prev, message]);
            } else if (message.status && message.sender === sender) {
                setStatus(message.status);
            }
        }
    }, [lastJsonMessage, sender, username]);

    function onWriteMessage(e: React.ChangeEvent<HTMLInputElement>) {
        setMessage(e.target.value);
        sendJsonMessage({type: 'chat.status', status: 'typing...', sender: username})

        setTimeout(() => {
            sendJsonMessage({type: 'chat.status', status: 'online', sender: username});
        }, 2000);
    }

    function handleSubmit() {
        sendJsonMessage({type: 'chat.message', message, sender: username});
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
