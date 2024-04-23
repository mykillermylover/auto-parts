import React from 'react';
import {useSearchArticlesQuery} from '@store/query/search/search.api';
import {ActivityIndicator, Card, Divider, Text} from 'react-native-paper';
import {Flex} from 'react-native-flex-layout';
import {useLocalSearchParams} from 'expo-router';
import {FlashList} from '@shopify/flash-list';
import {ItemModel} from '@shared/models/item.model';
import {AnimatedSearch} from '@shared/components/search/animated-search';

export default function Article() {
    const params = useLocalSearchParams();

    const item: ItemModel = {
        brand: params.brand,
        number: params.number
    };

    const {currentData: data = [], isLoading, isFetching, refetch} = useSearchArticlesQuery(item);
    // const errorText = error ?? ResponseService.getErrorMessage(error as NetworkError);

    if(isLoading) {
        return (
            <Flex fill center>
                <ActivityIndicator size='large' />
            </Flex>
        );
    }

    return (
        <Flex fill mh={16} mt={16}>
            <AnimatedSearch />
            {/*{!!error && <HelperText type='error'>{errorText}</HelperText>}*/}
            <FlashList
                estimatedItemSize={100}
                onRefresh={refetch}
                refreshing={isFetching}
                numColumns={2}
                data={data}
                renderItem={({item, index}) => {
                    return (
                        <Card style={{width: '90%' , margin: 10}}>
                            <Card.Cover source={{uri: `https://source.unsplash.com/random/200x200?sig=${index}`}}/>
                            <Card.Title title={item.brand} subtitle={item.numberFix} />
                            <Card.Content>
                                <Text>{item.description}</Text>
                                <Divider />
                                <Text>Цена: {item.price}</Text>
                            </Card.Content>
                        </Card>
                    );
                }}

            />
        </Flex>
    );
}
