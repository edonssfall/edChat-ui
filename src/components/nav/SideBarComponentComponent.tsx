import {
    useColorModeValue,
    useDisclosure,
    DrawerContent,
    CloseButton,
    IconButton,
    Spacer,
    Button,
    Drawer,
    Flex,
    Text,
    Box,
} from "@chakra-ui/react";
import {IMobileProps, ISidebarContentProps} from "../../interfaces/sidebar.interface.ts";
import {faArrowRightToBracket, faBars} from "@fortawesome/free-solid-svg-icons";
import {clearUser, logout} from "../../store/slices/user.slice.ts";
import AddChatModalComponent from "./AddChatModalComponent.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IChat} from "../../interfaces/chat.interface.ts";
import ChatBoxComponent from "./ChatBoxComponent.tsx";
import {ReactNode, useEffect, useState} from "react";
import {useAppSelector} from "../../store/hooks.ts";
import {useDispatch} from "react-redux";

/**
 * @name SimpleSidebar
 * @description The main component of the Navbar.
 * @param children
 */
export default function SimpleSidebar({children}: { children: ReactNode }) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    return (
        <Box minH='100vh' bg={useColorModeValue('white', 'gray.900')}>
            <SidebarContent
                onClose={() => onClose}
                display={{base: 'none', md: 'block'}}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size='full'>
                <DrawerContent>
                    <SidebarContent onClose={onClose}/>
                </DrawerContent>
            </Drawer>
            {/* Mobile-Navigation */}
            <MobileNav display={{base: 'flex', md: 'none'}} onOpen={onOpen}/>
            <Box ml={{base: 0, md: 60}}>
                {children}
            </Box>
        </Box>
    );
}

/**
 * @name SidebarContent
 * @description The content of the sidebar.
 * @param onClose
 * @param rest
 */
const SidebarContent = ({onClose, ...rest}: ISidebarContentProps) => {
    const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
    const dispatch = useDispatch();

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

                    {isLoggedIn ?
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
                                  role='group' cursor='pointer' onClick={() => dispatch(
                                logout(),
                                clearUser(),
                            )}>
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
};

/**
 * @name MobileNav
 * @description The mobile navigation.
 * @param onOpen
 * @param rest
 * @constructor
 */
const MobileNav = ({onOpen, ...rest}: IMobileProps) => {
    return (
        <Flex
            ml={{base: 0, md: 60}}
            px={{base: 4, md: 24}}
            height='20'
            alignItems='center'
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth='1px'
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent='flex-start'
            {...rest}>
            <IconButton
                variant='outline'
                onClick={onOpen}
                aria-label='open menu'
                icon={<FontAwesomeIcon icon={faBars}/>}
            />
        </Flex>
    );
};
