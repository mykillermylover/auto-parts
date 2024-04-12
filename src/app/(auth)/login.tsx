import React from 'react';
import { StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {VStack} from 'react-native-flex-layout';
import LoginForm from '@components/LoginForm';
import {AuthChangeScreenButton} from '@components/AuthChangeScreenButton';

export default function LoginComponent() {

    return (
        <SafeAreaView style={style.h100}>
            <VStack style={style.flexContainer}>
                <LoginForm/>
            </VStack>

            <AuthChangeScreenButton type={'login'}/>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    flexContainer: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 30
    },
    h100: {
        height: '100%',
    }
});
