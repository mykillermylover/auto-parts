import {OrderListItem} from '@services/api/orders/response/order-list.response';
import {OrderPositionResponse} from '@services/api/orders/response/order-position.response';

export type OrdersResponse = {
    count: number;
    items: OrderResponse[];
}

export type OrderResponse = Omit<OrderListItem, 'statusId' | 'positions'> & {
    // Долг по оплате заказа
    debt: number;
    positions: OrdersPosition[];
}
export type OrdersPosition = Omit<OrderPositionResponse, 'statusId' | 'positionId' > & {
    // Заказываемое количество
    quantityOrdered: number;
}
