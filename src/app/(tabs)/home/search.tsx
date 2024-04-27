import React, {useEffect} from 'react';
import {Flex} from 'react-native-flex-layout';
import {Card, Text} from 'react-native-paper';
import {ItemModel} from '@shared/models/item.model';
import {useLocalSearchParams} from 'expo-router';
import {FlashList} from '@shopify/flash-list';
import {useArticleInfoQuery} from '@store/query/local/local.api';
import {useSearchAddToHistoryMutation} from '@store/query/search/search.api';
import Carousel from 'react-native-reanimated-carousel/src/Carousel';
import {Dimensions} from 'react-native';

export default function Search() {
    const item: ItemModel = useLocalSearchParams<{ brand: string, number: string }>();

    const { data = {crosses: []}, refetch, isFetching } = useArticleInfoQuery(item);
    const [addToHistory] = useSearchAddToHistoryMutation();

    useEffect(() => {
        addToHistory(item);
    }, []);

    return (
        <Flex fill>
            <FlashList
                onRefresh={refetch}
                refreshing={isFetching}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                }}
                data={data.crosses}
                renderItem={({item}) => {
                    return (
                        <Card style={{marginVertical: 16}}>
                            {item.images &&
                                <Carousel
                                    loop={false}
                                    vertical={false}
                                    width={Dimensions.get('screen').width - 32}
                                    height={200}
                                    renderItem={({item}) => {
                                        return (
                                            <Card.Cover resizeMode={'contain'} source={{uri: item}}/>
                                        );
                                    }}
                                    data={item.images.map(image =>
                                        `https://pubimg.nodacdn.net/images/full/${image.name}`
                                    )}
                                />
                            }
                            <Card.Title title={item.brand} subtitle={item.number} />
                            <Card.Content>
                                <Text>
                                    {item.reliable ? 'RELIABLE' : 'NOT RELIABLE'}
                                </Text>
                            </Card.Content>
                        </Card>
                    );
                }}
            />
        </Flex>
    );
}
