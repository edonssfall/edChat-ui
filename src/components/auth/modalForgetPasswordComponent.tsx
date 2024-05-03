import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    Modal, ModalContent,
    ModalOverlay,
    Stack,
    Text
} from "@chakra-ui/react";
import {IResetPassword, ISetPassword} from "../../interfaces/user.interface.ts";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {IModalPassword} from "../../interfaces/modal.interface.ts";
import PasswordIconButton from "./password/PasswordIcon.tsx";
import {axiosService} from "../../services/axios.service.ts";
import {setTokens} from "../../store/slices/token.slice.ts";
import {environment} from "../../services/environment.ts";
import {setUser} from "../../services/user.service.ts";
import {useParams} from "react-router-dom";
import React, {useState} from "react";
import axios from "axios";

/**
 * @name ModalResetPasswordComponent
 * @description This component is used to log in the user.
 */
function ModalResetPasswordComponent({modal, setModal, setModalAuth}: IModalPassword) {
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
        {token, uidb64} = useParams(),
        dispatch = useAppDispatch(),
        axiosInstance = axiosService();

    function closeModal(): void {
        setModal(false);
        setModalAuth(true);
    }

    function handleKeyDown(e: React.KeyboardEvent): void {
        if (e.key === 'Escape') {
            closeModal();
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
            axios.post(environment.BACKEND_URL_AUTH + environment.api.password_reset, data)
                .then(res => {
                    setFailed(false);
                    dispatch(setTokens({accessToken: res.data.accessToken, refreshToken: res.data.refreshToken}));
                    setUser(res.data.user);
                    window.location.reload();
                })
                .catch(err => {
                    console.log(err);
                    setFailed(true);
                    setError(err.response.data.message);
                })
                .finally(() => setIsLoading(false));
        } else {
            const data: ISetPassword = {
                password: password,
                new_password: newPassword,
                repeat_new_password: repeatNewPassword,
            };
            axiosInstance.patch(`${environment.api.user}/${user?.id}`, data)
                .then(res => {
                    setFailed(false);
                    dispatch(setTokens({accessToken: res.data.accessToken, refreshToken: res.data.refreshToken}));
                    setUser(res.data.user);
                    window.location.reload();
                })
                .catch(err => {
                    console.log(err);
                    setFailed(true);
                    setError(err.response.data.message);
                })
                .finally(() => setIsLoading(false));
        }
    };

    return (
        <Modal isOpen={modal} onClose={closeModal}>
            <ModalOverlay/>
            <ModalContent className='modalWindow' onKeyDown={handleKeyDown}>
                <Box>
                    {!token && !uidb64
                        ?
                        <FormControl isInvalid={Failed}>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input type={showCurrentPassword ? 'text' : 'password'} value={password}
                                       onChange={(e) => setPassword(e.target.value)}/>
                                <PasswordIconButton showPassword={showCurrentPassword}
                                                    setShowPassword={() => setShowCurrentPassword(!showCurrentPassword)}/>
                            </InputGroup>
                        </FormControl>
                        :
                        null
                    }

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
                    <Stack spacing={5}>
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

export default ModalResetPasswordComponent;
