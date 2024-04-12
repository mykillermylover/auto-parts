import {Appbar} from 'react-native-paper';
import {getHeaderTitle} from '@react-navigation/elements';
import {StackHeaderProps} from '@react-navigation/stack';
import React from 'react';
type RouteParams = {
    name: string;
    back: boolean;
}
export default function MaterialNavBar({navigation, route, options, back}: StackHeaderProps) {
    const routeParams = route.params as RouteParams;
    const title = getHeaderTitle(options, routeParams?.name ?? route.name);

    const backArrow = back && routeParams.back;

    return (
        <Appbar.Header>
            {backArrow ? <Appbar.BackAction onPress={navigation.goBack}/> : null}
            <Appbar.Content title={title}/>
        </Appbar.Header>
    );
}
