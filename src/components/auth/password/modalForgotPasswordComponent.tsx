import {
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    FormControl,
    ModalHeader,
    ModalBody,
    FormLabel,
    Button,
    Input,
    Modal,
    Stack,
    Text,
} from '@chakra-ui/react';
import {IModal, IModalResetPasswordResponse} from '../../../interfaces/modal.interface.ts';
import {IForgotPassword} from '../../../interfaces/user.interface.ts';
import {environment} from '../../../services/environment.ts';
import {useNavigate} from "react-router-dom";
import React, {useState} from 'react';
import axios from 'axios';

/**
 * @name ModalForgotPassword
 * @description This component is used to start reset password.
 */
function ModalForgotPassword({modalType, setModalType}: IModal) {
    const navigate = useNavigate();

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
        const data: IForgotPassword = {
            email: email,
            url: window.location.href,
        }

        axios.post(environment.BACKEND_URL_AUTH + environment.api.password_reset, data)
            .then((response) => {
                const data: IModalResetPasswordResponse = response.data;
                setFailed(false);
                closeForgot();
                navigate(data.data.link);
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
                <ModalHeader>Forgot Password?</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <FormControl isInvalid={Failed}>
                        <FormLabel>E-Mail</FormLabel>
                        <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </FormControl>
                    <Stack spacing={5} mt={4} mb={4}>
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
                            Send Email
                        </Button>
                    </Stack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default ModalForgotPassword;
