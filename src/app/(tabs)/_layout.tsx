import {Icon,} from 'react-native-paper';
import React from 'react';
import {MaterialBottomTabs} from '@shared/components/material-bottom-tabs';
import { useTheme } from '@react-navigation/native';

export default function TabLayout() {
    const theme = useTheme();

    return (
        <MaterialBottomTabs
            theme={theme}
            sceneAnimationType='shifting'
        >
            <MaterialBottomTabs.Screen
                name='home'
                options={{
                    title: 'Главная',
                    tabBarIcon: ({color}) => <Icon size={30} source='home' color={color}/>,
                }}
            />
            <MaterialBottomTabs.Screen
                name='garage'
                options={{
                    title: 'Гараж',
                    tabBarIcon: ({color}) => <Icon size={30} source='garage' color={color}/>,
                }}
            />
            <MaterialBottomTabs.Screen
                name='catalogue'
                options={{
                    title: 'Каталог',
                    tabBarIcon: ({color}) => <Icon size={30} source='text-search' color={color}/>,
                }}
            />
            <MaterialBottomTabs.Screen
                name='cart'
                options={{
                    title: 'Корзина',
                    tabBarIcon: ({color}) => <Icon size={30} source='cart' color={color}/>,
                }}
            />
            <MaterialBottomTabs.Screen
                name='profile'
                options={{
                    title: 'Профиль',
                    tabBarIcon: ({color}) => <Icon size={30} source='account' color={color}/>,
                }}
            />
        </MaterialBottomTabs>
    );
}
