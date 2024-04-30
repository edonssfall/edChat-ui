import {IMessageProps} from "../../interfaces/chat.interface.ts";
import {Heading} from "@chakra-ui/react";
import {useAppSelector} from "../../store/hooks.ts";

function MessageComponent({message, index}: IMessageProps) {
    const username = useAppSelector(state => state.user.username);

    return (
        <>
            <Heading
                key={index}
                mb={2}
                bg={message.sender === username ? 'blue' : 'green'}
                textColor={'white'}
            >
                {message.sender}: {message.message}
            </Heading>
        </>
    );
}

export default MessageComponent;
