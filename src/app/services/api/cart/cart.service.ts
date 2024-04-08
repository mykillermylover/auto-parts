import HttpClient from '../../../httpClient';
import {CartListResponse} from './responses/carts-list.response';
import {OrderPositionModel} from '@shared/models/order-position.model';
import {PositionsResponse} from './responses/positions.response';
import {StatusResponse} from '@shared/responses/status.response';
import {CartContentResponse} from './responses/cart-content.response';
import {CartOptionsResponse} from './responses/options.response';
import {CartDataItemResponse} from './responses/cart-data-item.response';
import {ShipmentDatesResponse} from './responses/shipment-dates.response';

export class CartService {
    private http = HttpClient;
    private url = '/basket';

    async cartList() {
        const { data } = await this.http.get<CartListResponse>(`${this.url}/multibasket`);

        return data;
    }

    async cartAddItems(positions: OrderPositionModel[]) {
        const { data } = await this.http.post<PositionsResponse>(`${this.url}/add`, null,
            {
                params: {
                    positions
                }
            });

        return data;
    }

    async cartDeleteItems(positions: OrderPositionModel[]) {
        if (!positions.every(position => position.quantity <= 0)) return {} as PositionsResponse;

        return this.cartAddItems(positions);
    }

    async cartChangeQuantity(position: OrderPositionModel) {
        return this.cartDeleteItems([{...position, quantity: 0}])
            .then(() => this.cartAddItems([position]));
    }

    async cartClear() {
        const { data } = await this.http.post<StatusResponse>(`${this.url}/clear`);

        return data;
    }

    async cartContent() {
        const {data} = await this.http.get<CartContentResponse>(`${this.url}/content`);

        return data;
    }

    async cartOptions() {
        const {data} = await this.http.get<CartOptionsResponse>(`${this.url}/options`);

        return data;
    }

    async cartPaymentMethods() {
        const { data } = await this.http.get<CartDataItemResponse>(`${this.url}/paymentMethods`);
        return data;
    }

    async cartShipmentMethods() {
        const { data } = await this.http.get<CartDataItemResponse>(`${this.url}/shipmentMethods`);
        return data;
    }
    async cartShipmentOffices() {
        const { data } = await this.http.get<CartDataItemResponse>(`${this.url}/shipmentOffices`);
        return data;
    }
    async cartShipmentAddresses() {
        const { data } = await this.http.get<CartDataItemResponse>(`${this.url}/shipmentAddresses`);
        return data;
    }

    /**
     * @param minDeadlineTime - Минимальный срок поставки, в часах, среди всех позиций, которые собрались отправлять в заказ.
     *
     * @param maxDeadlineTime - Максимальный срок поставки, в часах, среди всех позиций, которые собрались отправлять в заказ.
     */
    async cartShipmentDates(minDeadlineTime: string, maxDeadlineTime: string) {
        const { data } = await this.http.get<ShipmentDatesResponse>(`${this.url}/shipmentDates`,
            {
                params: {
                    minDeadlineTime,
                    maxDeadlineTime
                }
            });
        return data;
    }

    /**
     *
     * @param address - Строка с адресом
     * @return Идентификатор адреса доставки. Используется при отправке корзины в заказ.
     */
    async cartAddShipmentAddress(address: string) {
        const { data } = await this.http.post<number>(`${this.url}/shipmentAddress`, null,
            {
                params: {
                    address
                }
            });
        return data;
    }


}
