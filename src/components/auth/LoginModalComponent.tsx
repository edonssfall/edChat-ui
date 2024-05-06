import {Box, Button, Checkbox, FormControl, FormLabel, Input, Link, Stack, Text} from "@chakra-ui/react";
import {ILogin, ILoginResponse} from "../../interfaces/user.interface.ts";
import {saveToken, setTokens} from "../../store/slices/token.slice.ts";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {IModalLogin} from "../../interfaces/modal.interface.ts";
import {environment} from "../../services/environment.ts";
import {setUser} from "../../store/slices/user.slice.ts";
import {useState} from "react";
import axios from "axios";

/**
 * @name LoginComponent
 * @description This component is used to log in the user.
 */
function LoginComponent({setModalType}: IModalLogin) {
    const [isLoading, setIsLoading] = useState<boolean>(false),
        [email, setEmail] = useState<string>(''),
        [password, setPassword] = useState<string>(''),
        [loginFailed, setLoginFailed] = useState<boolean>(false),
        dispatch = useAppDispatch(),
        {save} = useAppSelector(state => state.token);

    /**
     * @name login
     * @description This function is used to log in the user.
     */
    const login = () => {
        setIsLoading(true);
        const data: ILogin = {
            email: email,
            password: password
        };
        axios.post(environment.BACKEND_URL_AUTH + environment.api.login, data)
            .then(res => {
                const data: ILoginResponse = res.data;
                setLoginFailed(false);
                dispatch(setTokens({accessToken: data.accessToken, refreshToken: data.refreshToken}));
                dispatch(setUser(data.user));
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
                setLoginFailed(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <Box>
            <FormControl isInvalid={loginFailed}>
                <FormLabel>E-Mail</FormLabel>
                <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </FormControl>
            <FormControl isInvalid={loginFailed}>
                <FormLabel>Password</FormLabel>
                <Input type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </FormControl>
            <Checkbox
                mt={2}
                isChecked={save}
                onChange={() => dispatch(saveToken())}
            >
                Save login
            </Checkbox>
            <Stack spacing={3}>
                <Stack
                    direction={{base: 'column', sm: 'row'}}
                    align={'start'}
                    justify={'space-between'}>
                    <Link color={'blue.400'}
                          onClick={() => setModalType('password')}
                    >Password forget?</Link>
                </Stack>
                <Stack spacing={5}>
                    {loginFailed &&
                        <Text color={'red.500'}>Login failed. Check email and password</Text>
                    }
                    <Button
                        onClick={login}
                        isLoading={isLoading}
                        bg={'blue.400'}
                        color={'white'}
                        _hover={{
                            bg: 'blue.500'
                        }}>
                        Login
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
}

export default LoginComponent;
