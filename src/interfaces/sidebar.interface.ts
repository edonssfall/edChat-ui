import {BoxProps, FlexProps} from '@chakra-ui/react';
import {IChat} from './chat.interface.ts';

/**
 * @name ISidebarProps
 * @description The props for the Sidebar component.
 */
export interface ISidebarProps {
    chat: IChat;
}

/**
 * @name ISidebarProps
 * @description The props for the SidebarContent component.
 */
export interface ISidebarContentProps extends BoxProps {
    onClose: () => void;
}

/**
 * @name IMobileProps
 * @description The props for the MobileNav component.
 */
export interface IMobileProps extends FlexProps {
    onOpen: () => void;
}
