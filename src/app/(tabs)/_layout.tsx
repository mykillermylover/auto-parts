import { Icon, } from 'react-native-paper';
import React from 'react';
import { MaterialBottomTabs } from '@shared/components/navigation/material-bottom-tabs';
import { useTheme } from '@react-navigation/native';
import { Easing } from 'react-native-reanimated';
import { useAppSelector } from '@shared/hooks';
import TabBarSelectors from '@store/tab-bar/tab-bar.selectors';

export default function TabLayout() {
    const theme = useTheme();
    const isTabBarVisible = useAppSelector(TabBarSelectors.getVisibility);

    return (
        <MaterialBottomTabs
            barStyle={{
                display: isTabBarVisible ? 'flex' : 'none',
            }}
            theme={theme}
            sceneAnimationType='shifting'
            sceneAnimationEasing={Easing.quad}
        >
            <MaterialBottomTabs.Screen
                name='home'
                options={{
                    title: 'Главная',
                    tabBarIcon: ({ color }) => <Icon size={30} source='home' color={color}/>,
                }}
            />
            <MaterialBottomTabs.Screen
                name='garage'
                options={{
                    title: 'Гараж',
                    tabBarIcon: ({ color }) => <Icon size={30} source='garage' color={color}/>,
                }}
            />
            <MaterialBottomTabs.Screen
                name='catalogue'
                options={{
                    title: 'Каталог',
                    tabBarIcon: ({ color }) => <Icon size={30} source='text-search' color={color}/>,
                }}
            />
            <MaterialBottomTabs.Screen
                name='cart'
                options={{
                    title: 'Корзина',
                    tabBarIcon: ({ color }) => <Icon size={30} source='cart' color={color}/>,
                }}
            />
            <MaterialBottomTabs.Screen
                name='profile'
                options={{
                    title: 'Профиль',
                    tabBarIcon: ({ color }) => <Icon size={30} source='account' color={color}/>,
                }}
            />
        </MaterialBottomTabs>
    );
}
