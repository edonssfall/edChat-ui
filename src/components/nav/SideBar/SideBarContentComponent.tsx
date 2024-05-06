import {Box, Button, CloseButton, Flex, Spacer, useColorModeValue, Text} from '@chakra-ui/react';
import {ISidebarContentProps} from '../../../interfaces/sidebar.interface.ts';
import {faArrowRightToBracket} from '@fortawesome/free-solid-svg-icons';
import AddChatModalComponent from '../AddChatModalComponent.tsx';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {clearUser} from '../../../store/slices/user.slice.ts';
import {IChat} from '../../../interfaces/chat.interface.ts';
import ChatBoxComponent from '../ChatBoxComponent.tsx';
import {useAppSelector} from '../../../store/hooks.ts';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

/**
 * @name SidebarContent
 * @description The content of the sidebar.
 * @param onClose
 * @param rest
 */
function SidebarContent({onClose, ...rest}: ISidebarContentProps) {
    const user = useAppSelector((state) => state.user),
        dispatch = useDispatch();

    const chats: IChat[] = [
            {
                name: 'Chat 1',
                message: 'message1',
                path: '/chat1',
            },
            {
                name: 'Chat 2',
                message: 'message2',
                path: '/chat2',
            },
        ],
        [selectedChat, setSelectedChat] = useState(chats[0]);

    useEffect(() => {
        console.log(selectedChat);
    }, [selectedChat]);

    return (
        <>
            <AddChatModalComponent/>
            <Box
                bg={useColorModeValue('gray.100', 'gray.900')}
                borderRight='1px'
                borderRightColor={useColorModeValue('gray.200', 'gray.700')}
                w={{base: 'full', md: 60}}
                pos='fixed'
                h='full'
                {...rest}>
                <Flex direction={'column'} h={'full'}>
                    <Flex h='20' alignItems='center' mx='8' justifyContent='space-between' my={'2em'}>
                        <h1>edSockets</h1>
                        <CloseButton display={{base: 'flex', md: 'none'}} onClick={onClose}/>
                    </Flex>

                    {user.username ?
                        <>
                            <Button onClick={() => console.log('open chat')}>add Chat</Button>
                            {chats.map((chat, index) => (
                                <ChatBoxComponent
                                    key={index}
                                    chat={chat}
                                    setSelectedChat={setSelectedChat}
                                />
                            ))
                            }

                            <Spacer/>

                            <Flex bgColor={'gray.400'} color={'white'} mb={'2em'} mx={'4'} px={'4'} py={'2'}
                                  align={'center'} _hover={{bg: 'gray.600', color: 'white'}} borderRadius='lg'
                                  role='group' cursor='pointer' onClick={() => dispatch(clearUser())}>
                                <FontAwesomeIcon icon={faArrowRightToBracket}/>
                                <Text ml={'4'}>Logout</Text>
                            </Flex>
                        </>
                        :
                        <></>
                    }
                </Flex>
            </Box>
        </>
    );
}

export default SidebarContent;
