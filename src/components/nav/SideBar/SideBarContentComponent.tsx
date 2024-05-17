import {Box, CloseButton, Flex, Spacer, useColorModeValue, Text} from '@chakra-ui/react';
import {ISidebarContentProps} from '../../../interfaces/sidebar.interface.ts';
import {useWebSocketContext} from "../../../context/websocket.context.tsx";
import {faArrowRightToBracket} from '@fortawesome/free-solid-svg-icons';
import {IChatsResponse} from "../../../interfaces/chat.interface.ts";
import {clearUserStore} from '../../../store/slices/user.slice.ts';
import AddChatModalComponent from '../AddChatModalComponent.tsx';
import {clearTokens} from '../../../store/slices/token.slice.ts';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useProfile} from "../../../services/user.service.ts";
import {setChats} from "../../../store/slices/chat.slice.ts";
import ChatBoxComponent from '../ChatBoxComponent.tsx';
import {useAppSelector} from '../../../store/hooks.ts';
import SearchBarComponent from "./SearchBar.tsx";
import {useDispatch} from 'react-redux';
import {useEffect} from "react";

/**
 * @name SidebarContent
 * @description The content of the sidebar.
 * @param onClose
 * @param rest
 */
function SidebarContent({onClose, ...rest}: ISidebarContentProps) {
    const {profile} = useProfile(),
        {lastJsonMessage} = useWebSocketContext(),
        chat = useAppSelector((state) => state.chat),
        dispatch = useDispatch();

    /**
     * @name redirectHome
     * @description Redirects the user to the home page.
     */
    const redirectHome = () => {
        window.location.href = '/';
    };

    useEffect(() => {
        if (lastJsonMessage && (lastJsonMessage as IChatsResponse).chats) {
            const chats = (lastJsonMessage as IChatsResponse).chats;
            if (chats.length > 0) {
                dispatch(setChats(chats));
            }
        }
    }, [lastJsonMessage]);

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
                    <Flex h='20' alignItems='center' mx='8' my={'2em'}>
                        <Text onClick={redirectHome}>edSockets</Text>
                        <CloseButton display={{base: 'flex', md: 'none'}} onClick={onClose}/>
                    </Flex>

                    {profile.username ?
                        <>
                            <Flex>
                                <SearchBarComponent/>
                            </Flex>

                            {chat.chats.map((chat, index) => (
                                <ChatBoxComponent
                                    key={index}
                                    chat={chat}
                                />
                            ))
                            }
                            <Spacer/>
                            <Flex bgColor={'gray.400'} color={'white'} mb={'2em'} mx={'4'} px={'4'} py={'2'}
                                  align={'center'} _hover={{bg: 'gray.600', color: 'white'}} borderRadius='lg'
                                  role='group' cursor='pointer'>
                                <FontAwesomeIcon icon={faArrowRightToBracket}/>
                                <Text ml={'4'}
                                      onClick={() => {
                                          dispatch(clearUserStore());
                                          dispatch(clearTokens());
                                      }}
                                >Logout</Text>
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
