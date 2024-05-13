import {IMessageProps} from '../../interfaces/chat.interface.ts';
import {useProfile} from "../../services/user.service.ts";
import {Heading} from '@chakra-ui/react';

/**
 * @name MessageComponent
 * @param message
 * @param index
 * @constructor
 * @description This component is used to display the message.
 */
function MessageComponent({message, index}: IMessageProps) {
    const {profile} = useProfile();

    return (
        <>
            <Heading
                key={index}
                mb={2}
                bg={message.sender === profile.username ? 'blue' : 'green'}
                textColor={'white'}
            >
                {message.sender}: {message.content}
            </Heading>
        </>
    );
}

export default MessageComponent;
