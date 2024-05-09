import {useColorModeValue, useDisclosure, DrawerContent, Drawer, Box} from '@chakra-ui/react';
import SidebarContent from './SideBarContentComponent.tsx';
import MobileNav from './MobileNavComponent.tsx';
import {ReactNode} from 'react';

/**
 * @name SimpleSidebar
 * @description The main component of the Navbar.
 * @param children
 */
function SimpleSidebar({children}: { children: ReactNode }) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    return (
        <>
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
        </>
    );
}

export default SimpleSidebar;
