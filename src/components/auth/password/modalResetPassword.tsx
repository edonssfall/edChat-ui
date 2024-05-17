import {
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  FormControl,
  ModalHeader,
  InputGroup,
  ModalBody,
  FormLabel,
  Button,
  Input,
  Modal,
  Stack,
  Text,
} from '@chakra-ui/react';
import {IModalResetPassword} from '../../../interfaces/modal.interface.ts';
import {IResetPassword} from '../../../interfaces/user.interface.ts';
import {environment} from '../../../services/environment.ts';
import PasswordChecklist from 'react-password-checklist';
import PasswordIconButton from './IconPassword.tsx';
import React, {useState} from 'react';
import axios from 'axios';
import {useModalTypeContext} from '../../../context/modal.context.tsx';

/**
 * @name ModalResetPassword
 * @description This component is used to log in the user.
 */
function ModalResetPassword({token, uidb64}: IModalResetPassword) {
  const [isLoading, setIsLoading] = useState<boolean>(false),
    [newPassword, setNewPassword] = useState<string>(''),
    [showNewPassword, setShowNewPassword] = useState<boolean>(false),
    [repeatNewPassword, setRepeatNewPassword] = useState<string>(''),
    [showNewRepeatPassword, setShowNewRepeatPassword] = useState<boolean>(false),
    [Error, setError] = useState<string>(''),
    [Failed, setFailed] = useState<boolean>(false),
    {modalState, setModalState} = useModalTypeContext();

  /**
     * @name initialStates
     * @description This function is used to set the initial states.
     */
  function initialStates() {
    setNewPassword('');
    setRepeatNewPassword('');
    setFailed(false);
    setError('');
  }

  /**
     * @name closePasswordModal
     * @description This function is used to close the password modal.
     */
  function closePasswordModal() {
    initialStates();
    setModalState({state: 'auth'});
  }

  /**
     * @name handleKeyDown
     * @param e React.KeyboardEvent
     * @description This function is used to handle the key down event.
     */
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      closePasswordModal();
    }
    if (e.key === 'Enter') {
      resetPassword();
    }
  }

  /**
     * @name resetPassword
     * @description This function is used to log in the user.
     */
  const resetPassword = () => {
    setIsLoading(true);
    const data: IResetPassword = {
      token: token,
      uidb64: uidb64,
      password: newPassword,
      confirm_password: repeatNewPassword,
    };
    axios.patch(environment.BACKEND_URL_AUTH + environment.api.password_set, data)
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
  };

  return (
    <Modal isOpen={modalState.state === 'password-reset'} onClose={closePasswordModal}>
      <ModalOverlay/>
      <ModalContent className='modalWindow' onKeyDown={handleKeyDown}>
        <ModalHeader>Reset Password</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
          <FormControl isInvalid={Failed}>
            <FormLabel>New Password</FormLabel>
            <InputGroup>
              <Input type={showNewPassword ? 'text' : 'password'} value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}/>
              <PasswordIconButton showPassword={showNewPassword}
                setShowPassword={() => setShowNewPassword(!showNewPassword)}/>
            </InputGroup>
          </FormControl>
          <FormControl isInvalid={Failed} mb={3}>
            <FormLabel>Repeat New Password</FormLabel>
            <InputGroup>
              <Input type={showNewRepeatPassword ? 'text' : 'password'} value={repeatNewPassword}
                onChange={(e) => setRepeatNewPassword(e.target.value)}/>
              <PasswordIconButton showPassword={showNewRepeatPassword}
                setShowPassword={() => setShowNewRepeatPassword(!showNewRepeatPassword)}/>
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
                            Set New Password
            </Button>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ModalResetPassword;
