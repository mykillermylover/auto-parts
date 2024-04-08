import {OrderCartProp} from '@services/api/orders/props/order-cart.prop';
import {OrderPositionModel} from '@shared/models/order-position.model';

export type OrderInstantProp = Omit<OrderCartProp, 'positionIds'> & {
    positions: OrderPositionModel[];
}
