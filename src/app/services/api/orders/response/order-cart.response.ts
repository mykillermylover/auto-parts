import {StatusResponse} from '@shared/responses/status.response';
import {OrderResponse} from '@services/api/orders/response/order.response';

export type OrderCartResponse = StatusResponse & {
    clientOrderNumber: number;
    orders: OrderResponse[];
};
