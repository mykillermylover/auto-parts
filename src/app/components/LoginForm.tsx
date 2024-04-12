import React, {useState} from 'react';
import {useAppDispatch} from '@shared/hooks';
import {useForm} from 'react-hook-form';
import {UserState} from '@store/user/user-state.model';
import {UserActions} from '@store/user/user.store';
import {FormBuilder} from 'react-native-paper-form-builder';
import {Button, TextInput} from 'react-native-paper';
import {Flex, VStack} from 'react-native-flex-layout';

type LoginFormValues = {
    phone: string,
    password: string,
}

const defaultFormValues: LoginFormValues = {
    phone: '',
    password: ''
};

export default function LoginForm() {
    const [disabled, setDisabled] = useState(false);
    const [securePass, setSecurePass] = useState(true);
    const [passIcon, setPassIcon] = useState('eye');

    const dispatch = useAppDispatch();
    const {control, setFocus, handleSubmit} = useForm({
        defaultValues: defaultFormValues,
        mode: 'onChange'
    });

    const changePasswordVisibility = () => {
        if (passIcon == 'eye') setPassIcon('eye-off');
        else setPassIcon('eye');
        setSecurePass(!securePass);
    };

    const submitForm = ({login, password}: LoginFormValues) => {
        const user: UserState = {
            code: 0,
            email: '',
            id: 0,
            mobile: '',
            name: '',
            organization: ''
        };

        dispatch(UserActions.setUser({user}));
    };
    return (
        <VStack spacing={30}>
            <Flex>
                <FormBuilder
                    control={control}
                    setFocus={setFocus}
                    formConfigArray={[
                        {
                            type: 'text',
                            name: 'phone',
                            options: [{
                                label: 'phone',
                                value: 'text'
                            }],

                            rules: {
                                required: {
                                    value: true,
                                    message: 'Введите номер телефона',
                                },
                            },
                            textInputProps: {
                                label: 'Номер телефона',
                                left: <TextInput.Icon icon={'phone'}/>,
                            }
                        },
                        {
                            type: 'text',
                            name: 'password',

                            rules: {
                                required: {
                                    value: true,
                                    message: 'Введите пароль',
                                }
                            },
                            textInputProps: {
                                label: 'Пароль',
                                right: <TextInput.Icon icon={passIcon} onPress={changePasswordVisibility}/>,
                                secureTextEntry: securePass,
                                left: <TextInput.Icon icon={'lock'}/>,
                            }
                        }
                    ]}
                />
                <Button
                    mode={'contained'}
                    onPress={handleSubmit(data => {
                        setDisabled(true);
                        submitForm(data);
                    })}
                    disabled={disabled}
                    loading={disabled}
                >
                    Подтвердить
                </Button>
            </Flex>

            <Button>Забыли пароль?</Button>
        </VStack>
    );
}
