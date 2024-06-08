import React, { useCallback, useMemo } from 'react';
import { APP_MARGIN } from '@shared/consts/app.const';
import { Text, useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { getNoun } from '@shared/features/get-noun';
import { HStack, VStack } from 'react-native-flex-layout';
import { OrderCheckoutLink } from '@components/cart/order-checkout-link';
import { ShadowedView, shadowStyle } from 'react-native-fast-shadow';
import { useAppSelector } from '@shared/hooks';
import CartSelectors from '@store/cart/cart.selectors';

export const CartFooter = () => {

    const order = useAppSelector(CartSelectors.getCurrentOrder);

    const itemsNumber = useMemo(() => order.reduce((prev, curr) => prev + +curr.quantity, 0), [order])
    const total = useMemo(() => order.reduce((prev, curr) => prev + curr.quantity * curr.price, 0), [order])

    const getPositionsNoun = useCallback((items: number) => {
        const left = getNoun('Будет заказан', 'Будут заказаны', 'Будут заказаны', items);
        const right = getNoun('товар', 'товара', 'товаров', items);

        return `${left} ${items} ${right}`;
    }
    , [itemsNumber]);

    const theme = useTheme();

    return (
        <ShadowedView
            style={shadowStyle({
                opacity: 0.3,
                radius: 8,
                offset: [0, 0]
            })}
        >
            <View
                style={[styles.surface, {
                    backgroundColor: theme.colors.elevation.level4
                }]}
            >
                <HStack w={'100%'} justify='between' items='center'>
                    <VStack>
                        <Text>{getPositionsNoun(itemsNumber)}</Text>
                        <Text>
                            На сумму <Text variant='titleMedium'>{total} руб.</Text>
                        </Text>
                    </VStack>

                    <OrderCheckoutLink />
                </HStack>
            </View>
        </ShadowedView>
    )
}

const styles = StyleSheet.create({
    surface: {
        paddingVertical: APP_MARGIN,
        paddingHorizontal: APP_MARGIN * 2,
        width: '100%',
        alignItems: 'flex-end',
    }
})