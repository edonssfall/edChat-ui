import {
    FormControl,
    InputGroup,
    FormLabel,
    Button,
    Input,
    Stack,
    Text,
    Box, Checkbox,
} from '@chakra-ui/react';
import {IValidationRule} from '../../interfaces/modal.interface.ts';
import {IRegister} from '../../interfaces/user.interface.ts';
import PasswordIconButton from './password/PasswordIcon.tsx';
import {environment} from '../../services/environment.ts';
import React, {useEffect, useRef, useState} from 'react';
import PasswordChecklist from 'react-password-checklist'
import ReCAPTCHA from 'react-google-recaptcha';
import {toast} from 'react-toastify';
import axios from 'axios';

/**
 * @name SignupComponent
 * @description Component for signing up a new user.
 */
function SignupComponent(): React.JSX.Element {
    const captchaRef = useRef<ReCAPTCHA | null>(null),
        captchaKey = import.meta.env.VITE_ReCAPTCHA_KEY;

    // Variables with state for form
    const [username, setUsername] = useState<string>(''),
        [firstname, setFirstname] = useState<string>(''),
        [lastname, setLastname] = useState<string>(''),
        [email, setEmail] = useState<string>(''),
        [password, setPassword] = useState<string>(''),
        [password2, setPassword2] = useState<string>(''),
        [showPassword, setShowPassword] = useState<boolean>(false),
        [showPassword2, setShowPassword2] = useState<boolean>(false),
        [checkbox, setCheckbox] = useState<boolean>(false),
        [isLoading, setIsLoading] = useState<boolean>(false)

    /**
    Variables to control that the field has been touched.
    Error to set error message.
    Valid to set validation status.
     **/
    const [usernameError, setUsernameError] = useState<string>(''),
        [usernameTouched, setUsernameTouched] = useState<boolean>(false),
        [usernameValid, setUsernameValid] = useState<boolean>(false),
        [firstnameError, setFirstnameError] = useState<string>(''),
        [firstnameTouched, setFirstnameTouched] = useState<boolean>(false),
        [firstnameValid, setFirstnameValid] = useState<boolean>(false),
        [lastnameError, setLastnameError] = useState<string>(''),
        [lastnameTouched, setLastnameTouched] = useState<boolean>(false),
        [lastnameValid, setLastnameValid] = useState<boolean>(false),
        [emailError, setEmailError] = useState<string>(''),
        [emailTouched, setEmailTouched] = useState<boolean>(false),
        [emailValid, setEmailValid] = useState<boolean>(false),
        [passwordError, setPasswordError] = useState<string>(''),
        [passwordTouched, setPasswordTouched] = useState<boolean>(false),
        [passwordValid, setPasswordValid] = useState<boolean>(false),
        [password2Error, setPassword2Error] = useState<string>(''),
        [password2Touched, setPassword2Touched] = useState<boolean>(false),
        [password2Valid, setPassword2Valid] = useState<boolean>(false),
        [checkboxError, setCheckboxError] = useState<string>(''),
        [captchaTouched, setCaptchaTouched] = useState<boolean>(false),
        [captchaValid, setCaptchaValid] = useState<boolean>(false);

    /**
     * Function to set that field touched been.
     * @param event HTML input string
     * @param setState for this field
     * @param setTouched for this field
     */
    function handleInputChange(
        event: React.ChangeEvent<HTMLInputElement>,
        setState: React.Dispatch<React.SetStateAction<string>>,
        setTouched: React.Dispatch<React.SetStateAction<boolean>>,
    ): void {
        setState(event.target.value);
        setTouched(true);
    }

    /**
     * Function take list of validations condition.
     * Validated field.
     * Set error and validate status.
     * @param value field value
     * @param setError for this field
     * @param setValid for this field
     * @param validations list with conditions
     */
    function validateField(
        value: string,
        setError: React.Dispatch<React.SetStateAction<string>>,
        setValid: React.Dispatch<React.SetStateAction<boolean>>,
        validations: IValidationRule[]
    ): void {
        let isValid = true;
        setError('');
        validations.forEach((validation) => {
            if (validation.condition(value)) {
                setError(validation.errorMsg);
                isValid = false;
                return;
            }
        });
        setValid(isValid);
    }

    /**
     * Function to validate reCAPTCHA
     */
    function validateCaptcha(): void {
        const captcha = captchaRef.current?.getValue();
        !captcha ? setCaptchaValid(false) : setCaptchaValid(true);
    }

    /**
     * Main validate function.
     * It calls validateField for all fields:
     *   (username, firstname, lastname, email, password, password2, birthDate, captcha)
     */
    function validate() {
        // username field validation control
        validateField(username, setUsernameError, setUsernameValid, [
            {condition: (val) => val.length <= 0, errorMsg: 'Enter your user name.'},
            {
                condition: (val) => val.length > 20,
                errorMsg: 'Enter your user name with a length of less than 20.'
            },
            {condition: (val) => val.includes(' '), errorMsg: 'Enter your user name without spaces.'},
        ]);
        // firstname field validation control
        validateField(firstname, setFirstnameError, setFirstnameValid, [
            {condition: (val) => val.length <= 0, errorMsg: 'Enter your first name.'},
            {
                condition: (val) => val.length > 50,
                errorMsg: 'Enter your first name, which contains less than 50 characters.'
            },
            {condition: (val) => val.includes(' '), errorMsg: 'Enter your first name without spaces.'},
        ]);
        // lastname field validation control
        validateField(lastname, setLastnameError, setLastnameValid, [
            {condition: (val) => val.length <= 0, errorMsg: 'Enter your last name.'},
            {
                condition: (val) => val.length > 50,
                errorMsg: 'Enter your last name, which contains less than 50 characters.'
            },
            {condition: (val) => val.includes(' '), errorMsg: 'Enter your last name without spaces.'},
        ])
        // email field validation control
        validateField(email, setEmailError, setEmailValid, [
            {
                condition: (val) => !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val),
                errorMsg: 'Enter your correct e-mail address.'
            },
            {
                condition: (val) => val.length > 254,
                errorMsg: 'Enter your e-mail, which contains less than 254 characters.'
            },
            {condition: (val) => val.includes(' '), errorMsg: 'Enter your e-mail without spaces.'},
            {condition: (val) => val.length <= 0, errorMsg: 'Enter your e-mail address.'},
        ]);
        // password field validation control
        validateField(password, setPasswordError, setPasswordValid, [
            {condition: (val) => val.length < 8, errorMsg: 'Enter your password, which is greater than or equal to 8.'},
            {
                condition: (val) => val.length > 128,
                errorMsg: 'Enter a password of less than 128 characters.'
            },
            {condition: (val) => val.includes(' '), errorMsg: 'Enter your password without spaces.'},
            {
                condition: (val) => !/[#?!@$%^&*-/(/)_}{|':;'\\.><=[\]]/.test(val),
                errorMsg: 'Enter at least 1 special character.'
            },
            {condition: (val) => !/[0-9]/.test(val), errorMsg: 'Enter at least 1 number.'},
            {condition: (val) => !/[a-zA-Z]/.test(val), errorMsg: 'Enter at least 1 letter.'},
            {condition: (val) => val.length <= 0, errorMsg: 'Enter your password.'},
        ]);
        // password2 field validation control
        validateField(password2, setPassword2Error, setPassword2Valid, [
            {condition: (val) => val !== password, errorMsg: 'Enter your same password.'},
            {condition: () => password === '', errorMsg: 'Enter your password.'},
        ]);
        // captcha validate control
        validateCaptcha();
    }

    /**
     * Set fields boolean touched on true
     */
    function setFieldsTouched(): void {
        const fields = [
            {valid: usernameValid, setTouched: setUsernameTouched},
            {valid: firstnameValid, setTouched: setFirstnameTouched},
            {valid: lastnameValid, setTouched: setLastnameTouched},
            {valid: emailValid, setTouched: setEmailTouched},
            {valid: passwordValid, setTouched: setPasswordTouched},
            {valid: password2Valid, setTouched: setPassword2Touched},
            {valid: checkbox, setCheckboxError: () => setCheckboxError('It must be active.')},
            {valid: captchaValid, setTouched: setCaptchaTouched},
        ];
        fields.forEach(field => {
            if (field.setTouched) {
                field.setTouched(true);
            } else if (field.setCheckboxError) {
                field.setCheckboxError();
            }
        });
    }

    /**
     * Separate function to control if all fields valid
     */
    function allValid(): boolean {
        const fields = [usernameValid, firstnameValid, lastnameValid, emailValid, passwordValid, password2Valid, checkbox, captchaValid]
        return fields.every(value => value);
    }

    /**
     * Reactive validate of fields.
     */
    useEffect((): void => {
        validate();
    }, [username, firstname, lastname, email, password, password2, checkbox]);

    /**
     * Submit function
     * Make one more validation control.
     * If all okay, send request to signup
     */
    function handleSubmit(): void {
        // Makes it so that errors are displayed for invalid and don't do touched fields.
        setFieldsTouched();

        // Make own validate
        validate();

        // If all fields valid are.
        if (allValid()) {
            setIsLoading(true);
            // JSON for request.
            const data: IRegister = {
                first_name: firstname,
                last_name: lastname,
                email: email,
                password: password,
                repeat_password: password2,
            }
            // Send request to signup link to backend.
            axios.post(environment.BACKEND_URL_AUTH + environment.api.register, data)
                .then(res => {
                    if (res.status >= 200 && res.status < 300) {
                        toast.success('Register successfully!!!');
                    }
                })
                .catch(err => {
                    console.error(err);
                    if (err.response) {
                        const errorObject = err.response.data;
                        Object.entries(errorObject).forEach(([field, message]: [string, unknown]) => {
                            if (Array.isArray(message) && message.length > 0 && typeof message[0] === 'string') {
                                if (field === 'username') {
                                    setUsernameValid(false);
                                    setUsernameError(message[0]);
                                } else if (field === 'email') {
                                    setEmailValid(false);
                                    setEmailError(message[0]);
                                }
                                toast.error(message[0]);
                            }
                        });
                    } else if (err.request) {
                        // Handle network errors or request timeout
                        toast.error('Network error. Please try again.');
                    } else {
                        // Handle other unexpected errors
                        toast.error('An unexpected error has occurred. Please try again.');
                    }
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }

    return (
        <Box>
            <FormControl
                isRequired
                id='username'
                isInvalid={!usernameValid && usernameTouched}
            >
                <FormLabel color={!usernameValid && usernameTouched ? 'red' : 'black'}>
                    Username
                </FormLabel>
                <Input
                    type='text'
                    value={username}
                    onChange={((event) => handleInputChange(event, setUsername, setUsernameTouched))}
                />
                {!usernameValid && usernameTouched &&
                    <Text color={'red'}>{usernameError}</Text>
                }
            </FormControl>
            <Box display='flex' justifyContent='space-between' width='100%'>
                <FormControl
                    isRequired
                    id='firstname'
                    isInvalid={!firstnameValid && firstnameTouched}
                    pr={2}
                >
                    <FormLabel
                        color={!firstnameValid && firstnameTouched ? 'red' : 'black'}>First Name</FormLabel>
                    <Input
                        type='text'
                        value={firstname}
                        onChange={((event) => handleInputChange(event, setFirstname, setFirstnameTouched))}
                    />
                    {!firstnameValid && firstnameTouched &&
                        <Text color={'red'}>{firstnameError}</Text>
                    }
                </FormControl>
                <FormControl
                    isRequired
                    id='lastname'
                    isInvalid={!lastnameValid && lastnameTouched}
                >
                    <FormLabel color={!lastnameValid && lastnameTouched ? 'red' : 'black'}>
                        Last Name
                    </FormLabel>
                    <Input
                        type='text'
                        value={lastname}
                        onChange={((event) => handleInputChange(event, setLastname, setLastnameTouched))}
                    />
                    {!lastnameValid && lastnameTouched &&
                        <Text color={'red'}>{lastnameError}</Text>
                    }
                </FormControl>
            </Box>
            <FormControl
                isRequired
                id='email'
                isInvalid={!emailValid && emailTouched}
            >
                <FormLabel color={!emailValid && emailTouched ? 'red' : 'black'}>E-Mail</FormLabel>
                <Input
                    type='email'
                    value={email}
                    onChange={((event) => handleInputChange(event, setEmail, setEmailTouched))}
                />
                {!emailValid && emailTouched &&
                    <Text color={'red'}>{emailError}</Text>
                }
            </FormControl>
            <FormControl
                isRequired
                id='password'
                isInvalid={!passwordValid && passwordTouched}
            >
                <FormLabel color={!passwordValid && passwordTouched ? 'red' : 'black'}>
                    Password
                </FormLabel>
                <InputGroup>
                    <Input
                        isRequired
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={((event) => handleInputChange(event, setPassword, setPasswordTouched))}
                    />
                    <PasswordIconButton showPassword={showPassword}
                                        setShowPassword={() => setShowPassword(!showPassword)}/>
                </InputGroup>
                {!passwordValid && passwordTouched &&
                    <Text color={'red'}>{passwordError}</Text>
                }
            </FormControl>
            <PasswordChecklist
                rules={['minLength', 'letter', 'number', 'specialChar']}
                minLength={8}
                value={password}
                valueAgain={password2}
                messages={{
                    minLength: 'At Least 8 Characters.',
                    letter: 'At Least 1 Letter.',
                    number: 'At Least 1 Number.',
                    specialChar: 'At Least 1 Special Character.',
                }}
            />
            <FormControl
                isRequired
                id='password2'
                isInvalid={!password2Valid && password2Touched}
            >
                <FormLabel color={!password2Valid && password2Touched ? 'red' : 'black'}>
                    Confirm Password
                </FormLabel>
                <InputGroup>
                    <Input
                        isRequired
                        type={showPassword2 ? 'text' : 'password'}
                        value={password2}
                        onChange={((event) => handleInputChange(event, setPassword2, setPassword2Touched))}
                    />
                    <PasswordIconButton showPassword={showPassword2}
                                        setShowPassword={() => setShowPassword2(!showPassword2)}/>
                </InputGroup>
                {!password2Valid && password2Touched &&
                    <Text color={'red'}>{password2Error}</Text>
                }
            </FormControl>
            <Checkbox
                mb={3}
                mt={3}
                isChecked={checkbox}
                onChange={() => setCheckbox(!checkbox)}
            >
                I accept the data protection and<br/>terms and conditions.
            </Checkbox>
            {!checkbox && !!checkboxError &&
                <Text color={'red'}>{checkboxError}</Text>
            }
            <ReCAPTCHA
                className={'reCaptcha'}
                ref={captchaRef}
                sitekey={captchaKey}
                onChange={validateCaptcha}
            />
            {!captchaValid && captchaTouched && (
                <Text color={'red'}>Sind Sie ein Robot?!</Text>
            )}
            <Stack spacing={5} mt={4}>
                <Button
                    onClick={handleSubmit}
                    isLoading={isLoading}
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                        bg: 'blue.500'
                    }}>
                    Registrieren
                </Button>
            </Stack>
        </Box>
    );
}

export default SignupComponent;
