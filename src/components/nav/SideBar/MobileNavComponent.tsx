import {IMobileProps} from '../../../interfaces/sidebar.interface.ts';
import {Flex, IconButton, useColorModeValue} from '@chakra-ui/react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';

/**
 * @name MobileNav
 * @description The mobile navigation.
 * @param onOpen
 * @param rest
 * @constructor
 */
function MobileNav({onOpen, ...rest}: IMobileProps) {
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
}

export default MobileNav;
