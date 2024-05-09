import {
    ModalContent,
    ModalOverlay,
    FormControl,
    InputGroup,
    FormLabel,
    Button,
    Input,
    Modal,
    Stack,
    Text,
    Box
} from '@chakra-ui/react';
import {ILogin, ILoginResponse, ISetPassword} from '../../../interfaces/user.interface.ts';
import {useAppDispatch, useAppSelector} from '../../../store/hooks.ts';
import {axiosService} from '../../../services/axios.service.ts';
import {setTokens} from '../../../store/slices/token.slice.ts';
import {IModal} from '../../../interfaces/modal.interface.ts';
import {environment} from '../../../services/environment.ts';
import {setUser} from '../../../store/slices/user.slice.ts';
import PasswordChecklist from 'react-password-checklist';
import PasswordIconButton from './PasswordIcon.tsx';
import React, {useState} from 'react';
import axios from 'axios';

/**
 * @name ModalSetPassword
 * @description This component is used to set new password.
 */
function ModalSetPassword({modalType, setModalType}: IModal) {
    const [isLoading, setIsLoading] = useState<boolean>(false),
        [password, setPassword] = useState<string>(''),
        [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false),
        [newPassword, setNewPassword] = useState<string>(''),
        [showNewPassword, setShowNewPassword] = useState<boolean>(false),
        [repeatNewPassword, setRepeatNewPassword] = useState<string>(''),
        [showNewRepeatPassword, setShowNewRepeatPassword] = useState<boolean>(false),
        [Error, setError] = useState<string>(''),
        [Failed, setFailed] = useState<boolean>(false),
        {user} = useAppSelector(state => state.user),
        dispatch = useAppDispatch(),
        axiosInstance = axiosService();

    /**
     * @name initialStates
     * @description This function is used to set the initial states.
     */
    function initialStates(): void {
        setPassword('');
        setNewPassword('');
        setRepeatNewPassword('');
        setFailed(false);
        setError('');
    }

    /**
     * @name closePasswordModal
     * @description This function is used to close the password modal.
     */
    function closePasswordModal(): void {
        initialStates();
        setModalType(null);
    }

    /**
     * @name handleKeyDown
     * @param e React.KeyboardEvent
     * @description This function is used to handle the key down event.
     */
    function handleKeyDown(e: React.KeyboardEvent): void {
        if (e.key === 'Escape') {
            closePasswordModal();
        }
    }

    /**
     * @name resetPassword
     * @description This function is used to log in the user.
     */
    const resetPassword = () => {
        setIsLoading(true);
        const data: ILogin = {
            email: user.email,
            password: password,
        };
        
        axios.post(environment.BACKEND_URL_AUTH + environment.api.login, data)
            .then((res) => {
                const response: ILoginResponse = res.data;
                dispatch(
                    setTokens({accessToken: response.access, refreshToken: response.refresh}),
                    setUser(response.user),
                );
                const data: ISetPassword = {
                    new_password: newPassword,
                    repeat_new_password: repeatNewPassword,
                };

                axiosInstance.patch(`${environment.api.user}/${user.id}`, data)
                    .then(() => {
                        setFailed(false);
                        closePasswordModal();
                    })
                    .catch(err => {
                        console.log(err);
                        setFailed(true);
                        setError(err.response.data.message);
                    })
                    .finally(() => setIsLoading(false));
            })
            .catch(err => {
                console.log(err);
                setFailed(true);
                setError(err.response.data.message);
            })
            .finally(() => setIsLoading(false));

    };

    return (
        <Modal isOpen={modalType === 'password'} onClose={closePasswordModal}>
            <ModalOverlay/>
            <ModalContent className='modalWindow' onKeyDown={handleKeyDown}>
                <Box p={'6'}>
                    <FormControl isInvalid={Failed}>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                            <Input type={showCurrentPassword ? 'text' : 'password'} value={password}
                                   onChange={(e) => setPassword(e.target.value)}/>
                            <PasswordIconButton showPassword={showCurrentPassword}
                                                setShowPassword={() => setShowCurrentPassword(!showCurrentPassword)}/>
                        </InputGroup>
                    </FormControl>
                    <FormControl isInvalid={Failed} mt={3}>
                        <FormLabel>New Password</FormLabel>
                        <InputGroup>
                            <Input type={showNewPassword ? 'text' : 'password'} value={newPassword}
                                   onChange={(e) => setNewPassword(e.target.value)}/>
                            <PasswordIconButton showPassword={showNewPassword}
                                                setShowPassword={() => setShowNewPassword(!showNewPassword)}/>
                        </InputGroup>
                    </FormControl>
                    <PasswordChecklist
                        rules={['minLength', 'letter', 'number', 'specialChar']}
                        minLength={8}
                        value={newPassword}
                        valueAgain={repeatNewPassword}
                        messages={{
                            minLength: 'At Least 8 Characters.',
                            letter: 'At Least 1 Letter.',
                            number: 'At Least 1 Number.',
                            specialChar: 'At Least 1 Special Character.',
                        }}
                    />
                    <FormControl isInvalid={Failed}>
                        <FormLabel>Repeat New Password</FormLabel>
                        <InputGroup>
                            <Input type={showNewRepeatPassword ? 'text' : 'password'} value={repeatNewPassword}
                                   onChange={(e) => setRepeatNewPassword(e.target.value)}/>
                            <PasswordIconButton showPassword={showNewRepeatPassword}
                                                setShowPassword={() => setShowNewRepeatPassword(!showNewRepeatPassword)}/>
                        </InputGroup>
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
                            Change Password
                        </Button>
                    </Stack>
                </Box>
            </ModalContent>
        </Modal>
    );
}

export default ModalSetPassword;
