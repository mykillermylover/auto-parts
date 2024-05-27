import { ItemModel } from '@shared/models/item.model';
import { APP_MARGIN } from '@shared/consts/app.const';
import { VStack } from 'react-native-flex-layout';
import { ArticleCardCover } from '@components/article/article-card-cover';
import { Text } from 'react-native-paper';
import React from 'react';

interface MinimizedOrderPositionProps {
    images: string[],
    item: ItemModel,
    imageSize: number
}

export const MinimizedOrderPosition = ({ images, item, imageSize }: MinimizedOrderPositionProps) => {

    return (
        <VStack p={APP_MARGIN}>
            <ArticleCardCover images={images} width={imageSize} height={imageSize} />
            {!images.length &&
                <VStack fill center position='absolute' top={imageSize / 2 - APP_MARGIN} self='center'>
                    <Text style={{ color: 'rgb(40,40,40)' }} variant='labelMedium'>{item.brand}</Text>
                    <Text style={{ color: 'rgb(40,40,40)' }} variant='labelSmall'>{item.number}</Text>
                </VStack>
            }
        </VStack>
    )
}