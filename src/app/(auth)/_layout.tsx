import React from 'react';
import {MaterialStack} from '@shared/components/material-stack';
import {MaterialNavBar} from '@shared/components/material-navbar';
import { TransitionPresets } from '@react-navigation/stack';
import {TransitionSpec} from '@react-navigation/stack/src/types';

export default function AuthLayout() {
    return (
        <MaterialStack
            screenOptions={{
                ...TransitionPresets.SlideFromRightIOS,
                transitionSpec: transitionConfig,
                header: (props) => <MaterialNavBar {...props}/>
            }}
        >
            <MaterialStack.Screen name='index' options={{title: 'Войти в аккаунт'}}/>
            <MaterialStack.Screen name='register' options={{title: 'Регистрация'}}/>
        </MaterialStack>
    );
}

const transitionSpec: TransitionSpec = {
    animation: 'timing',
    config: {
        delay: 0,
        duration: 250,
    }
};
const transitionConfig = {
    open: transitionSpec,
    close: transitionSpec
};
