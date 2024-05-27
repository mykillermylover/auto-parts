import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CartItem } from '@components/cart/cart-item';
import { KeyboardAvoidingView } from 'react-native';
import { useCartAddItemsMutation, useCartContentQuery, useClearCartMutation } from '@store/query/cart/cart.api';
import { ToastService } from '@services/toast.service';
import { CartHeader } from '@components/cart/cart-header';
import { CartFooter } from '@components/cart/cart-footer';
import { CartEmpty } from '@components/cart/cart-empty';
import { MaterialActivityIndicator } from '@shared/components/material-activity-indicator';
import { assignCartData } from '@shared/features/assign-cart-data';
import { FlashList } from '@shopify/flash-list';
import { AsyncStorageService } from '@services/async-storage.service';
import { CartContentWithMeta } from '@shared/types/cart-content-with-meta';
import { useNavigation } from 'expo-router';

export default function Cart() {
    const navigation = useNavigation();
    const [assignedData, setAssignedData] = useState<CartContentWithMeta[]>([]);

    const { currentData: data = [], isFetching, isLoading, refetch } = useCartContentQuery();
    const [addItems] = useCartAddItemsMutation();
    const [clearCart] = useClearCartMutation();

    const total = useMemo(() => assignedData.reduce(
        (prev, curr) => {
            const add = curr.checked ? curr.price * curr.quantity : 0;
            return prev + add;
        }, 0
    ), [assignedData]);
    const itemsNumber = useMemo(() => assignedData.reduce(
        (prev, curr) => {
            const add = curr.checked ? +curr.quantity : 0;
            return prev + add;
        }, 0
    ), [assignedData])
    const itemIds = useMemo(() =>
        assignedData.map(
            item => item.positionId.toString()
        ), [data, assignedData]);
    const filteredIds = useMemo(() =>
        assignedData.filter(
            item => item.checked).map(item => item.positionId.toString()
        ), [data, assignedData]);

    const clearStorageCartInfo = useCallback(() => AsyncStorageService.multiRemove(itemIds), [assignedData])
    const applyChanges = useCallback(async () => {
        if (!data.length) {
            setAssignedData([]);
            return;
        }
        try {
            console.log('[Cart] applyChanges: start');
            console.log('[Cart] applyChanges: data.length', data.length, 'assignedData.length', assignedData.length);

            const changedItems = assignedData.filter((item, index) => +item.quantity !== +data[index].quantity);
            console.log('[Cart] applyChanges: changedItems.length', changedItems.length);
            if (!changedItems.length) return;

            const deleteItems: CartContentWithMeta[] = changedItems.map(item => {
                return {
                    ...item,
                    quantity: 0
                }
            });
            const deleteKeys = deleteItems.map(item => item.positionId.toString());

            // delete items wanted to change
            await addItems(deleteItems).unwrap();
            // add changed items back
            const result = await addItems(changedItems).unwrap();
            if(result.status === 0)
                ToastService.error(result.errorMessage);

            void AsyncStorageService.multiRemove(deleteKeys);

            const newIds = result.positions.map(item => item.cartPositionId.toString());

            void AsyncStorageService.multiSetObjects(newIds, changedItems.map((item, index) => {
                return {
                    ...item,
                    positionId: newIds[index]
                }
            }))
        } catch(e) {
            ToastService.error((e as Error).message);
        }
    }, [assignedData]);

    useEffect(() => {
        if (data.length) {
            void assignCartData(data)
                .then(result => {
                    console.log('[Cart] got assigned data: result', result?.length || 'no result')
                    result ? setAssignedData(result) : setAssignedData([]);
                })
        }
    }, [data]);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        return navigation.addListener('blur', applyChanges);
    }, [navigation, assignedData]);

    const handleClearCart = async () => {
        try {
            const result = await clearCart().unwrap();

            if (result.status === 1) {
                await clearStorageCartInfo();
                ToastService.success('Корзина очищена');
            } else ToastService.error(result.errorMessage);

        } catch (e) {
            ToastService.error((e as Error).message);
        }
    }

    const handleItemChange = (item: CartContentWithMeta, index: number) => {
        const prevItem = assignedData[index];
        const nextData = [
            ...assignedData.slice(0, index),
            { ...prevItem, ...item },
            ...assignedData.slice(index + 1)
        ];
        setAssignedData(nextData);
        AsyncStorageService.mergeObject(item.positionId.toString(), item);
    }

    if (isLoading || (isFetching && !data.length)) return <MaterialActivityIndicator/>
    if (!data.length) return <CartEmpty/>

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <SafeAreaView/>
            <CartHeader
                itemsNumber={data.length}
                onClear={handleClearCart}
            />

            <FlashList
                estimatedItemSize={280}
                keyExtractor={item => item.positionId.toString()}
                keyboardDismissMode={'on-drag'}
                refreshing={isFetching || isLoading}
                onRefresh={refetch}
                contentContainerStyle={{
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                }}
                data={assignedData}
                renderItem={({ item, index }) =>
                    <CartItem onChange={(value) => handleItemChange(value, index)} item={item}/>
                }
            />
            <CartFooter
                dataIds={filteredIds}
                itemsNumber={itemsNumber}
                total={total}
            />
        </KeyboardAvoidingView>
    )
}