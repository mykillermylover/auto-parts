import React, { useEffect, useState } from 'react';
import { Button, Text } from 'react-native-paper';
import { Flex } from 'react-native-flex-layout';
import { AsyncStorageService } from '@services/async-storage.service';

export default function GarageComponent() {

    const [keys, setKeys] = useState('NO DATA...');

    useEffect(() => {
        getKeys()
    }, []);

    const getKeys = () => {
        setKeys('Loading...');
        void AsyncStorageService.getAllKeys()
            .then(value => setKeys(value?.join(', ') || 'NO KEYS :('))
    }
    const clearData = () => {
        void AsyncStorageService.clearStorage()
    }

    return (
        <Flex fill center>
            <Text>Garage</Text>
            <Text>{keys}</Text>
            <Button onPress={getKeys}>Get keys</Button>
            <Button onPress={clearData}>Clear data</Button>
        </Flex>
    );
}
