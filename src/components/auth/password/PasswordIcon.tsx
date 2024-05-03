import {IPasswordIconProps} from "../../../interfaces/user.interface.ts";
import { IconButton, InputRightElement } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import React from 'react';


const PasswordIconButton: React.FC<IPasswordIconProps> = ({ showPassword, setShowPassword }) => {
    return (
        <InputRightElement width="3rem">
            <IconButton
                id="toggle-button"
                _hover={{ bg: 'none' }}
                onClick={setShowPassword}
                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                aria-label={showPassword ? 'Hide content' : 'Show content'}
                variant="unstyled"
            />
        </InputRightElement>
    );
};

export default PasswordIconButton;
