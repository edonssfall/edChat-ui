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
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {setUsername} from "../../store/slices/user.slice.ts";
import {useState} from "react";

function UsernameModal() {
    const [chat, setChatState] = useState<string>('');

    const username = useAppSelector(state => state.user.username),
        dispatch = useAppDispatch();

    function onCloseModal() {
        console.log('close')
    }

    return (
        <Modal
            isOpen={false}
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
                        <FormLabel>ChatComponent</FormLabel>
                        <Input
                            onChange={(e) => setChatState(e.target.value)}
                            placeholder='ChatComponent'
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