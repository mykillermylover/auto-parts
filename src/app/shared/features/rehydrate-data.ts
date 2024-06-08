import appStore from '@store/app.store'
import { AsyncStorageService } from '@services/async-storage.service';
import { CartContentMeta } from '@shared/types/cart-content-meta';
import { CartActions } from '@store/cart/cart.store';

export async function RehydrateCart() {
    const cartItems = await AsyncStorageService.getObject<CartContentMeta[]>('cart');
    appStore.dispatch(CartActions.setCartItems(cartItems || []));
}
export async function RehydrateOrders() {
    const ordersItems = await AsyncStorageService.getObject<CartContentMeta[]>('orders');
    appStore.dispatch(CartActions.setCartItems(ordersItems || []));
}

export async function RehydrateData() {
    return Promise.all([
        RehydrateCart(),
        RehydrateOrders()
    ])
}