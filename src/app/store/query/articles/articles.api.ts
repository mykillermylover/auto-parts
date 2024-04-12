import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '@shared/axios.query';
import {ArticlesBrandsResponse} from '@store/query/articles/responses/articles-brands.response';
import {ArticleInfoResponse} from '@store/query/articles/responses/article-info.response';
import {ArticleInfoProp} from '@store/query/articles/article-info.prop';
import * as SecureStore from 'expo-secure-store';
import axios, {AxiosError} from 'axios';

export const articlesApi = createApi({
    reducerPath: 'articlesApi',
    baseQuery: axiosBaseQuery({baseUrl: 'articles/'}),
    endpoints(build) {
        return {
            allBrands: build.query<ArticlesBrandsResponse, void>({
                query: () => ({
                    url: 'brands',
                })
            }),
            // needs API admin info
            info: build.query<ArticleInfoResponse, ArticleInfoProp>({
                queryFn: async () => {
                    try {
                        const userlogin = await SecureStore.getItemAsync('apiLogin');
                        const userpsw = await SecureStore.getItemAsync('apiPass');

                        const result = await axios.get('info', {
                            params: {
                                userlogin,
                                userpsw
                            }
                        });
                        return {data: result.data};
                    } catch (axiosError) {
                        const err = axiosError as AxiosError;
                        return {
                            error: {
                                status: err.response?.status,
                                data: err.response?.data || err.message,
                            },
                        };
                    }
                }
            })
        };
    }
});

export const { useAllBrandsQuery, useInfoQuery } = articlesApi;
