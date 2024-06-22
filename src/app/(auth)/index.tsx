import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HStack, VStack } from 'react-native-flex-layout';
import LoginForm from '@components/login-form/login-form.component';
import { Button, Card, Text } from 'react-native-paper';
import { Link } from 'expo-router';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import { logoImage } from '@shared/consts/app.const';

export default function LoginComponent() {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            <HideWithKeyboard>
                <Card.Cover style={{ width: '100%', marginBottom: -150, height: 300, alignSelf: 'center', backgroundColor: 'transparent' }} source={logoImage} resizeMode={'contain'}/>
            </HideWithKeyboard>
            <VStack style={style.flexContainer}>
                <LoginForm onLoading={(value) => setIsLoading(value)}/>
            </VStack>
    
            <HideWithKeyboard>
                <HStack position={'absolute'} bottom={30} w='100%' items={'center'} justify={'evenly'}>
                    <Text>Ещё не зарегистрированы?</Text>
                    <Link href={'/register'}>
                        <Button disabled={isLoading} mode='outlined'>Регистрация</Button>
                    </Link>
                </HStack>
            </HideWithKeyboard>
            <SafeAreaView />
        </>

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
