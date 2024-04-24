import { Button, Flex, FormControl, Heading, Input, Spacer } from "@chakra-ui/react";
import React, {useEffect, useRef, useState} from "react";
import { useAppSelector } from "../store/hooks.ts";
import useWebSocket from "react-use-websocket";

function Chat() {
    const WS_URL = useAppSelector(state => state.user.chat.path),
        username = useAppSelector(state => state.user.username);

    const [sender, setSender] = useState<string>(''),
        [message, setMessage] = useState<string>(''),
        [messageHistory, setMessageHistory] = useState<[]>([]),
        [status, setStatus] = useState<string>('');

    const {sendJsonMessage, lastJsonMessage, getWebSocket} = useWebSocket(
        WS_URL + `?username=${username}`,
        {
            share: false,
            shouldReconnect: () => true,
        },
    )

    useEffect(() => {
        const webSocket = getWebSocket();
        if (webSocket) {
            webSocket.addEventListener('error', (event) => {
                console.error('WebSocket Error:', event, lastJsonMessage);
            });
        }
    }, [getWebSocket, WS_URL, lastJsonMessage]);

    useEffect(() => {
        if (lastJsonMessage !== null && lastJsonMessage !== undefined) {
            if (lastJsonMessage.sender !== username) {
                setSender(lastJsonMessage.sender);
            }
            if (lastJsonMessage.type === 'chat.message') {
                setMessageHistory((prev) => prev.concat(lastJsonMessage));
            } else if (lastJsonMessage.type === 'chat.status' && lastJsonMessage.sender === sender) {
                setStatus(lastJsonMessage.status);
            }
        }
    }, [lastJsonMessage]);

    function onWriteMessage(e: React.ChangeEvent<HTMLInputElement>) {
        let timer: NodeJS.Timeout | null = null;
        setMessage(e.target.value);
        sendJsonMessage({type: 'chat.status', status: 'typing...', sender: username})
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }

        timer = setTimeout(() => {
            sendJsonMessage({type: 'chat.status', status: 'online', sender: username});
        }, 2000);
    }

    function handleSubmit() {
        sendJsonMessage({type: 'chat.message', message, sender: username});
        setMessage('');
    }

    const chatContainerRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom of the chat container when message history changes
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messageHistory]);

    return (
        <Flex direction={'column'} h={'full'} w={'full'} mr={2} ml={2}>
            {!!sender || !!status ?
                <Heading fontSize="xl" mb={4}>{sender}: {status}</Heading>
                :
                <></>
            }

            <Flex direction="column" mb={4}  h="full" overflowY="auto">
                {messageHistory.map((message, index) => (
                    <Heading
                        key={index}
                        mb={2}
                        bg={message.sender === username ? 'blue' : 'green'}
                        textColor={'white'}
                    >
                        {message.sender}: {message.message}</Heading>
                ))}
            </Flex>

            <Spacer/>

            <Flex>
                <FormControl flex="1" mr={2} mb={2}>
                    <Input
                        value={message}
                        type="text"
                        placeholder="Enter your message"
                        onChange={onWriteMessage}
                    />
                </FormControl>

                <Button
                    colorScheme="blue"
                    onClick={handleSubmit}
                    disabled={!message.trim()}
                >
                    Send
                </Button>
            </Flex>
        </Flex>
    );
}

export default Chat;