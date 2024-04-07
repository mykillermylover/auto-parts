import {OrderCartProp} from '@shared/models/order-cart.prop';
import HttpClient from '../../../httpClient';
import {OrderCartResponse} from '@services/api/orders/response/order-cart.response';

export class OrdersService {
    http = HttpClient;
    url = '/orders';
    async orderCart(orderInfo: OrderCartProp) {
        const { data } = await this.http.post<OrderCartResponse>('/basket/order', null,
            {
                params: {
                    ...orderInfo
                }
            });
        return data;
    }
    async orderInstant() {

    }
}
