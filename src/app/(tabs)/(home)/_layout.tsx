import React from 'react';
import {MaterialStack} from '@shared/components/material-stack';
import {MaterialNavBar} from '@shared/components/material-navbar';

export default function HomeTabLayout() {

    return (
        <MaterialStack screenOptions={{
            header: (props) => <MaterialNavBar {...props}/>
        }}>
            <MaterialStack.Screen
                name='index'
                options={{
                    title: 'Главная',
                    headerShown: false,
                }}
            />
        </MaterialStack>
    );
}
