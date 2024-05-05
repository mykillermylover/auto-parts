import React from 'react';
import {ScrollView} from 'react-native';
import {Button, Card, Text} from 'react-native-paper';
import {useLocalSearchParams} from 'expo-router';

import {ItemModel} from '@shared/models/item.model';
import {useArticleInfoQuery} from "@store/query/local/local.api";
import {FormattedArticleResponse} from "@shared/types/formatted-article.response";
import {FlashList} from "@shopify/flash-list";

export default function Search() {
    const item: ItemModel = useLocalSearchParams<{ brand: string, number: string }>();

    const { data = [] as FormattedArticleResponse[], error, refetch, isFetching } = useArticleInfoQuery(item);

    const imageUrlFull = 'https://pubimg.nodacdn.net/images/full';

    return (
        <ScrollView>
            <Text>
                {!!error && JSON.stringify(error, null, 2)}
            </Text>
            <Text>
                {isFetching && 'LOADING...'}
            </Text>
            <FlashList
                data={data}
                renderItem={({item}) => {
                    return (
                        <Card>
                            {/*<Card.Cover source={{uri: `${imageUrlFull}/${item.fastest}`}}/>*/}
                        </Card>
                    )
                }}
            />
            <Button onPress={refetch}>REFETCH</Button>
        </ScrollView>
    );
}
