import { ActivityIndicator, Surface, useTheme } from 'react-native-paper';
import React from 'react';

export const MaterialActivityIndicator = () => {
    const theme = useTheme();
    return (
        <Surface
            style={{
                flex: 1,
                justifyContent: 'center'
            }}
            theme={theme}
        >
            <ActivityIndicator theme={theme} size='large'/>
        </Surface>
    );
}