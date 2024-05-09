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
} from '@chakra-ui/react';
import {useState} from 'react';

function AddChatModalComponent() {
    const [chat, setChatState] = useState<string>('');

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
                    <Button disabled={!chat}
                            onClick={onCloseModal}
                    >Save</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default AddChatModalComponent;
