import {Box, Button, Checkbox, FormControl, FormLabel, Input, Link, Stack, Text} from '@chakra-ui/react';
import {ILogin, ILoginResponse} from '../../interfaces/user.interface.ts';
import {saveToken, setTokens} from '../../store/slices/token.slice.ts';
import {useModalTypeContext} from '../../context/modal.context.tsx';
import {environment} from '../../services/environment.ts';
import {setUser} from '../../store/slices/user.slice.ts';
import {useAppSelector} from '../../store/hooks.ts';
import {useDispatch} from 'react-redux';
import {useState} from 'react';
import axios from 'axios';

/**
 * @name LoginComponent
 * @description This component is used to log in the user.
 */
function LoginComponent() {
  const [isLoading, setIsLoading] = useState<boolean>(false),
    [email, setEmail] = useState<string>(''),
    [password, setPassword] = useState<string>(''),
    [loginFailed, setLoginFailed] = useState<boolean>(false),
    dispatch = useDispatch(),
    {save} = useAppSelector(state => state.token),
    {setModalState} = useModalTypeContext();

  /**
     * @name handleKeyDown
     * @param e React.KeyboardEvent
     * @description This function is used to handle the key down event.
     */
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      login();
    }
  }

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
        dispatch(setTokens({accessToken: data.access, refreshToken: data.refresh}));
        dispatch(setUser(data.user));
        setModalState({state: null});
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
    <Box onKeyDown={handleKeyDown}>
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
            onClick={() => setModalState({state: 'forgot'})}
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
