import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { IconButton, InputRightElement } from '@chakra-ui/react';
import React from 'react';

import { IPasswordIconProps } from '../../../interfaces/user.interface.ts';

/**
 * @name PasswordIconButton
 * @param showPassword
 * @param setShowPassword
 * @description This component is used to show the password icon button.
 * @constructor
 */
const PasswordIconButton: React.FC<IPasswordIconProps> = ({ showPassword, setShowPassword }) => {
  return (
    <InputRightElement width='3rem'>
      <IconButton
        id='toggle-button'
        _hover={{ bg: 'none' }}
        onClick={setShowPassword}
        icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
        aria-label={showPassword ? 'Hide content' : 'Show content'}
        variant='unstyled'
      />
    </InputRightElement>
  );
};

export default PasswordIconButton;
