import {useSelector} from 'react-redux';
import UserSelectors from '@store/user/user.selectors';
import {MaterialStack} from '@shared/components/material-stack';
import {MaterialNavBar} from '@shared/components/material-navbar';
import React from 'react';
import InitSelectors from '@store/init/init.selectors';
import {ActivityIndicator, useTheme} from 'react-native-paper';
import {Flex} from 'react-native-flex-layout';

export default function AppNav() {
    const isAuth = useSelector(UserSelectors.isAuth);
    const isInit = useSelector(InitSelectors.getInitSelector);
    const theme = useTheme();

    if(!isInit) return (
        <Flex fill center>
            <ActivityIndicator theme={theme} size='large'/>
        </Flex>
    );

    return (
        <MaterialStack
            screenOptions={{
                header: (props) => <MaterialNavBar {...props}/>,
            }}
        >
            <MaterialStack.Screen name='(auth)' options={{headerShown: false}} redirect={isAuth}/>
            <MaterialStack.Screen name="(tabs)" options={{headerShown: false}} redirect={!isAuth}/>
        </MaterialStack>
    );
}
