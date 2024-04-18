import React from 'react';
import {FormBuilder} from 'react-native-paper-form-builder';
import {
    defaultRegisterFormValues,
    RegisterFormValues,
    registerRetailConfig
} from '@components/register-form/register-form-config';
import {useForm} from 'react-hook-form';
import {ScrollView} from 'react-native';
import {Button, TextInput, TextInputProps} from 'react-native-paper';

export default function RegisterForm() {

    const {formState: {errors}, control, setFocus, handleSubmit} = useForm({
        defaultValues: defaultRegisterFormValues
    });

    const submitForm = (formData: RegisterFormValues) => {
        console.log(formData);
    };

    return (
        <ScrollView style={{marginBottom: 20}}>
            <FormBuilder
                /* eslint-disable-next-line react/display-name */
                CustomTextInput={React.forwardRef((props: TextInputProps, ref) => (
                    <TextInput {...props} placeholder={props.label as string || props.placeholder} label={''} ref={ref}/>
                ))
                }
                formConfigArray={registerRetailConfig}
                control={control}
                setFocus={setFocus}
            />

            <Button
                mode='contained'
                onPress={handleSubmit(data => {
                    submitForm(data);
                })}
            >
                {'Зарегистрироваться'}
            </Button>
        </ScrollView>
    );
}
