import {
    ModalCloseButton,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalHeader,
    FormControl,
    ModalBody,
    FormLabel,
    Button,
    Input,
    Modal
} from "@chakra-ui/react";
import { setChat, setChats, setUsername } from "../../store/slices/user.slice.ts";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { closeUsername } from "../../store/slices/modal.slice.ts";
import { login } from "../../store/slices/auth.slice.ts";
import { useState } from "react";

function UsernameModal() {
    const [chat, setChatState] = useState<string>('');

    const isOpen = useAppSelector(state => state.modal.username),
        username = useAppSelector(state => state.user.username),
        dispatch = useAppDispatch();

    function onCloseModal() {
        dispatch(setChat(chat));
        dispatch(setChats(chat));
        dispatch(login());
        dispatch(closeUsername());
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onCloseModal}
        >
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Create your account</ModalHeader>
                <ModalCloseButton/>
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>User Name</FormLabel>
                        <Input
                            onChange={(e) => dispatch(setUsername(e.target.value))}
                            placeholder='@username'
                            value={username}
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Chat</FormLabel>
                        <Input
                            onChange={(e) => setChatState(e.target.value)}
                            placeholder='Chat'
                            value={chat}
                        />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button disabled={!username || !chat}
                            onClick={onCloseModal}
                    >Save</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default UsernameModal;
