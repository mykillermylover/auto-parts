import React, {useEffect, useState} from 'react';
import {Flex} from 'react-native-flex-layout';
import {Card, HelperText, Text} from 'react-native-paper';
import {MaterialSearchNavBar} from '@shared/components/material-search-navbar';
import {useTipsQuery} from '@store/query/search/search.api';
import {SearchTip} from '@store/query/search/responses/tips.response';
import {FlashList} from '@shopify/flash-list';
import {View} from 'react-native';
import {useDebounce} from 'use-debounce';

export default function FirstHomeTab() {
    const [searchText, setSearchText] = useState('');
    const [throttledSearchText] = useDebounce(searchText, 300);

    const [searchResults, setSearchResults] = useState<SearchTip[]>([]);

    const {data, error, isLoading} = useTipsQuery(throttledSearchText);

    useEffect(() => {
        if (data) setSearchResults(data);
        else setSearchResults([]);
        if (error) setSearchResults([]);
    }, [data, error]);

    return (
        <>
            <MaterialSearchNavBar isLoading={isLoading} value={searchText} onChangeText={setSearchText}/>
            <View
                style={{height: 300, position: 'absolute', width: '100%', top: 90, zIndex: 1}}
            >
                <FlashList
                    ListEmptyComponent={!error ? <HelperText type={'info'}><Text>Нет результатов</Text></HelperText> : null}
                    estimatedItemSize={50}
                    data={searchResults}
                    renderItem={({item, index}) => {
                        return (
                            <Card key={index}>
                                <Card.Title title={item.brand}/>
                                <Card.Content>
                                    <Text>{item.number}</Text>
                                    <Text>{item.description}</Text>
                                </Card.Content>
                            </Card>
                        );
                    }}
                />
            </View>

            <Flex fill center >
                <Text>search: {searchText}</Text>
            </Flex>
        </>
    );
}
