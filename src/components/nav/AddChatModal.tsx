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
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { setChat, setChats } from "../../store/slices/user.slice.ts";
import { closeChat } from "../../store/slices/modal.slice.ts";
import { useState } from "react";

function AddChatModal() {
    const [chat, setChatState] = useState<string>('');

    const isOpen = useAppSelector(state => state.modal.chat),
        dispatch = useAppDispatch();

    function onCloseModal() {
        dispatch(setChats(chat));
        dispatch(closeChat());
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
                    <Button disabled={!chat}
                            onClick={onCloseModal}
                    >Save</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default AddChatModal;
