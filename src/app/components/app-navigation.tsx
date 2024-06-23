import { useSelector } from 'react-redux';
import UserSelectors from '@store/user/user.selectors';
import { MaterialStack } from '@shared/components/navigation/material-stack';
import { MaterialNavBar } from '@shared/components/navigation/material-navbar';
import React from 'react';
import InitSelectors from '@store/init/init.selectors';
import { MaterialActivityIndicator } from '@shared/components/material-activity-indicator';

export default function AppNav() {
    const isAuth = useSelector(UserSelectors.isAuth);
    const isInit = useSelector(InitSelectors.getInitSelector);

    if(!isInit) return (
        <MaterialActivityIndicator elevation={3} />
    );

    return (
        <MaterialStack
            screenOptions={{
                header: (props) => <MaterialNavBar {...props}/>,
                headerShown: false
            }}
        >
            <MaterialStack.Screen name='(auth)' redirect={isAuth}/>
            <MaterialStack.Screen name='(tabs)' redirect={!isAuth}/>
        </MaterialStack>
    );
}
