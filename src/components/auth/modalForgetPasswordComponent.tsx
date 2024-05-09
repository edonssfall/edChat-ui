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
import {IResetPassword, ISetPassword} from '../../interfaces/user.interface.ts';
import {useAppDispatch, useAppSelector} from '../../store/hooks.ts';
import {IModalPassword} from '../../interfaces/modal.interface.ts';
import PasswordIconButton from './password/PasswordIcon.tsx';
import {axiosService} from '../../services/axios.service.ts';
import {setTokens} from '../../store/slices/token.slice.ts';
import {environment} from '../../services/environment.ts';
import {setUserLocal} from '../../services/user.service.ts';
import React, {useState} from 'react';
import axios from 'axios';

/**
 * @name ModalResetPassword
 * @description This component is used to log in the user.
 */
function ModalResetPassword({modalType, setModalType, token, uidb64}: IModalPassword) {
    const [isLoading, setIsLoading] = useState<boolean>(false),
        [email, setEmail] = useState<string>(''),
        [password, setPassword] = useState<string>(''),
        [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false),
        [newPassword, setNewPassword] = useState<string>(''),
        [showNewPassword, setShowNewPassword] = useState<boolean>(false),
        [repeatNewPassword, setRepeatNewPassword] = useState<string>(''),
        [showNewRepeatPassword, setShowNewRepeatPassword] = useState<boolean>(false),
        [Error, setError] = useState<string>(''),
        [Failed, setFailed] = useState<boolean>(false),
        {username, user} = useAppSelector(state => state.user),
        dispatch = useAppDispatch(),
        axiosInstance = axiosService();

    /**
     * @name initialStates
     * @description This function is used to set the initial states.
     */
    function initialStates(): void {
        setEmail('');
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
        setModalType('auth');
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
        if (token && uidb64) {
            const data: IResetPassword = {
                token: token,
                uidb64: uidb64,
                password: newPassword,
                confirm_password: repeatNewPassword,
            };
            axios.post(environment.BACKEND_URL_AUTH + environment.api.password_set, data)
                .then(res => {
                    setFailed(false);
                    dispatch(setTokens({accessToken: res.data.accessToken, refreshToken: res.data.refreshToken}));
                    setUserLocal(res.data.user);
                    closePasswordModal();
                })
                .catch(err => {
                    console.log(err);
                    setFailed(true);
                    setError(err.response.data.message);
                })
                .finally(() => setIsLoading(false));
        } else if (!token && !uidb64) {
            if (!username) {
                axios.post(environment.BACKEND_URL_AUTH + environment.api.password_reset, {email: email})
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
            } else {
                const data: ISetPassword = {
                    new_password: newPassword,
                    repeat_new_password: repeatNewPassword,
                };
                axiosInstance.patch(`${environment.api.user}/${user.id}`, data)
                    .then(res => {
                        setFailed(false);
                        dispatch(setTokens({accessToken: res.data.accessToken, refreshToken: res.data.refreshToken}));
                        setUserLocal(res.data.user);
                        closePasswordModal();
                    })
                    .catch(err => {
                        console.log(err);
                        setFailed(true);
                        setError(err.response.data.message);
                    })
                    .finally(() => setIsLoading(false));
            }

        }
    };

    return (
        <Modal isOpen={modalType === 'password'} onClose={closePasswordModal}>
            <ModalOverlay/>
            <ModalContent className='modalWindow' onKeyDown={handleKeyDown}>
                <Box p={'6'}>
                    {!token && !uidb64 && !username && (
                        <FormControl isInvalid={Failed}>
                            <FormLabel>E-Mail</FormLabel>
                            <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </FormControl>
                    )}

                    {!token && !uidb64 && username && (
                        <FormControl isInvalid={Failed}>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input type={showCurrentPassword ? 'text' : 'password'} value={password}
                                       onChange={(e) => setPassword(e.target.value)}/>
                                <PasswordIconButton showPassword={showCurrentPassword}
                                                    setShowPassword={() => setShowCurrentPassword(!showCurrentPassword)}/>
                            </InputGroup>
                        </FormControl>
                    )}

                    {token && uidb64 || username && (
                        <>
                            <FormControl isInvalid={Failed} mt={3}>
                                <FormLabel>New Password</FormLabel>
                                <InputGroup>
                                    <Input type={showNewPassword ? 'text' : 'password'} value={newPassword}
                                           onChange={(e) => setNewPassword(e.target.value)}/>
                                    <PasswordIconButton showPassword={showNewPassword}
                                                        setShowPassword={() => setShowNewPassword(!showNewPassword)}/>
                                </InputGroup>
                            </FormControl>
                            <FormControl isInvalid={Failed}>
                                <FormLabel>Repeat New Password</FormLabel>
                                <InputGroup>
                                    <Input type={showNewRepeatPassword ? 'text' : 'password'} value={repeatNewPassword}
                                           onChange={(e) => setRepeatNewPassword(e.target.value)}/>
                                    <PasswordIconButton showPassword={showNewRepeatPassword}
                                                        setShowPassword={() => setShowNewRepeatPassword(!showNewRepeatPassword)}/>
                                </InputGroup>
                            </FormControl>
                        </>
                    )}
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

export default ModalResetPassword;
