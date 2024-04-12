import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '@shared/axios.query';

import {SearchConstants} from '@consts';
import {
    SearchBrand,
    SearchBrandsObjectResponse,
    searchBrandsObjectToArray
} from './responses/brands.response';
import {SearchArticlesResponse} from './responses/articles.response';
import {SearchHistoryResponse} from './responses/history.response';
import {SearchTipsResponse} from './responses/tips.response';
import {ItemModel} from '@shared/models/item.model';
import {SearchAdvicesResponse} from './responses/advices.response';
import {AdvicesBatchResponse} from './responses/advices-batch.response';

export const searchApi = createApi({
    reducerPath: 'searchApi',
    baseQuery: axiosBaseQuery({baseUrl: 'search/'}),

    endpoints(build) {
        return {
            brands: build.query<SearchBrand[], number | string>({
                query: (number) => ({
                    url: 'brands',
                    params: {
                        number
                    }
                }),
                transformResponse(baseQueryReturnValue: SearchBrandsObjectResponse) {
                    return searchBrandsObjectToArray(baseQueryReturnValue);
                }
            }),
            articles: build.query<SearchArticlesResponse, { number: number | string, brand: string }>({
                query: ({number, brand}) => ({
                    url: 'articles',
                    params: {
                        number,
                        brand
                    }
                })
            }),
            batch: build.mutation<SearchArticlesResponse, { number: string, brand: string | number }[]>({
                query: (searchData) => ({
                    url: 'batch',
                    params: {
                        searchData
                    }
                })
            }),
            history: build.query<SearchHistoryResponse, void>({
                query: () => ({
                    url: 'history',
                })
            }),
            tips: build.query<SearchTipsResponse, string | number>({
                query: (number) => ({
                    url: 'tips',
                    params: {
                        number
                    }
                })
            }),
            advices: build.query<SearchAdvicesResponse, { item: ItemModel, limit: number }>({
                query: ({item: {brand, number}, limit = SearchConstants.advicesLimit}) => ({
                    url: 'advices',
                    params: {
                        brand,
                        number,
                        limit
                    }
                })
            }),
            advicesBatch: build.mutation<AdvicesBatchResponse[], { articles: ItemModel[], limit: number }>({
                query: ({articles, limit = SearchConstants.advicesLimit}) => ({
                    url: 'advices/batch',
                    data: {
                        articles,
                        limit
                    }
                })
            })
        };
    }
});

export const {
    useBrandsQuery,
    useArticlesQuery,
    useBatchMutation,
    useHistoryQuery,
    useTipsQuery,
    useAdvicesQuery,
    useAdvicesBatchMutation
} = searchApi;
