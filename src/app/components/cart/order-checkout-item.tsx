import React from 'react';
import { Text } from 'react-native-paper';
import { VStack } from 'react-native-flex-layout';
import { APP_MARGIN } from '@shared/consts/app.const';
import { CartContentMeta } from '@shared/types/cart-content-meta';
import { ArticleCardCover } from '@components/article/article-card-cover';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';

interface CartItemProps {
    item: CartContentMeta
}

const carouselWidth = SCREEN_WIDTH / 4 - 3 * APP_MARGIN;
const carouselHeight = SCREEN_WIDTH / 4 - 3 * APP_MARGIN;

export const OrderCheckoutItem = (
    {
        item: {
            images,
            brand,
            number,
            quantity
        }
    }: CartItemProps) => {

    return (
        <VStack center>
            <ArticleCardCover
                images={images}
                width={carouselWidth}
                height={carouselHeight}
            />
            <Text variant='labelLarge'>{brand}</Text>
            <Text variant='labelSmall'>{number}</Text>
            <Text
                variant='labelSmall'
                style={{
                    position: 'absolute',
                    left: APP_MARGIN / 2,
                    top: APP_MARGIN / 2,
                    color: 'rgb(40,40,40)'
                }}
            >{quantity} шт.</Text>
        </VStack>
    )
}