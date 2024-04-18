import {Icon} from 'react-native-paper';
import React from 'react';
import {MaterialBottomTabs} from '@shared/components/material-bottom-tabs';

export default function TabLayout() {
    return (
        <MaterialBottomTabs>
            <MaterialBottomTabs.Screen
                name='(home)'
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
                name='settings'
                options={{
                    title: 'Настройки',
                    tabBarIcon: ({color}) => <Icon size={30} source='cog' color={color}/>,
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
