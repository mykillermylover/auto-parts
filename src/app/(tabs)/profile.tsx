import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Button, Card, Text} from 'react-native-paper';
import {Flex, VStack} from 'react-native-flex-layout';
import {useAppDispatch, useAppSelector} from '@shared/hooks';

import UserSelectors from '@store/user/user.selectors';
import {LoginAndPassword} from '@shared/types/login-and-password.type';
import {SecureStoreService} from '@services/secure-store.service';
import {useLogoutMutation} from '@store/query/user/user.api';

export default function ProfileComponent() {
    const user = useAppSelector(UserSelectors.getUser);
    const [abcpData, setAbcpData] = useState<LoginAndPassword | null>(null);
    const [laximoData, setLaximoData] = useState<LoginAndPassword | null>(null);
    const [logout, { isLoading}] = useLogoutMutation();

    useEffect(() => {
        SecureStoreService.getAdminData()
            .then(({abcp, laximo}) => {
                setAbcpData(abcp);
                setLaximoData(laximo);
            });
    }, []);

    if(isLoading) return (
        <Flex fill center>
            <ActivityIndicator size='large'/>
        </Flex>
    );

    return (
        <VStack fill justify='center' mh={20} spacing={30}>
            <Text>Profile</Text>
            <Card>
                <Card.Title titleVariant='headlineLarge' title={`Привет, ${user?.name}!`} />
                <Card.Content>
                    <Text>Email: {user?.email}</Text>
                    <Text>Code: {user?.code}</Text>
                    <Text>Mobile: {user?.mobile}</Text>
                    <Text>Organization: {user?.organization}</Text>
                </Card.Content>
                <Card.Content>
                    <Text>AbcpData: {JSON.stringify(abcpData, null, 2)}</Text>
                    <Text>LaximoData: {JSON.stringify(laximoData, null, 2)}</Text>
                </Card.Content>
            </Card>
            <Button onPress={logout} mode='contained'>Выйти</Button>
        </VStack>
    );
}
