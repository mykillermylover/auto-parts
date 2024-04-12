import 'react-native-gesture-handler';
import {ActivityIndicator, PaperProvider} from 'react-native-paper';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {ThemeProvider} from '@react-navigation/native';
import MaterialStack from '@shared/components/material-stack';
import React from 'react';
import MaterialNavBar from './shared/components/material-navbar';
import {Provider, useSelector} from 'react-redux';
import store from './store/app.store';
import useAppTheme from '@shared/hooks/useAppTheme';
import InitApp from '@init';
import UserSelectors from '@store/user/user.selectors';
import InitSelectors from '@store/init/init.selectors';
import {Flex} from 'react-native-flex-layout';

InitApp();

export default function AppLayout() {
    const [appTheme, navTheme] = useAppTheme();

    return (
        <Provider store={store}>
            <PaperProvider theme={appTheme}>
                <SafeAreaProvider>
                    <ThemeProvider value={navTheme}>
                        <AppNav/>
                    </ThemeProvider>
                </SafeAreaProvider>
            </PaperProvider>
        </Provider>
    );
}

function AppNav() {
    const isInit = useSelector(InitSelectors.getInitSelector);
    const isAuth = useSelector(UserSelectors.isAuth);

    if (!isInit) return (
        <Flex fill center>
            <ActivityIndicator size='large'/>
        </Flex>
    );

    return (
        <MaterialStack screenOptions={{
            header: (props) => <MaterialNavBar {...props}/>
        }}>
            <MaterialStack.Screen name='(auth)' options={{headerShown: false}} redirect={isAuth}/>
            <MaterialStack.Screen name="(tabs)" options={{headerShown: false}} redirect={!isAuth}/>
        </MaterialStack>
    );
}
