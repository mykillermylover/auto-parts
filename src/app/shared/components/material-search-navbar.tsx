import {Appbar} from 'react-native-paper';
import React from 'react';
import {Searchbar} from 'react-native-paper';

type MaterialSearchNavbarParams = {value: string, onChangeText: (value: string) => void, isLoading: boolean}

export function MaterialSearchNavBar({value, onChangeText, isLoading}: MaterialSearchNavbarParams) {

    return (
        <Appbar.Header elevated={true}>
            <Appbar.Content
                title={<Searchbar
                    placeholder={'Поиск'}
                    loading={isLoading}
                    value={value}
                    onChangeText={onChangeText}
                />}
            />
        </Appbar.Header>
    );
}
