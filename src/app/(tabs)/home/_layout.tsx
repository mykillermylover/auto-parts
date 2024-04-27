import React from 'react';
import {MaterialStack} from '@shared/components/material-stack';
import {MaterialNavBar} from '@shared/components/material-navbar';
import {TransitionPresets} from '@react-navigation/stack';

export default function HomeLayout() {
    return (
        <MaterialStack
            screenOptions={{
                ...TransitionPresets.SlideFromRightIOS,
                headerShown: false,
                header: (props) => <MaterialNavBar {...props} />
            }}
        >
            <MaterialStack.Screen
                name='index'
                options={{
                    title: 'Главная'
                }}
            />
            <MaterialStack.Screen
                name='search'
                options={{
                    title: 'Поиск',
                    headerShown: true,
                }}
                initialParams={{
                    back: true
                }}
            />
        </MaterialStack>
    );
}
