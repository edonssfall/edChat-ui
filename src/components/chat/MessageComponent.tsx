import {IMessageProps} from '../../interfaces/chat.interface.ts';
import {useProfile} from "../../services/user.service.ts";
import {Heading} from '@chakra-ui/react';

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
                {message.sender}: {message.message}
            </Heading>
        </>
    );
}

export default MessageComponent;
