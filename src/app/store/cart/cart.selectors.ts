import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store/store.type';

const getCartItemsSelector = ({ cart }: RootState) => {
    return cart.cartItems
}

const CartSelectors = {
    getCart: getCartItemsSelector,
    getCurrentOrder: createSelector(getCartItemsSelector, result => result.filter(item => item.checked)),
    getItem: (id: number) => ({ cart }: RootState) => {
        return cart.cartItems.find(item => item.positionId === id);
    },
    isUpdating: ({ cart }: RootState) => {
        return cart.updating;
    }
}

export default CartSelectors;