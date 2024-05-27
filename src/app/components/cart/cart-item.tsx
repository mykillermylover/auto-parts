import React, { useCallback, useEffect, useState } from 'react';
import { Card, Checkbox, Divider, HelperText, Icon, IconButton, Text, useTheme } from 'react-native-paper';
import { ArticleCardCover } from '@components/article/article-card-cover';
import { APP_MARGIN } from '@shared/consts/app.const';
import { formatDeadline } from '@shared/features/format-deadline';
import { HStack, VStack } from 'react-native-flex-layout';
import { QuantityButtons } from '@shared/components/inputs/quantity-buttons';
import { StyleSheet, View } from 'react-native';
import { CartContentWithMeta } from '@shared/types/cart-content-with-meta';
import { CartContentMeta } from '@shared/types/cart-content-meta';
import { useCartAddItemsMutation } from '@store/query/cart/cart.api';
import { ToastService } from '@services/toast.service';
import { AsyncStorageService } from '@services/async-storage.service';

interface CartItemProps {
    item: CartContentWithMeta,
    onChange: (item: CartContentWithMeta) => void,
}

export const CartItem = (
    {
        item,
        onChange
    }: CartItemProps) => {
    const {
        quantity,
        brand,
        number,
        description,
        deadline,
        deadlineMax,
        price,
        packing,
        comment,
        errorMessage,
        images,
        checked,
        availability,
    } = item;
    const [addItem] = useCartAddItemsMutation();
    const [quantityText, setQuantityText] = useState(quantity.toString());
    const { colors } = useTheme();

    useEffect(() => {
        setQuantityText(quantity.toString());
    }, [item]);

    const handleChange = (newItem: Partial<CartContentMeta>) => {
        onChange({
            ...item,
            images,
            checked,
            availability,
            ...newItem
        });
    }
    const deleteItem = useCallback(async () => {
        try {
            const result = await addItem([{
                ...item,
                quantity: 0
            }]).unwrap();

            if (result.status === 1) {
                void AsyncStorageService.remove(item.positionId.toString());
                ToastService.success(`Позиция ${brand} ${number} удалена`);
            } else {
                ToastService.error('Не удалось удалить позицию')
            }
        } catch (e) {
            ToastService.error((e as Error).message);
        }
    }, [item]);

    return (
        <Card style={styles.card}>

            <HStack fill spacing={APP_MARGIN * 2}>

                <HStack center spacing={APP_MARGIN} mv={APP_MARGIN}>
                    <View>
                        <Checkbox
                            onPress={() => handleChange({ checked: !checked })}
                            status={checked ? 'checked' : 'unchecked'}/>
                    </View>
                    <ArticleCardCover images={images} width={100} height={100}/>
                </HStack>

                <VStack fill mv={APP_MARGIN} spacing={APP_MARGIN}>
                    <VStack>
                        <Text variant='titleMedium'>{brand}</Text>
                        <Text variant='titleMedium'>{number}</Text>
                    </VStack>

                    <Text>{description}</Text>
                </VStack>

            </HStack>

            <Divider style={styles.divider}/>

            <HStack mh={APP_MARGIN} justify='between' items='center' spacing={APP_MARGIN * 2}>
                <HStack spacing={APP_MARGIN * 2} items='center' justify='start' fill>
                    <Text>{formatDeadline(deadline, deadlineMax)}</Text>
                    <VStack>
                        <Text variant='labelSmall'>{price} руб./шт.</Text>
                        <Text variant='titleMedium'>{price * quantity} руб.</Text>
                    </VStack>
                </HStack>

                <QuantityButtons
                    input={quantityText}
                    oninput={setQuantityText}
                    maxQuantity={availability || quantity}
                    quantityMultiplier={packing || 1}
                    value={quantity}
                    setValue={(quantity) => handleChange({ quantity })}
                />
            </HStack>

            {comment &&
                <>
                    <Text>Комментарий:</Text>
                    <Text>{comment}</Text>
                </>
            }

            {errorMessage &&
                <HelperText
                    type={'error'}
                >
                    Цена или наличие позиции устарела.
                </HelperText>
            }
            <IconButton
                iconColor={colors.error}
                icon={'delete'}
                size={16}
                style={styles.delete}
                onPress={deleteItem}
            />
        </Card>
    )
}

const styles = StyleSheet.create({
    divider: {
        marginHorizontal: APP_MARGIN,
        marginBottom: APP_MARGIN
    },
    card: {
        marginTop: APP_MARGIN,
        padding: APP_MARGIN
    },
    delete: {
        position: 'absolute',
        right: 0,
        top: 0
    }
})