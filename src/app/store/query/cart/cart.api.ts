import {createApi} from '@reduxjs/toolkit/query/react';

import {axiosBaseQuery} from '@store/query/axios.query';
import {CartListResponse} from './responses/carts-list.response';
import {OrderPositionModel} from '@shared/models/order-position.model';
import {PositionsResponse} from './responses/positions.response';
import {StatusResponse} from '@shared/responses/status.response';
import {CartContentResponse} from './responses/cart-content.response';
import {CartOptionsResponse} from './responses/options.response';
import {CartDataItemResponse} from './responses/cart-data-item.response';
import {ShipmentDatesResponse} from './responses/shipment-dates.response';
import {OrderCartResponse} from '@store/query/orders/response/order-cart.response';
import {OrderCartProp} from '@store/query/orders/props/order-cart.prop';

export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: axiosBaseQuery({baseUrl: 'basket/'}),

    endpoints(build) {
        return {
            cartsList: build.query<CartListResponse, void>({
                query: () => ({
                    url: 'multibasket',
                })
            }),
            // Удалять: добавить с количеством 0. Изменить количество (на меньшее): удалить, потом добавить
            cartAddItems: build.mutation<PositionsResponse, OrderPositionModel[]>({
                query: (positions) => ({
                    url: 'add',
                    method: 'post',
                    params: {
                        positions
                    }
                })
            }),
            orderCart: build.mutation<OrderCartResponse, OrderCartProp>({
                query: (orderInfo) => ({
                    url: 'order',
                    method: 'post',
                    params: {
                        ...orderInfo
                    }
                })
            }),
            clearCart: build.mutation<StatusResponse, void>({
                query: () => ({
                    url: 'clear'
                })
            }),
            cartContent: build.query<CartContentResponse, void>({
                query: () => ({
                    url: 'content'
                })
            }),
            cartOptions: build.query<CartOptionsResponse, void>({
                query: () => ({
                    url: 'options'
                })
            }),
            cartPaymentMethods: build.query<CartDataItemResponse, void>({
                query: () => ({
                    url: 'paymentMethods'
                })
            }),
            cartShipmentMethods: build.query<CartDataItemResponse, void>({
                query: () => ({
                    url: 'shipmentMethods'
                })
            }),
            cartShipmentAddresses: build.query<CartDataItemResponse, void>({
                query: () => ({
                    url: 'shipmentAddresses'
                })
            }),
            /**
             * @param minDeadlineTime - Минимальный срок поставки, в часах, среди всех позиций, которые собрались отправлять в заказ.
             *
             * @param maxDeadlineTime - Максимальный срок поставки, в часах, среди всех позиций, которые собрались отправлять в заказ.
             */
            cartShipmentDates: build.query<ShipmentDatesResponse, { minDeadlineTime: string, maxDeadlineTime: string }>({
                query: ({minDeadlineTime, maxDeadlineTime}) => ({
                    url: 'shipmentDates',
                    params: {
                        minDeadlineTime,
                        maxDeadlineTime
                    }
                })
            }),
            addCartShipmentAddress: build.mutation<number, string>({
                query: (address) => ({
                    url: 'shipmentAddress',
                    params: {
                        address
                    }
                })
            })
        };
    }
});

export const {
    useCartsListQuery,
    useCartAddItemsMutation,
    useOrderCartMutation,
    useClearCartMutation,
    useCartContentQuery,
    useCartOptionsQuery,
    useCartPaymentMethodsQuery,
    useCartShipmentMethodsQuery,
    useCartShipmentAddressesQuery,
    useCartShipmentDatesQuery,
    useAddCartShipmentAddressMutation
} = cartApi;
