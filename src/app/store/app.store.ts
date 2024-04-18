import {configureStore} from '@reduxjs/toolkit';
import userReducer from './user/user.store';
import initReducer from './init/init.store';
import {userApi} from '@store/query/user/user.api';
import {cartApi} from '@store/query/cart/cart.api';
import {ordersApi} from '@store/query/orders/orders.api';
import {searchApi} from '@store/query/search/search.api';
import {articlesApi} from '@store/query/articles/articles.api';
import {carTreeApi} from '@store/query/car-tree/car-tree.api';
import {garageApi} from '@store/query/garage/garage.api';
import {advicesApi} from '@store/query/advices/advices.api';
import {localApi} from '@store/query/local/local.api';
import {createLogger} from 'redux-logger';

const logger = createLogger({
    predicate: (getState, action) => !/[a-zA-Z]*Api\/config\/middlewareRegistered/.test(action.type)
});

const middlewares = [
    userApi.middleware,
    cartApi.middleware,
    ordersApi.middleware,
    searchApi.middleware,
    advicesApi.middleware,
    articlesApi.middleware,
    carTreeApi.middleware,
    garageApi.middleware,
    localApi.middleware,
];

const store = configureStore({
    reducer: {
        user: userReducer,
        init: initReducer,

        [userApi.reducerPath]: userApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer,
        [ordersApi.reducerPath]: ordersApi.reducer,
        [searchApi.reducerPath]: searchApi.reducer,
        [advicesApi.reducerPath]: advicesApi.reducer,
        [articlesApi.reducerPath]: articlesApi.reducer,
        [carTreeApi.reducerPath]: carTreeApi.reducer,
        [garageApi.reducerPath]: garageApi.reducer,
        [localApi.reducerPath]: localApi.reducer,
    },
    middleware: (gDF) => gDF().concat(...middlewares, logger),
});

export default store;
