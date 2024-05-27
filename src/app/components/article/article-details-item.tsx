import { Card, CardProps, Divider, Text } from 'react-native-paper';
import { QuantitySegmentedButtons } from '@shared/components/inputs/quantity-segmented-buttons';
import React, { useMemo } from 'react';
import { SearchArticle } from '@store/query/search/responses/articles.response';
import { formatDeadline } from '@shared/features/format-deadline';

interface ArticleDetailProps {
    item: SearchArticle;
    handleAddToCart: (item: SearchArticle, quantity: number) => void;
    cardStyle?: CardProps['style']
}

export const ArticleDetailsItem = ({ item, handleAddToCart, cardStyle }: ArticleDetailProps) => {

    const formattedDate = useMemo(() => {
        return formatDeadline(item.deliveryPeriod, item.deliveryPeriodMax)
    }, []);

    return (
        <Card style={cardStyle}>
            <Card.Title
                title={item.brand}
                subtitle={item.number}
            />
            <Card.Content>
                <Text variant='bodyMedium'>{item.description}</Text>
                <Divider/>
                <Text variant={'headlineSmall'}>{item.price} руб.</Text>
                <Text>Ожидаемый срок: {formattedDate}.</Text>
            </Card.Content>
            <Card.Actions>
                <QuantitySegmentedButtons
                    maxQuantity={item.availability}
                    onSubmit={(quantity) => {
                        void handleAddToCart(item, quantity);
                    }}
                    quantityMultiplier={item.packing || 1}
                />
            </Card.Actions>
        </Card>
    )
}