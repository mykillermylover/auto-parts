import {CartPrepareItemModel} from './cart-prepare-item.model';

export type CartChangeItemModel = CartPrepareItemModel & {
    quantity: number;
    comment: string;
}
