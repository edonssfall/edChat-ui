import {
    ModalContent,
    ModalOverlay,
    FormControl,
    FormLabel,
    Button,
    Input,
    Modal,
    Stack,
    Text,
    Box
} from '@chakra-ui/react';
import {useModalTypeContext} from "../../context/modal.context.tsx";
import {setUsername} from '../../store/slices/user.slice.ts';
import {useDispatch} from "react-redux";
import React, {useState} from 'react';

/**
 * @name ModalUsername
 * @description This component is used to log in the user.
 */
function ModalUsername() {
    const [userName, setUserName] = useState<string>(''),
        [Error, setError] = useState<string>(''),
        [Failed, setFailed] = useState<boolean>(false),
        {modalState, setModalState} = useModalTypeContext(),
        dispatch = useDispatch();

    /**
     * @name initialStates
     * @description This function is used to set the initial states.
     */
    function initialStates() {
        setUserName('');
        setFailed(false);
        setError('');
    }

    /**
     * @name closeUsernameModal
     * @description This function is used to close the password modal.
     */
    function closeUsernameModal() {
        initialStates();
        dispatch(setUsername(userName));
        setModalState({state: null});
    }

    /**
     * @name handleKeyDown
     * @param e React.KeyboardEvent
     * @description This function is used to handle the key down event.
     */
    function handleKeyDown(e: React.KeyboardEvent) {
        if (e.key === 'Escape') {
            closeUsernameModal();
        }
        if (e.key === 'Enter') {
            closeUsernameModal();
        }
    }

    return (
        <Modal isOpen={modalState.state === 'username'} onClose={closeUsernameModal}>
            <ModalOverlay/>
            <ModalContent className='modalWindow' onKeyDown={handleKeyDown}>
                <Box p={'6'}>
                    <FormControl isInvalid={Failed}>
                        <FormLabel>Username</FormLabel>
                        <Input type='email' value={userName} onChange={(e) => setUserName(e.target.value)}/>
                    </FormControl>
                    
                    <Stack spacing={5} mt={4}>
                        {Failed &&
                            <Text color={'red.500'}>{Error}</Text>
                        }
                        <Button
                            onClick={closeUsernameModal}
                            bg={'blue.400'}
                            color={'white'}
                            _hover={{
                                bg: 'blue.500'
                            }}>
                            Login
                        </Button>
                    </Stack>
                </Box>
            </ModalContent>
        </Modal>
    );
}

export default ModalUsername;
