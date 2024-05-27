import React, { useEffect, useMemo, useState } from 'react';
import { Text, useTheme } from 'react-native-paper';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { CartContentMeta } from '@shared/types/cart-content-meta';
import { OrdersPosition } from '@store/query/orders/response/orders.response';
import { ArticleCardCover } from '@components/article/article-card-cover';
import { HStack, VStack } from 'react-native-flex-layout';
import { APP_MARGIN } from '@shared/consts/app.const';
import { MinimizedOrderPosition } from '@components/orders/minimized-order-position';


interface OrderInfoProp {
    position: OrdersPosition,
    minimize?: boolean,
    imageSize: number
}

export const OrderPositionInfo = ({ position, minimize = false, imageSize }: OrderInfoProp) => {

    const { colors } = useTheme();

    const defaultData: CartContentMeta = useMemo(() => {
        return {
            availability: 0,
            checked: true,
            images: [],
            packing: 0,
            ...position
        }
    }, [position.positionId]);

    const [data, setData] = useState<CartContentMeta>(defaultData);

    const { getItem } = useAsyncStorage(position.positionId.toString());

    useEffect(() => {
        void getItem()
            .then(value => {
                if (value) {
                    const parsedValue = JSON.parse(value) as CartContentMeta;
                    setData(parsedValue);
                }
            })
    }, [position.positionId]);

    if (minimize) return <MinimizedOrderPosition imageSize={imageSize} item={position} images={data.images} />

    const priceString = `${(+position.price).toLocaleString('ru')} ₽`;
    const totalString = `${(position.price * position.quantityOrdered).toLocaleString('ru')} ₽`;

    return (
        <VStack p={APP_MARGIN}>
            <HStack fill spacing={APP_MARGIN} items='center'>
                <ArticleCardCover images={data.images} width={imageSize} height={imageSize} />
                <VStack fill spacing={APP_MARGIN}>
                    <HStack fill justify='between'>
                        <VStack>
                            <Text>{data.brand}</Text>
                            <Text>{data.number}</Text>
                        </VStack>
                        <VStack items='end'>
                            <Text>{position.status}</Text>
                            <HStack spacing={APP_MARGIN} items='end'>
                                <Text
                                    style={{ color: colors.outline }}
                                    variant={'labelSmall'}
                                >
                                    {position.quantityOrdered} x {priceString}
                                </Text>
                                <Text>{totalString}</Text>
                            </HStack>
                        </VStack>
                        {position.comment && <Text>{position.comment}</Text>}
                    </HStack>
                    <Text>{position.description}</Text>
                </VStack>
            </HStack>
        </VStack>
    )
}