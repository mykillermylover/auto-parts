import { AsyncStorageService } from '@services/async-storage.service';
import { CartContentMeta } from '@shared/types/cart-content-meta';
import { CartContentResponse } from '@store/query/cart/responses/cart-content.response';
import { CartContentWithMeta } from '@shared/types/cart-content-with-meta';

export async function assignCartData (data: CartContentResponse[]) {
    const ids = data.map(item => item.positionId.toString());
    const asyncStorageData = await AsyncStorageService.multiGetObjects<CartContentMeta>(ids);
    if(!asyncStorageData) return null;

    const assignedData = data.map((cartItem, index) => {
        const [_sk, storageValue] = asyncStorageData[index];

        const addItem: CartContentWithMeta = {
            ...cartItem,
            availability: storageValue?.availability ?? cartItem.quantity,
            checked: storageValue?.checked ?? true,
            images: storageValue?.images ?? [],
            packing: storageValue?.packing ?? 1
        };

        return addItem;
    });

    const mergeData: [string, CartContentWithMeta][] = assignedData.map(item => [item.positionId.toString(), item]);
    await AsyncStorageService.multiMergeObjects(mergeData);

    return assignedData;
}