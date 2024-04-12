import React from 'react';
import MaterialStack from '@shared/components/material-stack';
import MaterialNavBar from '@shared/components/material-navbar';

export default function AuthLayout() {
    return (
        <MaterialStack screenOptions={{header: (props) => <MaterialNavBar {...props}/>}}>
            <MaterialStack.Screen name='login' options={{title: 'Войти в аккаунт'}}/>
            <MaterialStack.Screen name='register' options={{title: 'Регистрация'}}/>
        </MaterialStack>
    );
}
