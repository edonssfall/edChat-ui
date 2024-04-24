import {
    useColorModeValue,
    useDisclosure,
    DrawerContent,
    CloseButton,
    IconButton,
    FlexProps,
    BoxProps,
    Spacer,
    Drawer,
    Flex,
    Text,
    Box, Button,
} from "@chakra-ui/react";
import { faArrowRightToBracket, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { clearUser } from "../../store/slices/user.slice.ts";
import {openChat} from "../../store/slices/modal.slice.ts";
import { logout } from "../../store/slices/auth.slice.ts";
import UsernameModal from "../auth/UsernameModal.tsx";
import { useAppSelector } from "../../store/hooks.ts";
import { ReactNode, useEffect } from "react";
import ChatButtons from "./ChatButtons.tsx";
import { useDispatch } from "react-redux";
import AddChatModal from "./AddChatModal.tsx";

/**
 * @name SimpleSidebar
 * @description The main component of the Navbar.
 * @param children
 */
export default function SimpleSidebar({children}: { children: ReactNode }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box minH="100vh" bg={useColorModeValue('white', 'gray.900')}>
            <SidebarContent
                onClose={() => onClose}
                display={{base: 'none', md: 'block'}}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
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
 * @name ISidebarProps
 * @description The props for the SidebarContent component.
 */
interface ISidebarProps extends BoxProps {
    onClose: () => void;
}

/**
 * @name SidebarContent
 * @description The content of the sidebar.
 * @param onClose
 * @param rest
 */
const SidebarContent = ({onClose, ...rest}: ISidebarProps) => {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const dispatch = useDispatch();

    useEffect(() => {
    }, [isLoggedIn]);

    return (
        <>
            <UsernameModal/>
            <AddChatModal/>
            <Box
                bg={useColorModeValue('gray.100', 'gray.900')}
                borderRight="1px"
                borderRightColor={useColorModeValue('gray.200', 'gray.700')}
                w={{base: 'full', md: 60}}
                pos="fixed"
                h="full"
                {...rest}>
                <Flex direction={'column'} h={'full'}>
                    <Flex h="20" alignItems="center" mx="8" justifyContent="space-between" my={'2em'}>
                        <h1>edSockets</h1>
                        <CloseButton display={{base: 'flex', md: 'none'}} onClick={onClose}/>
                    </Flex>

                    {isLoggedIn ?
                        <>
                            <Button onClick={() => dispatch(openChat())}>add Chat</Button>

                            <ChatButtons/>

                            <Spacer/>

                            <Flex bgColor={'gray.400'} color={'white'} mb={'2em'} mx={'4'} px={'4'} py={'2'}
                                  align={'center'} _hover={{bg: 'gray.600', color: 'white'}} borderRadius="lg"
                                  role="group" cursor="pointer" onClick={() => dispatch(
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
 * @name IMobileProps
 * @description The props for the MobileNav component.
 */
interface IMobileProps extends FlexProps {
    onOpen: () => void;
}

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
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent="flex-start"
            {...rest}>
            <IconButton
                variant="outline"
                onClick={onOpen}
                aria-label="open menu"
                icon={<FontAwesomeIcon icon={faBars}/>}
            />
        </Flex>
    );
};
