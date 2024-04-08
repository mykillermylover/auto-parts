import {OrderCartProp} from '@services/api/orders/props/order-cart.prop';
import HttpClient from '../../../httpClient';
import {OrdersConstants} from '@consts';
import {OrderCartResponse} from '@services/api/orders/response/order-cart.response';
import {OrderInstantProp} from '@services/api/orders/props/order-instant.prop';
import {OrderStatusesResponse} from '@services/api/orders/response/order-statuses.response';
import {OrderListResponse} from '@services/api/orders/response/order-list.response';
import {OrdersResponse} from '@services/api/orders/response/orders.response';

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
    async orderInstant(order: OrderInstantProp) {
        const { data } = await this.http.post<OrderCartResponse>(`${this.url}/instant`, null,
            {
                params: {
                    ...order
                }
            });
        return data;
    }
    async orderStatuses() {
        const { data } = await this.http.get<OrderStatusesResponse>(`${this.url}/statuses`);
        return data;
    }

    /**
     *
     * @param orders - список номеров заказов
     */
    async orderList(orders: number[]) {
        const { data } = await this.http.get<OrderListResponse>(`${this.url}/list`,
            {
                params: {
                    orders
                }
            });
        return data;
    }

    /**
     *
     * @param format - формат вывода результата.
     * По умолчанию отображается информация только по заказам.
     * При значении **'p'** - к заказам добавляется информация по всем позициям.
     * @param skip - кол-во заказов, которые нужно пропустить. По умолчанию - **0**.
     * @param limit - кол-во заказов, которые нужно отобразить за один раз.
     * Допускается любое значение от **1** до **1000**.
     * *По умолчанию - **100**.*
     */
    async orders(
        format= OrdersConstants.detailedFormat,
        skip = OrdersConstants.ordersSkipNumber,
        limit = OrdersConstants.ordersShownLimit
    ){
        if (skip && skip < 0) skip = 0;
        if (limit) {
            if (limit < 1) limit = 100;
            else if (limit > 1000) limit = 1000;
        }

        const { data } = await this.http.get<OrdersResponse>(`${this.url}`,
            {
                params: {
                    format,
                    skip,
                    limit
                }
            });

        return data;
    }

    /**
     *
     * @param positionId - Идентификатор позиции заказа
     * @return data {message: string} - сообщение об успешном запросе на отмену в поле message либо сообщение об ошибке
     */
    async orderCancelPosition(positionId: number) {
        const { data } = await this.http.post<{message: string}>(`${this.url}/cancelPosition`, null,
            {
                params: {
                    positionId
                }
            });
        return data;
    }
    async orderSystemVersion() {
        const { data } = await this.http.get<1 | 2>(`${this.url}/version`);
        return data;
    }
}
