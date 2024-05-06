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
import {environment} from '../../../services/environment.ts';
import {IModal} from '../../../interfaces/modal.interface.ts';
import React, {useState} from 'react';
import axios from 'axios';

/**
 * @name ModalForgotPassword
 * @description This component is used to start reset password.
 */
function ModalForgotPassword({modalType, setModalType}: IModal) {
    const [isLoading, setIsLoading] = useState<boolean>(false),
        [email, setEmail] = useState<string>(''),
        [Error, setError] = useState<string>(''),
        [Failed, setFailed] = useState<boolean>(false);

    /**
     * @name initialStates
     * @description This function is used to set the initial states.
     */
    function initialStates(): void {
        setEmail('');
        setFailed(false);
        setError('');
    }

    /**
     * @name closeForgot
     * @description This function is used to close the password modal.
     */
    function closeForgot(): void {
        initialStates();
        setModalType('auth');
    }

    /**
     * @name handleKeyDown
     * @param e React.KeyboardEvent
     * @description This function is used to handle the key down event.
     */
    function handleKeyDown(e: React.KeyboardEvent): void {
        if (e.key === 'Escape') {
            closeForgot();
        }
    }

    /**
     * @name resetPassword
     * @description This function is used to log in the user.
     */
    const resetPassword = () => {
        setIsLoading(true);

        axios.post(environment.BACKEND_URL_AUTH + environment.api.password_reset, {email: email})
            .then(() => {
                setFailed(false);
                closeForgot();
            })
            .catch(err => {
                console.log(err);
                setFailed(true);
                setError(err.response.data.message);
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <Modal isOpen={modalType === 'forgot'} onClose={closeForgot}>
            <ModalOverlay/>
            <ModalContent className='modalWindow' onKeyDown={handleKeyDown}>
                <Box p={'6'}>
                    <FormControl isInvalid={Failed}>
                        <FormLabel>E-Mail</FormLabel>
                        <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </FormControl>
                    <Stack spacing={5} mt={4}>
                        {Failed &&
                            <Text color={'red.500'}>{Error}</Text>
                        }
                        <Button
                            onClick={resetPassword}
                            isLoading={isLoading}
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

export default ModalForgotPassword;
