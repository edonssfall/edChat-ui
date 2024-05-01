import {
    useColorModeValue,
    InputRightElement,
    FormControl,
    InputGroup,
    FormLabel,
    Heading,
    Button,
    Input,
    Stack,
    Text,
    Box, Checkbox,
} from "@chakra-ui/react";
import {environment} from "../../environments/environment.ts";
import PasswordChecklist from "react-password-checklist"
import {useEffect, useRef, useState} from "react";
import ReCAPTCHA from "react-google-recaptcha";
import {toast} from "react-toastify";
import axios from "axios";

/**
 * Interface for validation function
 */
interface ValidationRule {
    condition: (val: string) => boolean;
    errorMsg: string;
}

/**
 * @name SignupComponent
 * @description Component for signing up a new user.
 */
export default function SignupComponent(): JSX.Element {
    const captchaRef = useRef<ReCAPTCHA | null>(null)

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

    /*
    Variables to control that the field has been touched.
    Error to set error message.
    Valid to set validation status.
     */
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
        validations: ValidationRule[]
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
            {condition: (val) => val.length <= 0, errorMsg: "Geben Sie Ihren Benutzernamen ein."},
            {
                condition: (val) => val.length > 20,
                errorMsg: "Geben Sie Ihren Benutzernamen mit einer Länge von weniger als 20 ein."
            },
            {condition: (val) => val.includes(' '), errorMsg: "Geben Sie Ihren Benutzernamen ohne Leerzeichen ein."},
        ]);
        // firstname field validation control
        validateField(firstname, setFirstnameError, setFirstnameValid, [
            {condition: (val) => val.length <= 0, errorMsg: "Geben Sie Ihren Vornamen ein."},
            {
                condition: (val) => val.length > 50,
                errorMsg: "Geben Sie Ihren Vornamen ein, der weniger als 50 Zeichen beinhaltet."
            },
            {condition: (val) => val.includes(' '), errorMsg: "Geben Sie Ihren Vornamen ohne Leerzeichen ein."},
        ]);
        // lastname field validation control
        validateField(lastname, setLastnameError, setLastnameValid, [
            {condition: (val) => val.length <= 0, errorMsg: "Geben Sie Ihren Nachnamen ein."},
            {
                condition: (val) => val.length > 50,
                errorMsg: "Geben Sie Ihren Nachnamen, der weniger als 50 Zeichen beinhaltet."
            },
            {condition: (val) => val.includes(' '), errorMsg: "Geben Sie Ihren Nachnamen ohne Leerzeichen ein."},
        ])
        // email field validation control
        validateField(email, setEmailError, setEmailValid, [
            {
                condition: (val) => !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val),
                errorMsg: "Geben Sie Ihre richtige E-Mail-Adresse ein."
            },
            {
                condition: (val) => val.length > 254,
                errorMsg: "Geben Sie Ihre E-Mail, die weniger als 254 Zeichen beinhaltet."
            },
            {condition: (val) => val.includes(' '), errorMsg: "Geben Sie Ihre E-Mail ohne Leerzeichen ein."},
            {condition: (val) => val.length <= 0, errorMsg: "Geben Sie Ihre E-Mail ein."},
        ]);
        // password field validation control
        validateField(password, setPasswordError, setPasswordValid, [
            {condition: (val) => val.length < 8, errorMsg: "Geben Sie Ihr Passwort ein, das größer oder gleich 8 ist."},
            {
                condition: (val) => val.length > 128,
                errorMsg: "Geben Sie Ihr Passwort kleiner als 128 Zeichen beinhaltet."
            },
            {condition: (val) => val.includes(' '), errorMsg: "Geben Sie Ihr Passwort ohne Leerzeichen ein"},
            {
                condition: (val) => !/[#?!@$%^&*-/(/)_}{|":;'\\.><=\[\]]/.test(val),
                errorMsg: "Geben Sie mindestens 1 Sondernzeichen ein"
            },
            {condition: (val) => !/[0-9]/.test(val), errorMsg: "Geben Sie mindestens 1 Zahl ein."},
            {condition: (val) => !/[a-zA-Z]/.test(val), errorMsg: "Geben Sie mindestens 1 Buchstaben ein."},
            {condition: (val) => val.length <= 0, errorMsg: "Geben Sie Ihr Passwort ein."},
        ]);
        // password2 field validation control
        validateField(password2, setPassword2Error, setPassword2Valid, [
            {condition: (val) => val !== password, errorMsg: "Geben Sie Ihr gleiches Passwort ein."},
            {condition: (_) => password === '', errorMsg: "Geben Sie Ihr Passwort ein."},
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
            {valid: checkbox, setCheckboxError: () => setCheckboxError("Er muss aktiv sein.")},
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
            const data = {
                username: username,
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                accepted_terms_and_conditions: checkbox,
            }
            // Send request to signup link to backend.
            axios.post(environment.BACKEND_URL_AUTH + environment.api.register, data)
                .then(res => {
                    if (res.status >= 200 && res.status < 300) {
                        toast.success("Erfolgreich anmelden!!");
                    }
                })
                .catch(err => {
                    console.error(err);
                    if (err.response) {
                        const errorObject = err.response.data;
                        Object.entries(errorObject).forEach(([field, message]: [string, unknown]) => {
                            if (Array.isArray(message) && message.length > 0 && typeof message[0] === 'string') {
                                if (field === "username") {
                                    setUsernameValid(false);
                                    setUsernameError(message[0]);
                                } else if (field === "email") {
                                    setEmailValid(false);
                                    setEmailError(message[0]);
                                }
                                toast.error(message[0]);
                            }
                        });
                    } else if (err.request) {
                        // Handle network errors or request timeout
                        toast.error("Netzwerkfehler. Bitte versuchen Sie es erneut.");
                    } else {
                        // Handle other unexpected errors
                        toast.error("Es ist ein unerwarteter Fehler aufgetreten. Bitte versuchen Sie es erneut.");
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
                id="username"
                isInvalid={!usernameValid && usernameTouched}
            >
                <FormLabel color={!usernameValid && usernameTouched ? "red" : "black"}>
                    Benutzername
                </FormLabel>
                <Input
                    type="text"
                    value={username}
                    onChange={((event) => handleInputChange(event, setUsername, setUsernameTouched))}
                />
                {!usernameValid && usernameTouched &&
                    <Text color={'red'}>{usernameError}</Text>
                }
            </FormControl>
            <Box display="flex" justifyContent="space-between" width="100%">
                <FormControl
                    isRequired
                    id="firstname"
                    isInvalid={!firstnameValid && firstnameTouched}
                    pr={2}
                >
                    <FormLabel
                        color={!firstnameValid && firstnameTouched ? "red" : "black"}>Vorname</FormLabel>
                    <Input
                        type="text"
                        value={firstname}
                        onChange={((event) => handleInputChange(event, setFirstname, setFirstnameTouched))}
                    />
                    {!firstnameValid && firstnameTouched &&
                        <Text color={'red'}>{firstnameError}</Text>
                    }
                </FormControl>
                <FormControl
                    isRequired
                    id="lastname"
                    isInvalid={!lastnameValid && lastnameTouched}
                >
                    <FormLabel color={!lastnameValid && lastnameTouched ? "red" : "black"}>
                        Nachname
                    </FormLabel>
                    <Input
                        type="text"
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
                id="email"
                isInvalid={!emailValid && emailTouched}
            >
                <FormLabel color={!emailValid && emailTouched ? "red" : "black"}>E-Mail</FormLabel>
                <Input
                    type="email"
                    value={email}
                    onChange={((event) => handleInputChange(event, setEmail, setEmailTouched))}
                />
                {!emailValid && emailTouched &&
                    <Text color={'red'}>{emailError}</Text>
                }
            </FormControl>
            <FormControl
                isRequired
                id="password"
                isInvalid={!passwordValid && passwordTouched}
            >
                <FormLabel color={!passwordValid && passwordTouched ? "red" : "black"}>
                    Passwort
                </FormLabel>
                <InputGroup>
                    <Input
                        isRequired
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={((event) => handleInputChange(event, setPassword, setPasswordTouched))}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={(_) => setShowPassword(!showPassword)}>
                            {showPassword ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                {!passwordValid && passwordTouched &&
                    <Text color={'red'}>{passwordError}</Text>
                }
            </FormControl>
            <PasswordChecklist
                rules={["minLength", "letter", "number", "specialChar"]}
                minLength={8}
                value={password}
                valueAgain={password2}
                messages={{
                    minLength: "Mindestens 8 Zeichen",
                    letter: "Mindestens 1 Buchstabe",
                    number: "Mindestens 1 Zahl",
                    specialChar: "Mindestens 1 Sondernzeichen",
                }}
            />
            <FormControl
                isRequired
                id="password2"
                isInvalid={!password2Valid && password2Touched}
            >
                <FormLabel color={!password2Valid && password2Touched ? "red" : "black"}>
                    Passwort wiederholen
                </FormLabel>
                <InputGroup>
                    <Input
                        isRequired
                        type={showPassword2 ? "text" : "password"}
                        value={password2}
                        onChange={((event) => handleInputChange(event, setPassword2, setPassword2Touched))}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={(_) => setShowPassword2(!showPassword2)}>
                            {showPassword2 ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                {!password2Valid && password2Touched &&
                    <Text color={'red'}>{password2Error}</Text>
                }
            </FormControl>
            <Checkbox
                isChecked={checkbox}
                onChange={(_) => setCheckbox(!checkbox)}
            >
                Ich akzeptiere die Daneschutz- und<br/>Geshaftsbedingungen.
            </Checkbox>
            {!checkbox && !!checkboxError &&
                <Text color={'red'}>{checkboxError}</Text>
            }
            <ReCAPTCHA
                className={"reCaptcha"}
                ref={captchaRef}
                sietekey={process.env.ReCAPTCHA_KEY}
                onChange={validateCaptcha}
            />
            {!captchaValid && captchaTouched && (
                <Text color={'red'}>Sind Sie ein Robot?!</Text>
            )}
            <Stack spacing={5} mt={2}>
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
