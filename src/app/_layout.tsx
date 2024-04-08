import 'react-native-gesture-handler';
import {PaperProvider} from 'react-native-paper';
import {useColorScheme} from 'react-native';
import makeTheme from './style/theme';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider} from '@react-navigation/native';
import MaterialStack from '@shared/components/material-stack';
import React from 'react';
import MaterialNavBar from './shared/components/material-navbar';

export default function AppLayout() {
    const colorScheme = useColorScheme();
    const {appTheme, navTheme} = makeTheme(colorScheme);

    return (
        <PaperProvider theme={appTheme}>
            <SafeAreaProvider>
                <ThemeProvider value={navTheme}>
                    <AppNav/>
                </ThemeProvider>
            </SafeAreaProvider>
        </PaperProvider>
    );
}

function AppNav() {
    return (
        <MaterialStack screenOptions={{
            header: (props) => <MaterialNavBar {...props}/>
        }}>
            <MaterialStack.Screen name="(tabs)" options={{headerShown: false}}/>
        </MaterialStack>
    );
}
