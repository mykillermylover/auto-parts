import HttpClient from '../../../httpClient';
import {CartListResponse} from './responses/carts-list.response';
import {CartChangeItemModel} from '../../../shared/models/cart-change-item.model';
import {PositionsResponse} from './responses/positions.response';
import {StatusResponse} from '../../../shared/responses/status.response';
import {CartContentResponse} from './responses/cart-content.response';
import {CartOptionsResponse} from './responses/options.response';

export class CartService {
    private http = HttpClient;
    private url = '/basket';

    async cartList() {
        const response = await this.http.get<CartListResponse>(`${this.url}/multibasket`);

        return response.data;
    }

    async cartAddItems(positions: CartChangeItemModel[]) {
        const response = await this.http.post<PositionsResponse>(`${this.url}/add`, null,
            {
                params: {
                    positions
                }
            });

        return response.data;
    }

    async cartDeleteItems(positions: CartChangeItemModel[]) {
        if (!positions.every(position => position.quantity <= 0)) return {} as PositionsResponse;

        return this.cartAddItems(positions);
    }

    async cartChangeQuantity(position: CartChangeItemModel) {
        return this.cartDeleteItems([{...position, quantity: 0}])
            .then(() => this.cartAddItems([position]));
    }

    async cartClear() {
        const response = await this.http.post<StatusResponse>(`${this.url}/clear`);

        return response.data;
    }

    async cartContent() {
        const response = await this.http.get<CartContentResponse>(`${this.url}/content`);

        return response.data;
    }

    async cartOptions() {
        const response = await this.http.get<CartOptionsResponse>(`${this.url}/options`);

        return response.data;
    }
}
