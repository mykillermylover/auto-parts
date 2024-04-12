import {Flex} from 'react-native-flex-layout';
import {Button} from 'react-native-paper';
import {Link} from 'expo-router';
import React from 'react';

export default function SettingsTab() {
    return (
        <Flex fill center>
            <Link href={{pathname: './((auth))/login.component', params: { name: 'Login'} }}>
                <Button mode='elevated'>Login Form</Button>
            </Link>
        </Flex>
    );
}
