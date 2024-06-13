import appStore from '@store/app.store'
import { AsyncStorageService } from '@services/async-storage.service';
import { CartContentMeta } from '@shared/types/cart-content-meta';
import { CartActions } from '@store/cart/cart.store';

export async function RehydrateCart() {
    const cartItems = await AsyncStorageService.getObject<CartContentMeta[]>('cart');
    appStore.dispatch(CartActions.setCartItems(cartItems || []));
    console.log('[RehydrateCart] cart rehydrated', cartItems?.length ?? 0);
}
export async function RehydrateOrders() {
    const ordersItems = await AsyncStorageService.getObject<CartContentMeta[]>('orders');
    appStore.dispatch(CartActions.setCartItems(ordersItems || []));
    console.log('[RehydrateOrders] orders rehydrated')
}

export async function RehydrateData() {
    return Promise.all([
        RehydrateCart(),
        RehydrateOrders()
    ])
}