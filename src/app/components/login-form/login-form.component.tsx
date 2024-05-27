import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '@shared/hooks';
import { useForm } from 'react-hook-form';
import { UserActions } from '@store/user/user.store';
import { Button } from 'react-native-paper';
import { VStack } from 'react-native-flex-layout';
import { FormBuilder } from 'react-native-paper-form-builder';
import { setHttpClientUserAuthData } from '@httpClient';
import { NetworkError } from '@shared/errors/network.error';
import { ResponseService } from '@services/response.service';
import { ToastService } from '@services/toast.service';
import { useCheckAuthMutation } from '@store/query/local/local.api';
import { defaultFormValues, loginFormConfig, LoginFormValues } from '@components/login-form/login-form.config';
import md5 from 'md5';
import { SecureStoreService } from '@services/secure-store.service';

interface OnLoadingFunction { onLoading: (value: boolean) => void }

export default function LoginForm({ onLoading }: OnLoadingFunction) {
    const [isLoading, setIsLoading] = useState(false);

    const [checkAuth] = useCheckAuthMutation();

    const dispatch = useAppDispatch();
    const { control, setFocus, handleSubmit } = useForm({
        defaultValues: defaultFormValues
    });

    useEffect(() => {
        onLoading(isLoading);
    }, [isLoading]);

    const submitForm = async ({ login, password }: LoginFormValues) => {
        try {
            password = md5(password);

            // Make a request on a separate http client to avoid re-register main client
            const user = await checkAuth({ login, password }).unwrap();
            setHttpClientUserAuthData(login, password);

            await SecureStoreService.setUserData(login, password);

            dispatch(UserActions.setUser(user));
        } catch (err) {
            setIsLoading(false);

            console.log(err);
            const error = err as NetworkError;
            const errorMessage = ResponseService.getErrorMessage(error);

            ToastService.error(errorMessage);
        }
    };

    return (
        <VStack spacing={30}>
            <FormBuilder
                control={control}
                setFocus={setFocus}
                formConfigArray={loginFormConfig(isLoading)}
            />

            <Button
                rippleColor={'rgba(0, 0, 0, .32)'}
                mode='contained'
                onPress={() => {
                    setIsLoading(true);

                    setTimeout(() => handleSubmit(submitForm,
                        () => {
                            setIsLoading(false);
                        })(), 0);
                }}
                disabled={isLoading}
                loading={isLoading}
            >
                {!isLoading && 'Войти'}
            </Button>

            <Button disabled={isLoading} style={{ alignSelf: 'center' }}>Забыли пароль?</Button>
        </VStack>
    );
}
