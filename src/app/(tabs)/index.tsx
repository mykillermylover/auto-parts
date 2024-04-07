import {useEffect, useState} from 'react';
import {SearchService} from '../services/api/search/search.service';
import {SearchBrand} from '../services/api/search/responses/brands.response';
import {Button, Card, Text} from 'react-native-paper';
import {AxiosError} from 'axios';
import {FlashList} from '@shopify/flash-list';
import React from 'react';

export default function Tab() {
    const [items, setItems] = useState<SearchBrand[]>([]);
    useEffect(() => {
        searchService.searchBrands('01089')
            .then(result => setItems(result))
            .catch((err: AxiosError) => {
                throw err;
            });

    }, []);
    const searchService = new SearchService();

    return (
        <>
            <FlashList
                estimatedItemSize={38}
                data={items}
                renderItem={({item, index}: { item: SearchBrand, index: number }) => (
                    <Card mode='elevated' style={{margin: 10}}>
                        <Card.Cover source={{uri: `https://source.unsplash.com/random/500x500?sig=${index}`}} />
                        <Card.Title title={item.brand}/>
                        <Card.Content>
                            <Text>{item.numberFix}</Text>
                        </Card.Content>
                        <Card.Actions>
                            <Button>Sperm</Button>
                            <Button>Cock</Button>
                        </Card.Actions>
                    </Card>
                )}
            />
        </>
    );
}
