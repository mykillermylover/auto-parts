import {OrderPositionResponse} from '@services/api/orders/response/order-position.response';

export type OrderResponse = {
    number: number;
    status: string;
    statusId: number;
    statusCode: string;
    positionQuantity: number;
    sum: number;
    date: string;
    comment: string;
    wholeOrderOnly: 0 | 1;
    positions: OrderPositionResponse[];
}
