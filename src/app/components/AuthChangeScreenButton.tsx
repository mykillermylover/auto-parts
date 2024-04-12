import {HStack} from 'react-native-flex-layout';
import {Button, Text} from 'react-native-paper';
import {Link} from 'expo-router';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import React from 'react';

const messages = {
    login: {
        text: 'Ещё не зарегистрированы?',
        linkText: 'Регистрация'
    },
    register: {
        text: 'Есть аккаунт?',
        linkText: 'Войти'
    }
};

export const AuthChangeScreenButton = ({type} : {type: 'login' | 'register'}) => {
    const linkUrl = type === 'login' ? 'register' : 'login';
    return (
        <HideWithKeyboard>
            <HStack position={'absolute'} bottom={30} w='100%' items={'center'} justify={'evenly'}>
                <Text>{messages[type].text}</Text>
                <Link href={`./${linkUrl}`}>
                    <Button mode='outlined'>{messages[type].linkText}</Button>
                </Link>
            </HStack>
        </HideWithKeyboard>
    );
};
