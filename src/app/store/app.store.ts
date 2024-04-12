import {configureStore} from '@reduxjs/toolkit';
import userReducer from './user/user.store';
import initReducer from './init/init.store';
import logger from 'redux-logger';
import {userApi} from '@store/query/user/user.api';
import {cartApi} from '@store/query/cart/cart.api';
import {ordersApi} from '@store/query/orders/orders.api';
import {searchApi} from '@store/query/search/search.api';
import {articlesApi} from '@store/query/articles/articles.api';
import {carTreeApi} from '@store/query/car-tree/car-tree.api';
import {garageApi} from '@store/query/garage/garage.api';

const middlewares = [userApi.middleware,];

const store = configureStore({
    reducer: {
        user: userReducer,
        init: initReducer,

        [userApi.reducerPath]: userApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer,
        [ordersApi.reducerPath]: ordersApi.reducer,
        [searchApi.reducerPath]: searchApi.reducer,
        [articlesApi.reducerPath]: articlesApi.reducer,
        [carTreeApi.reducerPath]: carTreeApi.reducer,
        [garageApi.reducerPath]: garageApi.reducer
    },
    middleware: (gDF) => gDF().concat(...middlewares, logger),
});


export default store;
