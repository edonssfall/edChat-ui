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

/**
 * @name ISearchUser
 * @description The props for the SearchUser component.
 */
export interface ISearchUser {
    id?: string;
    username: string;
}

/**
 * @name ISearchResponse
 * @description The props for the SearchResponse component.
 */
export interface ISearchResponse {
    users?: ISearchUser[];
}
