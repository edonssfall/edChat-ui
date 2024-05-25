import { Button, Flex, FormControl, Heading, Input, Spacer } from '@chakra-ui/react';
import { IMessage } from '../../interfaces/chat.interface.ts';
import { environment } from '../../services/environment.ts';
import { useProfile } from '../../services/user.service.ts';
import MessageComponent from './MessageComponent.tsx';
import { useAppSelector } from '../../store/hooks.ts';
import React, { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';


/**
 * @name ChatComponent
 * @description component: ChatComponent
 * @constructor
 */
function ChatComponent() {
  const [sender, setSender] = useState<string>(''),
    [message, setMessage] = useState<string>(''),
    [messageHistory, setMessageHistory] = useState<IMessage[]>([]),
    [currentStatus, setCurrentStatus] = useState<string>(''),
    { profile } = useProfile(),
    chat = useAppSelector(state => state.chat),
    [status, setStatus] = useState<string>(''),
    { sendJsonMessage, lastJsonMessage } = useWebSocket(
      `${environment.BACKEND_WS_CHAT}/chat/${chat.selectedChat}`,
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
      if (message.messages && message.messages?.length > 0) {
        const messages = message.messages as IMessage[];
        setMessageHistory((prev) => [...prev, ...messages]);
      }
      if (message.status && message.sender === sender) {
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
    if (profile.username && currentStatus !== 'typing...') {
      const messageData: IMessage = {
        type: 'chat.status',
        sender: profile.username
      };
      if (currentStatus !== 'typing...') {
        messageData.status = 'typing...';
        sendJsonMessage(messageData);
        setCurrentStatus('typing...');
      }
      setTimeout(() => {
        messageData.status = 'online';
        sendJsonMessage(messageData);
        setCurrentStatus('online');
      }, 2000);
    }
  }

  /**
     * @name handleSubmit
     * @description This function is used to handle the submit event.
     */
  function handleSubmit() {
    if (profile.username) {
      const messageData: IMessage = {
        type: 'chat.content',
        content: message,
        sender: profile.username,
        timestamp: new Date().toISOString()
      };
      sendJsonMessage(messageData);
      setMessage('');
      setMessageHistory((prev) => [...prev, messageData]);
    }
  }

  return (
    <Flex direction={'column'} h={'full'} w={'full'} mr={2} ml={2}>
      {!!sender || !!status ?
        <Heading fontSize='xl' mb={4}>{sender}: {status}</Heading>
        :
        <></>
      }
      {messageHistory.map((message, index) => (
        <MessageComponent key={index} message={message} index={index}/>
      ))}
      <Spacer/>
      <Flex>
        <FormControl flex='1' mr={2} mb={2}>
          <Input
            value={message}
            type='text'
            placeholder='Enter your message'
            onChange={onWriteMessage}
            onKeyDown={(e) => e.key === 'Enter' ? handleSubmit() : null}
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
