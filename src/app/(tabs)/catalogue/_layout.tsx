import React from 'react';
import {MaterialTopTabs} from '@shared/components/material-top-tabs';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Dimensions} from 'react-native';

export default function CatalogueLayout() {

    const tabBarIndicatorWidth = 80;
    const screensNumber = 2;

    return (
        <>
            <SafeAreaView />
            <MaterialTopTabs
                screenOptions={{
                    tabBarLabelStyle: {
                        textTransform: 'none',
                        fontSize: 15
                    },
                    tabBarIndicatorStyle: {
                        width: tabBarIndicatorWidth,
                        left: (Dimensions.get('window').width / screensNumber - tabBarIndicatorWidth) / 2
                    }
                }}
            >
                <MaterialTopTabs.Screen
                    name='index'
                    options={{
                        title: 'Каталог'
                    }}
                />
                <MaterialTopTabs.Screen
                    name='article'
                    options={{
                        title: 'Поиск'
                    }}
                />
            </MaterialTopTabs>
        </>

    );
}
